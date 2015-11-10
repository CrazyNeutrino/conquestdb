package org.meb.conquest.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class StandardWarlordCardHelper implements WarlordCardHelper {
	
	private Card warlord;
	
	StandardWarlordCardHelper(Card warlord) {
		this.warlord = warlord;
	}

	@Override
	public List<Card> filterValidCards(List<Card> cards) {
	
		Long warlordId = warlord.getId();
		Faction warlordFaction = warlord.getFaction();
		Set<Faction> alliance = new HashSet<>(Arrays.asList(warlordFaction.alliance()));
		
		Set<CardType> types = new HashSet<>();
		types.add(CardType.ARMY);
		types.add(CardType.ATTACHMENT);
		types.add(CardType.EVENT);
		types.add(CardType.SUPPORT);
		types.add(CardType.SYNAPSE);
		
		List<Card> validCards = new ArrayList<>();
		
		for (Card card : cards) {
			Long cardWarlordId = card.getWarlordId();
			Faction cardFaction = card.getFaction();
			CardType cardType = card.getType();
			boolean cardLoyal = Boolean.TRUE.equals(card.getLoyal());

			if (!types.contains(cardType)) {
				continue;
			} else if (cardWarlordId != null && cardWarlordId != warlordId) {
				continue;
			} else if (cardWarlordId == warlordId) {
				validCards.add(card);
			} else if (cardLoyal && cardFaction != warlordFaction) {
				continue;
			} else if (cardLoyal && cardFaction == warlordFaction) {
				validCards.add(card);
			} else if (!cardLoyal && alliance.contains(cardFaction)) {
				validCards.add(card);
			}
		}
		
		return validCards;
	}
}
