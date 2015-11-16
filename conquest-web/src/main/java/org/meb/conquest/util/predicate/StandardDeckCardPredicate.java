package org.meb.conquest.util.predicate;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class StandardDeckCardPredicate extends DeckCardPredicate {

	protected final Set<Faction> ALLIANCE;

	private Card warlord;

	public StandardDeckCardPredicate(Card warlord) {
		this.warlord = warlord;

		this.ALLIANCE = new HashSet<>();
		this.ALLIANCE.addAll(Arrays.asList(this.warlord.getFaction().alliance()));
	}

	@Override
	public boolean evaluate(Card card) {
		boolean outcome = super.evaluate(card);
		if (outcome) {
			Long warlordId = warlord.getId();
			Faction warlordFaction = warlord.getFaction();

			Long cardWarlordId = card.getWarlordId();
			Faction cardFaction = card.getFaction();
			boolean cardLoyal = Boolean.TRUE.equals(card.getLoyal());

			if (cardWarlordId != null && cardWarlordId != warlordId) {
				// other warlord sign squad
				outcome = false;
			} else if (cardWarlordId == warlordId) {
				// this warlord sign squad
				outcome = true;
			} else if (cardLoyal && cardFaction != warlordFaction) {
				// loyal to other faction
				outcome = false;
			} else if (cardLoyal && cardFaction == warlordFaction) {
				// loyal to this faction
				outcome = true;
			} else if (!cardLoyal && ALLIANCE.contains(cardFaction)) {
				// not loyal and in alliance
				outcome = true;
			} else {
				outcome = false;
			}
		}

		return outcome;
	}
}
