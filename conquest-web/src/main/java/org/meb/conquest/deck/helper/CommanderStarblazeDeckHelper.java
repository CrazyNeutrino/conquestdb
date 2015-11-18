package org.meb.conquest.deck.helper;

import static org.apache.commons.collections4.PredicateUtils.andPredicate;
import static org.apache.commons.collections4.PredicateUtils.orPredicate;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.predicate.CommonCardPredicate;
import org.meb.conquest.deck.predicate.RegularDeckCardPredicate;
import org.meb.conquest.deck.validation.CommanderStarblazeDeckValidator;
import org.meb.conquest.deck.validation.DeckValidator;

public class CommanderStarblazeDeckHelper extends DeckHelperBase {

	public CommanderStarblazeDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public Predicate<Card> buildAllowedCardPredicate() {
		Predicate<Card> regular = new RegularDeckCardPredicate(getWarlord());
		Predicate<Card> common = new CommonCardPredicate();
		Predicate<Card> am = new Predicate<Card>() {
			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.ASTRA_MILITARUM;
			}
		};
		return orPredicate(regular, andPredicate(common, am));
	}

	@Override
	public DeckValidator buildDeckValidator() {
		return new CommanderStarblazeDeckValidator(buildAllowedCardPredicate());
	}
}
