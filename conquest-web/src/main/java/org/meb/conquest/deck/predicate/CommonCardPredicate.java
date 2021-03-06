package org.meb.conquest.deck.predicate;

import org.meb.conquest.db.model.loc.Card;

public class CommonCardPredicate extends CardPredicate {

	@Override
	public boolean evaluate(Card card) {
		boolean outcome = super.evaluate(card);
		if (outcome) {
			boolean signSquad = card.getWarlordId() != null;
			boolean loyal = Boolean.TRUE.equals(card.getLoyal());
			outcome = !signSquad && !loyal;
		}
		return outcome;
	}
}
