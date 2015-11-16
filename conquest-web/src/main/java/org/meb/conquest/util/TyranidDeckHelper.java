package org.meb.conquest.util;

import java.util.List;

import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.util.predicate.TyranidDeckCardPredicate;

public class TyranidDeckHelper extends DeckHelperBase {

	TyranidDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public List<Card> filterValidDeckCards(List<Card> cards) {
		return filterCards(cards, new TyranidDeckCardPredicate(getWarlord()));
	}
}
