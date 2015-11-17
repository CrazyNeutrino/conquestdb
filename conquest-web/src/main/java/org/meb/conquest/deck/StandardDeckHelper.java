package org.meb.conquest.deck;

import java.util.List;

import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.util.predicate.StandardDeckCardPredicate;

public class StandardDeckHelper extends DeckHelperBase {

	protected StandardDeckHelper(Card warlord) {
		super(warlord);
	}

	@Override
	public List<Card> filterValidDeckCards(List<Card> cards) {
		return filterCards(cards, new StandardDeckCardPredicate(getWarlord()));
	}

	// @Override
	// public List<Card> filterValidCards(List<Card> cards) {
	//
	// Long warlordId = warlord.getId();
	// Faction warlordFaction = warlord.getFaction();
	// Set<Faction> alliance = new
	// HashSet<>(Arrays.asList(warlordFaction.alliance()));
	//
	// Set<CardType> types = new HashSet<>();
	// types.add(CardType.ARMY);
	// types.add(CardType.ATTACHMENT);
	// types.add(CardType.EVENT);
	// types.add(CardType.SUPPORT);
	// types.add(CardType.SYNAPSE);
	//
	// List<Card> validCards = new ArrayList<>();
	//
	// for (Card card : cards) {
	// Long cardWarlordId = card.getWarlordId();
	// Faction cardFaction = card.getFaction();
	// CardType cardType = card.getType();
	// boolean cardLoyal = Boolean.TRUE.equals(card.getLoyal());
	//
	// if (!types.contains(cardType)) {
	// continue;
	// } else if (cardWarlordId != null && cardWarlordId != warlordId) {
	// continue;
	// } else if (cardWarlordId == warlordId) {
	// validCards.add(card);
	// } else if (cardLoyal && cardFaction != warlordFaction) {
	// continue;
	// } else if (cardLoyal && cardFaction == warlordFaction) {
	// validCards.add(card);
	// } else if (!cardLoyal && alliance.contains(cardFaction)) {
	// validCards.add(card);
	// }
	// }
	//
	// return validCards;
	// }
}
