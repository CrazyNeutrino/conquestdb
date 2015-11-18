package org.meb.conquest.deck.helper;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.loc.Card;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class DeckHelperBase implements DeckHelper {

	@NonNull
	private Card warlord;
	
	@Override
	public List<Card> filterAllowedCards(List<Card> cards) {
		return filterCards(cards, buildAllowedCardPredicate());
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
