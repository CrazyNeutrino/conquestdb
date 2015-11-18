package org.meb.conquest.deck.predicate;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.loc.Card;

public class CardPredicate implements Predicate<Card> {

	protected final Set<CardType> DECK_CARD_TYPES;

	public CardPredicate() {
		this.DECK_CARD_TYPES = new HashSet<>();
		this.DECK_CARD_TYPES.add(CardType.ARMY);
		this.DECK_CARD_TYPES.add(CardType.ATTACHMENT);
		this.DECK_CARD_TYPES.add(CardType.EVENT);
		this.DECK_CARD_TYPES.add(CardType.SUPPORT);
		this.DECK_CARD_TYPES.add(CardType.SYNAPSE);
	}

	@Override
	public boolean evaluate(Card card) {
		return DECK_CARD_TYPES.contains(card.getType());
	}
}
