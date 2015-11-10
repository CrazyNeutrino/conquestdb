package org.meb.conquest.util;

import java.util.Iterator;
import java.util.List;

import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class TyranidWarlordCardHelper extends StandardWarlordCardHelper {

	TyranidWarlordCardHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public List<Card> filterValidCards(List<Card> cards) {

		List<Card> validCards = super.filterValidCards(cards);
		Iterator<Card> validCardsIter = validCards.iterator();
		while (validCardsIter.hasNext()) {
			Card card = validCardsIter.next();
			if (card.getFaction() == Faction.NEUTRAL && card.getType() == CardType.ARMY) {
				validCardsIter.remove();
			}
		}

		return validCards;
	}
}
