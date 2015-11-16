package org.meb.conquest.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.loc.Card;

public abstract class DeckHelperBase implements DeckHelper {

	private Card warlord;

	protected DeckHelperBase(Card warlord) {
		this.warlord = warlord;
	}

	protected List<Card> filterCards(List<Card> cards, Predicate<Card> predicate) {
		ArrayList<Card> filtered = new ArrayList<Card>(cards);
		CollectionUtils.filter(filtered, predicate);
		return filtered;
	}

	protected Card getWarlord() {
		return warlord;
	}
}
