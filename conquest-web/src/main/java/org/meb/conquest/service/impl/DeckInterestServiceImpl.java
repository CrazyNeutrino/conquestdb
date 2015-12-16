package org.meb.conquest.service.impl;

import static org.meb.conquest.db.util.Functions.DeckInterestKey;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
import org.meb.conquest.db.dao.JpaDao;
import org.meb.conquest.db.model.DeckInterest;
import org.meb.conquest.db.query.DeckInterestQuery;
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
	private JpaDao<DeckInterest, DeckInterestQuery> deckInterestDao;

	@Inject
	private RequestContext requestContext;

	private Map<String, DeckInterest> deckUserIndex;
	private Map<String, DeckInterest> originalDeckUserIndex;
	private Map<Long, DeckInterest> deckTotalIndex;
	private ReadWriteLock lock = new ReentrantReadWriteLock();

	@PostConstruct
	private void postContruct() {
		deckInterestDao = new JpaDao<>(em);

		List<DeckInterest> deckInterests = find(new DeckInterest());

		deckUserIndex = new HashMap<>(Maps.uniqueIndex(deckInterests, DeckInterestKey));
		originalDeckUserIndex = new HashMap<>();
		deckTotalIndex = new HashMap<>();
		for (DeckInterest di : deckInterests) {
			Long deckId = di.getDeckId();

			DeckInterest deckTotalDI = deckTotalIndex.get(deckId);
			if (deckTotalDI == null) {
				deckTotalDI = new DeckInterest();
				deckTotalDI.setDeckId(deckId);
				deckTotalDI.setFavourite(0);
				deckTotalDI.setSuperb(0);
				deckTotalIndex.put(deckId, deckTotalDI);
			}
			deckTotalDI.setFavourite(deckTotalDI.getFavourite() + di.getFavourite());
			deckTotalDI.setSuperb(deckTotalDI.getSuperb() + di.getSuperb());
		}
	}

	@Override
	public DeckInterestWrapper markFavourite(Long deckId, Integer value) throws DeckException {
		requestContext.checkUserIdSet();

		if (value != 0 && value != 1) {
			throw new IllegalArgumentException("Invalid value");
		}

		return updateDeckInterest(deckId, requestContext.getUserId(), value, null);
	}

	@Override
	public DeckInterestWrapper markSuperb(Long deckId, Integer value) throws DeckException {
		requestContext.checkUserIdSet();

		if (value != 0 && value != 1) {
			throw new IllegalArgumentException("Invalid value");
		}

		return updateDeckInterest(deckId, requestContext.getUserId(), null, value);
	}

	@Override
	public DeckInterestWrapper loadUserDeckInterests(Long deckId) {
		lock.readLock().lock();
		try {
			Long userId = requestContext.getUserId();

			String deckUserKey = DeckInterestKey.apply(new DeckInterest(deckId, userId));
			DeckInterest deckUserDI = deckUserIndex.get(deckUserKey);
			if (deckUserDI == null) {
				deckUserDI = new DeckInterest(deckId, userId);
				deckUserDI.setFavourite(0);
				deckUserDI.setSuperb(0);
			}

			Long deckTotalKey = deckId;
			DeckInterest deckTotalDI = deckTotalIndex.get(deckTotalKey);
			if (deckTotalDI == null) {
				deckTotalDI = new DeckInterest(deckId, userId);
				deckTotalDI.setFavourite(0);
				deckTotalDI.setSuperb(0);
			}

			return new DeckInterestWrapper(deckUserDI, deckTotalDI);
		} finally {
			lock.readLock().unlock();
		}
	}

	@Override
	@Transactional
	public void deleteDeckInterests(Long deckId) throws DeckException {
		requestContext.checkUserIdSet();

		lock.writeLock().lock();
		try {

			DeckInterest example = new DeckInterest();
			example.setDeckId(deckId);
			List<DeckInterest> deckInterests = deckInterestDao.find(example);
			if (deckInterests.size() > 0) {
				for (DeckInterest deckInterest : deckInterests) {
					log.debug("removing {}", deckId);
					em.remove(deckInterest);
					em.flush();
				}

				Iterator<DeckInterest> iter;
				DeckInterest deckInterest;

				iter = deckUserIndex.values().iterator();
				while (iter.hasNext()) {
					deckInterest = iter.next();
					if (deckInterest.getDeckId().equals(deckId)) {

						if (log.isDebugEnabled()) {
							log.debug("removing {} from deckUserIndex",
									DeckInterestKey.apply(deckInterest));
						}

						iter.remove();
					}
				}

				iter = originalDeckUserIndex.values().iterator();
				while (iter.hasNext()) {
					deckInterest = iter.next();
					if (deckInterest.getDeckId().equals(deckId)) {

						if (log.isDebugEnabled()) {
							log.debug("removing {} from originalDeckUserIndex",
									DeckInterestKey.apply(deckInterest));
						}

						iter.remove();
					}
				}
			}
			deckTotalIndex.remove(deckId);
		} finally {
			lock.writeLock().unlock();
		}
	}

	@Override
	@Transactional
	public void flushDeckInterests() {
		lock.writeLock().lock();
		try {
			List<DeckInterest> flushedList = new ArrayList<>();

			log.debug("flushing {} deck interests", originalDeckUserIndex.size());

			for (String deckUserKey : originalDeckUserIndex.keySet()) {
				DeckInterest changedDI = deckUserIndex.get(deckUserKey);

				log.debug("flushing: {}, superb: {}, favourite: {}", new Object[] { deckUserKey,
						changedDI.getSuperb(), changedDI.getFavourite() });

				if (changedDI.getId() == null) {
					em.persist(changedDI);
				} else {
					changedDI = em.merge(changedDI);
				}
				em.flush();
				flushedList.add(changedDI);
			}

			for (DeckInterest flushed : flushedList) {
				deckUserIndex.put(DeckInterestKey.apply(flushed), flushed);
			}
			originalDeckUserIndex.clear();
		} finally {
			lock.writeLock().unlock();
		}
	}

	private DeckInterestWrapper updateDeckInterest(Long deckId, Long userId, Integer favourite,
			Integer superb) throws DeckException {

		lock.writeLock().lock();
		try {
			Integer oldFavourite = null;
			Integer oldSuperb = null;

			String deckUserKey = DeckInterestKey.apply(new DeckInterest(deckId, userId));
			DeckInterest deckUserDI = deckUserIndex.get(deckUserKey);
			if (deckUserDI == null) {
				deckUserDI = new DeckInterest(deckId, userId);
				deckUserDI.setFavourite(0);
				deckUserDI.setSuperb(0);
				deckUserIndex.put(deckUserKey, deckUserDI);
			}
			oldFavourite = deckUserDI.getFavourite();
			oldSuperb = deckUserDI.getSuperb();

			Long deckTotalKey = deckId;
			DeckInterest deckTotalDI = deckTotalIndex.get(deckTotalKey);
			if (deckTotalDI == null) {
				deckTotalDI = new DeckInterest(deckId, userId);
				deckTotalDI.setFavourite(0);
				deckTotalDI.setSuperb(0);
				deckTotalIndex.put(deckTotalKey, deckTotalDI);
			}

			// update favourites
			boolean favouriteChanged = false;
			if (favourite != null) {
				deckUserDI.setFavourite(favourite);
				deckTotalDI.setFavourite(deckTotalDI.getFavourite() - oldFavourite + favourite);
				favouriteChanged = !oldFavourite.equals(favourite);
				
				// register insert date
				if (favourite > 0 && deckUserDI.getFavouriteDate() == null) {
					deckUserDI.setFavouriteDate(new Date());
				} else if (favourite == 0) {
					deckUserDI.setFavouriteDate(null);
				}
				
				log.debug("favourite for {} changed: {}, was: {}, is: {}",
						new Object[] { deckUserKey, favouriteChanged, oldFavourite, favourite });
			}

			// update superbs
			boolean superbChanged = false;
			if (superb != null) {
				deckUserDI.setSuperb(superb);
				deckTotalDI.setSuperb(deckTotalDI.getSuperb() - oldSuperb + superb);
				superbChanged = !oldSuperb.equals(superb);
				
				// register insert date
				if (superb > 0 && deckUserDI.getSuperbDate() == null) {
					deckUserDI.setSuperbDate(new Date());
				} else if (superb == 0) {
					deckUserDI.setSuperbDate(null);
				}
				
				log.debug("superb for {} changed: {}, was: {}, is: {}",
						new Object[] { deckUserKey, superbChanged, oldSuperb, superb });
			}

			// manage original value
			if (favouriteChanged || superbChanged) {
				DeckInterest originalDI = originalDeckUserIndex.get(deckUserKey);
				if (originalDI == null) {
					originalDI = new DeckInterest(deckId, userId);
					originalDI.setFavourite(oldFavourite);
					originalDI.setSuperb(oldSuperb);
					originalDeckUserIndex.put(deckUserKey, originalDI);
					log.debug("added {} to originalDeckUserIndex", deckUserKey);
				} else {
					Integer originalFavourite = originalDI.getFavourite();
					Integer originalSuperb = originalDI.getSuperb();
					if (originalFavourite.equals(deckUserDI.getFavourite())
							&& originalSuperb.equals(deckUserDI.getSuperb())) {
						originalDeckUserIndex.remove(deckUserKey);
						log.debug("removed {} from originalDeckUserIndex", deckUserKey);
					}
				}
			}

			return new DeckInterestWrapper(deckUserDI, deckTotalDI);
		} finally {
			lock.writeLock().unlock();
		}
	}
}
