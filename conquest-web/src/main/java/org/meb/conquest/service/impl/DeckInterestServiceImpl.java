package org.meb.conquest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.apache.deltaspike.jpa.api.transaction.Transactional;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.DeckInterest;
import org.meb.conquest.db.util.Functions;
import org.meb.conquest.service.DeckInterestWrapper;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.service.api.DeckInterestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Maps;

@Singleton
public class DeckInterestServiceImpl extends SearchServiceImpl implements DeckInterestService {

	private static final long serialVersionUID = -393822459345400140L;
	private static final Logger log = LoggerFactory.getLogger(DeckInterestServiceImpl.class);

	@Inject
	private EntityManager em;

	@Inject
	private RequestContext requestContext;

	private Map<String, DeckInterest> deckUserIndex;
	private Map<String, DeckInterest> originalDeckUserIndex;
	private Map<Long, DeckInterest> deckTotalIndex;
	private ReadWriteLock lock = new ReentrantReadWriteLock();

	@PostConstruct
	private void postContruct() {
		List<DeckInterest> deckInterests = find(new DeckInterest());

		deckUserIndex = new HashMap<>(Maps.uniqueIndex(deckInterests, Functions.DEIN_KEY));
		originalDeckUserIndex = new HashMap<>();
		deckTotalIndex = new HashMap<>();
		for (DeckInterest di : deckInterests) {
			Long deckId = di.getDeckId();

			DeckInterest deckTotalDI = deckTotalIndex.get(deckId);
			if (deckTotalDI == null) {
				deckTotalDI = new DeckInterest();
				deckTotalDI.setDeckId(deckId);
				deckTotalDI.setFavourite(0);
				deckTotalDI.setRating(0);
				deckTotalIndex.put(deckId, deckTotalDI);
			}
			deckTotalDI.setFavourite(deckTotalDI.getFavourite() + di.getFavourite());
			deckTotalDI.setRating(deckTotalDI.getRating() + di.getRating());
		}
	}

	@Override
	public DeckInterestWrapper favourite(Long deckId, Integer value) throws DeckException {
		requestContext.checkUserIdSet();

		if (value != 0 && value != 1) {
			throw new IllegalArgumentException("Invalid value");
		}

		return updateDeckInterest(deckId, requestContext.getUserId(), value, null);
	}

	@Override
	public DeckInterestWrapper rate(Long deckId, Integer value) throws DeckException {
		requestContext.checkUserIdSet();

		if (value != 0 && value != 1) {
			throw new IllegalArgumentException("Invalid value");
		}

		return updateDeckInterest(deckId, requestContext.getUserId(), null, value);
	}

	@Override
	public DeckInterestWrapper loadDeckInterest(Long deckId) {
		lock.readLock().lock();
		try {
			Long userId = requestContext.getUserId();

			String deckUserKey = Functions.DEIN_KEY.apply(new DeckInterest(deckId, userId));
			DeckInterest deckUserDI = deckUserIndex.get(deckUserKey);
			if (deckUserDI == null) {
				deckUserDI = new DeckInterest(deckId, userId);
				deckUserDI.setFavourite(0);
				deckUserDI.setRating(0);
			}

			Long deckTotalKey = deckId;
			DeckInterest deckTotalDI = deckTotalIndex.get(deckTotalKey);
			if (deckTotalDI == null) {
				deckTotalDI = new DeckInterest(deckId, userId);
				deckTotalDI.setFavourite(0);
				deckTotalDI.setRating(0);
			}

			return new DeckInterestWrapper(deckUserDI, deckTotalDI);
		} finally {
			lock.readLock().unlock();
		}
	}

	@Override
	@Transactional
	public void flushToDatabase() {
		lock.writeLock().lock();
		try {
			List<DeckInterest> flushedList = new ArrayList<>();

			for (String deckUserKey : originalDeckUserIndex.keySet()) {
				DeckInterest changedDI = deckUserIndex.get(deckUserKey);
				if (changedDI.getId() == null) {
					em.persist(changedDI);
				} else {
					changedDI = em.merge(changedDI);
				}
				em.flush();
				flushedList.add(changedDI);
			}

			for (DeckInterest flushed : flushedList) {
				deckUserIndex.put(Functions.DEIN_KEY.apply(flushed), flushed);
			}
			originalDeckUserIndex.clear();
		} finally {
			lock.writeLock().unlock();
		}
	}

	private DeckInterestWrapper updateDeckInterest(Long deckId, Long userId, Integer favourite,
			Integer rating) throws DeckException {

		lock.writeLock().lock();
		try {
			Integer oldFavourite = null;
			Integer oldRating = null;

			String deckUserKey = Functions.DEIN_KEY.apply(new DeckInterest(deckId, userId));
			DeckInterest deckUserDI = deckUserIndex.get(deckUserKey);
			if (deckUserDI == null) {
				deckUserDI = new DeckInterest(deckId, userId);
				deckUserDI.setFavourite(0);
				deckUserDI.setRating(0);
				deckUserIndex.put(deckUserKey, deckUserDI);
				oldFavourite = 0;
				oldRating = 0;
			} else {
				oldFavourite = deckUserDI.getFavourite();
				oldRating = deckUserDI.getRating();
			}

			Long deckTotalKey = deckId;
			DeckInterest deckTotalDI = deckTotalIndex.get(deckTotalKey);
			if (deckTotalDI == null) {
				deckTotalDI = new DeckInterest(deckId, userId);
				deckTotalDI.setFavourite(0);
				deckTotalDI.setRating(0);
				deckTotalIndex.put(deckTotalKey, deckTotalDI);
			}

			// update favourites
			boolean favouriteChanged = false;
			if (favourite != null) {
				deckUserDI.setFavourite(favourite);
				deckTotalDI.setFavourite(deckTotalDI.getFavourite() - oldFavourite + favourite);
				favouriteChanged = !oldFavourite.equals(favourite);
				log.debug("favourite changed: {}, was: {}, is: {}, key: {}",
						new Object[] { favouriteChanged, oldFavourite, favourite, deckUserKey });
			}

			// update ratings
			boolean ratingChanged = false;
			if (rating != null) {
				deckUserDI.setRating(rating);
				deckTotalDI.setRating(deckTotalDI.getRating() - oldRating + rating);
				ratingChanged = !oldRating.equals(rating);
				log.debug("rating changed: {}, was: {}, is: {}, key: {}",
						new Object[] { ratingChanged, oldRating, rating, deckUserKey });
			}

			// manage original value
			if (favouriteChanged || ratingChanged) {
				DeckInterest originalDI = originalDeckUserIndex.get(deckUserKey);
				if (originalDI == null) {
					originalDI = new DeckInterest(deckId, userId);
					originalDI.setFavourite(oldFavourite);
					originalDI.setRating(oldRating);
					originalDeckUserIndex.put(deckUserKey, originalDI);
					log.debug("added: {} to originalDeckUserIndex");
				} else {
					Integer originalFavourite = originalDI.getFavourite();
					Integer originalRating = originalDI.getRating();
					if (originalFavourite.equals(favourite) && originalRating.equals(rating)) {
						originalDeckUserIndex.remove(deckUserKey);
						log.debug("removed: {} from originalDeckUserIndex");
					}
				}
			}

			return new DeckInterestWrapper(deckUserDI, deckTotalDI);
		} finally {
			lock.writeLock().unlock();
		}
	}
}
