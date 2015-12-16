package org.meb.conquest.deck.predicate;

import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class WarlordFactionCardPredicate extends CardPredicate {

	private Card warlord;

	public WarlordFactionCardPredicate(Card warlord) {
		this.warlord = warlord;
	}

	@Override
	public boolean evaluate(Card card) {
		boolean outcome = super.evaluate(card);
		if (outcome) {
			Long warlordId = warlord.getId();
			Faction warlordFaction = warlord.getFaction();
			Long cardWarlordId = card.getWarlordId();
			Faction cardFaction = card.getFaction();

			if (cardFaction != warlordFaction) {
				// other faction
				outcome = false;
			} else if (cardWarlordId != null && !cardWarlordId.equals(warlordId)) {
				// other warlord sign squad
				outcome = false;
			} else {
				// all ok
				outcome = true;
			}
		}

		return outcome;
	}
}
