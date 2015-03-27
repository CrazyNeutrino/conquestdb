package org.meb.conquest.json;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonProcessingException;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.CardSet;
import org.meb.conquest.json.model.JsonCard;
import org.meb.conquest.json.model.JsonCardSet;

public class JsonModelUtils {

	public static String cardsAsJson(List<Card> cards) throws JsonProcessingException, IOException {
		List<JsonCard> jsonCards = new ArrayList<>();
		for (Card card: cards) {
			jsonCards.add(new JsonCard(card));
		}
		return JsonUtils.write(jsonCards);
	}
	
	public static String cardSetsAsJson(List<CardSet> cardSets) throws JsonProcessingException, IOException {
		List<JsonCardSet> jsonCards = new ArrayList<>();
		for (CardSet cardSet: cardSets) {
			jsonCards.add(new JsonCardSet(cardSet));
		}
		return JsonUtils.write(jsonCards);
	}
}
