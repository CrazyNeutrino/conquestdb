package org.meb.conquest.cache;

import java.io.Serializable;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.meb.conquest.db.dao.JpaDao;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.query.Query;
import org.meb.conquest.db.util.DatabaseUtils;
import org.meb.conquest.service.RequestContext;

public class UserCacheManager {

	@Inject
	private EntityManager em;

	@Inject
	private RequestContext requestContext;

	private JpaDao<User, Query<User>> userDao;

	@PostConstruct
	private void initialize() {
		userDao = new JpaDao<>(em);
	}

	private Cache getCache() {
		Cache cache = CacheManager.getInstance().getCache(getCacheName());

		Element element = cache.get(getUsersKey());
		if (element == null) {
			synchronized (UserCacheManager.class) {
				element = cache.get(getUsersKey());
				if (element == null) {
					DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());
					List<User> users = userDao.find(new User());
					cache.put(new Element(getUsersKey(), users));
					for (User user : users) {
						cache.put(new Element(user.getId(), user));
					}
				}
			}
		}

		return cache;
	}

	private String getCacheName() {
		return "cache.user";
	}

	private Serializable getUsersKey() {
		return "user.all";
	}

	public User getUser(Long userId) {
		User user;

		Cache cache = getCache();
		Element element = cache.get(userId);
		if (element == null) {
			user = userDao.findUnique(new User(userId));
			if (user != null) {
				cache.put(new Element(userId, user));
			}
		} else {
			user = (User) element.getObjectValue();
		}

		return user;
	}
}
