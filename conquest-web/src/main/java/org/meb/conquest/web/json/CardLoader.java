package org.meb.conquest.web.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.query.CardQuery;
import org.meb.conquest.service.CardService;
import org.meb.conquest.web.auth.AuthToken;
import org.meb.conquest.web.json.model.JsonCard;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CardLoader implements Serializable {

	private static final long serialVersionUID = -5354259088056803341L;
	private static final Logger log = LoggerFactory.getLogger(CardLoader.class);

	@Inject
	private CardService cardService;
	
	@Inject
	private AuthToken authUser;

	public List<JsonCard> loadCards() {
		log.info("loadCards(): auth user: {}", authUser);

		CardQuery cardQuery = new CardQuery();
		cardQuery.getSorting().setSortingAsc("name");
		List<Card> cards = cardService.findCards(cardQuery);
		List<JsonCard> jsonCards = new ArrayList<>();
		for (Card card : cards) {
			jsonCards.add(new JsonCard(card));
		}
		return jsonCards;
	}

	public List<JsonCard> loadWarlordDeckCards(Long warlordId) {
		log.info("loadWarlordDeckCards(): auth user: {}", authUser);

		Card warlord = cardService.findUnique(new Card(warlordId));
		if (warlord == null) {
			throw new IllegalStateException("Warlord not found");
		}

		CardQuery query = new CardQuery();
		query.setDeckWarlordId(warlord.getId());
		query.setDeckFaction(warlord.getFaction());
		query.getSorting().setSortingAsc("factionDisplay");
		query.getSorting().setSortingAsc("typeDisplay");
		query.getSorting().setSortingAsc("name");
		List<Card> cards = cardService.findCards(query);
		List<JsonCard> jsonCards = new ArrayList<>();
		for (Card card : cards) {
			jsonCards.add(new JsonCard(card));
		}
		return jsonCards;
	}
}
