package org.meb.conquest.service.impl;

import java.io.Serializable;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.meb.conquest.db.dao.CardDao;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.query.CardQuery;
import org.meb.conquest.db.util.DatabaseUtils;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.service.api.CardService;

public class CardServiceImpl extends SearchServiceImpl implements CardService, Serializable {

	private static final long serialVersionUID = -3917684297662777248L;

	@Inject
	private EntityManager em;

	@Inject
	private RequestContext queryContext;

	@Override
	public List<Card> findCards(CardQuery query) {
		DatabaseUtils.executeSetUserLang(em, queryContext.getUserLanguage());
		return new CardDao(em).find(query);
	}
}
