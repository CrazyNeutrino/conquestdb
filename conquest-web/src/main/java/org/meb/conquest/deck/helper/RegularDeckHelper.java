package org.meb.conquest.deck.helper;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.predicate.RegularDeckCardPredicate;
import org.meb.conquest.deck.validation.DeckValidator;
import org.meb.conquest.deck.validation.RegularDeckValidator;

public class RegularDeckHelper extends DeckHelperBase {

	protected RegularDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public Predicate<Card> buildAllowedCardPredicate() {
		return new RegularDeckCardPredicate(getWarlord());
	}

	@Override
	public DeckValidator buildDeckValidator() {
		return new RegularDeckValidator(getWarlord().getFaction(), buildAllowedCardPredicate());
	}
}
