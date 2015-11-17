package org.meb.conquest.deck;

import static org.apache.commons.collections4.PredicateUtils.andPredicate;
import static org.apache.commons.collections4.PredicateUtils.orPredicate;

import java.util.List;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.util.predicate.CommonDeckCardPredicate;
import org.meb.conquest.util.predicate.StandardDeckCardPredicate;

public class CommanderStarblazeDeckHelper extends DeckHelperBase {

	public CommanderStarblazeDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public List<Card> filterValidDeckCards(List<Card> cards) {
		Predicate<Card> standard = new StandardDeckCardPredicate(getWarlord());
		Predicate<Card> common = new CommonDeckCardPredicate();
		Predicate<Card> am = new Predicate<Card>() {
			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.ASTRA_MILITARUM;
			}
		};
		return filterCards(cards, orPredicate(standard, andPredicate(common, am)));
	}
}
