package org.meb.conquest.util;

import java.util.Collection;

import org.meb.conquest.db.model.loc.Card;

public interface CardResolver {

	Card resolve(Long cardId);
	
	Collection<Card> resolve(Collection<Long> cardIds);
}
