package org.meb.conquest.deck.helper;

import static org.apache.commons.collections4.PredicateUtils.andPredicate;
import static org.apache.commons.collections4.PredicateUtils.anyPredicate;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.predicate.CommonCardPredicate;
import org.meb.conquest.deck.predicate.WarlordFactionCardPredicate;
import org.meb.conquest.deck.validation.DeckValidator;

class NecronDeckHelper extends DeckHelperBase {

	public NecronDeckHelper(Card warlord) {
		super(warlord);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Predicate<Card> buildAllowedCardPredicate() {
		Predicate<Card> warlordFaction = new WarlordFactionCardPredicate(getWarlord());
		Predicate<Card> nonTyranidArmy = new Predicate<Card>() {

			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() != Faction.TYRANID && card.getType() == CardType.ARMY;
			}
		};
		CommonCardPredicate common = new CommonCardPredicate();
		Predicate<Card> neutral = new Predicate<Card>() {

			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.NEUTRAL;
			}
		};
		return anyPredicate(warlordFaction, neutral, andPredicate(common, nonTyranidArmy));
	}

	@Override
	public DeckValidator buildDeckValidator() {
		return new NecronDeckValidator(buildAllowedCardPredicate());
	}
}
