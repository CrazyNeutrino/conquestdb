package org.meb.conquest.deck.helper;

import static org.apache.commons.collections4.PredicateUtils.orPredicate;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.predicate.WarlordFactionCardPredicate;
import org.meb.conquest.deck.validation.DeckValidator;
import org.meb.conquest.deck.validation.TyranidDeckValidator;

public class TyranidDeckHelper extends DeckHelperBase {

	TyranidDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public Predicate<Card> buildAllowedCardPredicate() {
		Predicate<Card> warlordFaction = new WarlordFactionCardPredicate(getWarlord());
		Predicate<Card> neutralNonArmy = new Predicate<Card>() {

			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.NEUTRAL && card.getType() != CardType.ARMY;
			}
		};
		return orPredicate(warlordFaction, neutralNonArmy);
	}

	@Override
	public DeckValidator buildDeckValidator() {
		return new TyranidDeckValidator(buildAllowedCardPredicate());
	}
}
