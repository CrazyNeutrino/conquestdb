package org.meb.conquest.util.predicate;

import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class TyranidDeckCardPredicate extends StandardDeckCardPredicate {

	public TyranidDeckCardPredicate(Card warlord) {
		super(warlord);
	}

	@Override
	public boolean evaluate(Card card) {
		boolean outcome = super.evaluate(card);
		if (outcome) {
			if (card.getFaction() == Faction.NEUTRAL && card.getType() == CardType.ARMY) {
				outcome = false;
			}
		}
		return outcome;
	}
}
