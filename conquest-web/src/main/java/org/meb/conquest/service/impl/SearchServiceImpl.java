package org.meb.conquest.service.impl;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.meb.conquest.db.dao.JpaDao;
import org.meb.conquest.db.query.Query;
import org.meb.conquest.db.util.DatabaseUtils;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.service.api.SearchService;

public class SearchServiceImpl implements SearchService, Serializable {

	private static final long serialVersionUID = 2005822688767075190L;

	@Inject
	private EntityManager em;
	@Inject
	private RequestContext queryContext;
	
	@Override
	public <T> T findUnique(T example) {
		DatabaseUtils.executeSetUserLang(em, queryContext.getUserLanguage());
		return new JpaDao<T, Query<T>>(em).findUnique(example);
	}

	@Override
	public <T> List<T> find(T example) {
		DatabaseUtils.executeSetUserLang(em, queryContext.getUserLanguage());
		return new JpaDao<T, Query<T>>(em).find(example);
	}

	@Override
	public <T> T findUnique(Query<T> query) {
		DatabaseUtils.executeSetUserLang(em, queryContext.getUserLanguage());
		return new JpaDao<T, Query<T>>(em).findUnique(query);
	}

	@Override
	public <T> List<T> find(Query<T> query) {
		DatabaseUtils.executeSetUserLang(em, queryContext.getUserLanguage());
		return new JpaDao<T, Query<T>>(em).find(query);
	}
}
