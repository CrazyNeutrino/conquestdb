package org.meb.conquest.util;

import java.util.Collection;
import java.util.HashSet;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.meb.conquest.db.dao.CardDao;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.query.CardQuery;

public class DatabaseCardResolver implements CardResolver {

	@Inject
	private EntityManager em;
	
	private CardDao cardDao;
	
	@PostConstruct
	private void initialize() {
		cardDao = new CardDao(em);
	}
	
	@Override
	public Card resolve(Long cardId) {
		return cardDao.findUnique(new Card(cardId));
	}

	@Override
	public Collection<Card> resolve(Collection<Long> cardIds) {
		return cardDao.find(new CardQuery(new HashSet<Long>(cardIds)));
	}
}
