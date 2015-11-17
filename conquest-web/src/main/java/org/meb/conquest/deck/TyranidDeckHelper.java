package org.meb.conquest.deck;

import static org.apache.commons.collections4.PredicateUtils.andPredicate;
import static org.apache.commons.collections4.PredicateUtils.notPredicate;

import java.util.List;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.util.predicate.StandardDeckCardPredicate;

public class TyranidDeckHelper extends DeckHelperBase {

	TyranidDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public List<Card> filterValidDeckCards(List<Card> cards) {
		Predicate<Card> standard = new StandardDeckCardPredicate(getWarlord());
		Predicate<Card> neutralArmy = new Predicate<Card>() {

			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.NEUTRAL && card.getType() == CardType.ARMY;
			}
		};
		return filterCards(cards, andPredicate(standard, notPredicate(neutralArmy)));
	}
}
