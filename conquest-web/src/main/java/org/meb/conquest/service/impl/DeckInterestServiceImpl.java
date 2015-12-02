package org.meb.conquest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Singleton;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.DeckInterest;
import org.meb.conquest.db.util.Functions;
import org.meb.conquest.service.DeckInterestWrapper;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.service.api.DeckInterestService;

import com.google.common.collect.Maps;

@Singleton
public class DeckInterestServiceImpl extends SearchServiceImpl implements DeckInterestService {

	private static final long serialVersionUID = -393822459345400140L;

	@Inject
	private RequestContext requestContext;

	private Map<String, DeckInterest> deckUserIndex;
	private Map<Long, DeckInterest> deckTotalIndex;
	private ReadWriteLock lock = new ReentrantReadWriteLock();

	@PostConstruct
	private void postContruct() {
		List<DeckInterest> deckInterests = find(new DeckInterest());

		deckUserIndex = new HashMap<>(Maps.uniqueIndex(deckInterests, Functions.DEIN_KEY));
		deckTotalIndex = new HashMap<>();
		for (DeckInterest di : deckInterests) {
			Long deckId = di.getDeckId();

			DeckInterest total = deckTotalIndex.get(deckId);
			if (total == null) {
				total = new DeckInterest();
				total.setDeckId(deckId);
				total.setFavourite(0);
				total.setRating(0);
				deckTotalIndex.put(deckId, di);
			}
			total.setFavourite(total.getFavourite() + di.getFavourite());
			total.setRating(total.getRating() + di.getRating());
		}
	}

	@Override
	public DeckInterestWrapper favourite(Long deckId, Integer value) throws DeckException {
		requestContext.checkUserIdSet();

		if (value != 0 && value != 1) {
			throw new IllegalArgumentException("Invalid value");
		}

		return updateFavouriteRating(deckId, requestContext.getUserId(), value, null);
	}

	@Override
	public DeckInterestWrapper rate(Long deckId, Integer value) throws DeckException {
		requestContext.checkUserIdSet();

		if (value != 0 && value != 1) {
			throw new IllegalArgumentException("Invalid value");
		}

		return updateFavouriteRating(deckId, requestContext.getUserId(), null, value);
	}

	@Override
	public DeckInterestWrapper get(Long deckId) throws DeckException {
		lock.readLock().lock();
		try {
			DeckInterest deckUserDI = null;
			if (requestContext.getUserId() != null) {
				String deckUserKey = Functions.DEIN_KEY
						.apply(new DeckInterest(deckId, requestContext.getUserId()));
				deckUserDI = deckUserIndex.get(deckUserKey);
			}
			Long deckTotalKey = deckId;
			DeckInterest deckTotalDI = deckTotalIndex.get(deckTotalKey);
			return new DeckInterestWrapper(deckUserDI, deckTotalDI);
		} finally {
			lock.readLock().unlock();
		}
	}

	@Override
	public void flushToDatabase() {
		// TODO Auto-generated method stub
	}

	private DeckInterestWrapper updateFavouriteRating(Long deckId, Long userId, Integer favourite,
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

			if (favourite != null) {
				deckUserDI.setFavourite(favourite);
				deckTotalDI.setFavourite(deckTotalDI.getFavourite() - oldFavourite + favourite);
			}
			if (rating != null) {
				deckUserDI.setRating(rating);
				deckTotalDI.setRating(deckTotalDI.getRating() - oldRating + rating);
			}

			return new DeckInterestWrapper(deckUserDI, deckTotalDI);
		} finally {
			lock.writeLock().unlock();
		}
	}
}
