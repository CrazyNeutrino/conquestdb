package org.meb.conquest.json;

import java.util.List;

import javax.inject.Inject;

import org.meb.conquest.auth.AuthToken;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.json.model.JsonDeck;
import org.meb.conquest.service.DeckService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DeckLoader {

	private static final Logger log = LoggerFactory.getLogger(DeckLoader.class);

	@Inject
	private DeckService deckService;

	@Inject
	private AuthToken authUser;

	public List<JsonDeck> loadUserDecks() {
		log.info("loadUserDecks(): auth user: {}", authUser);

		List<Deck> decks = deckService.findUserDecks();
		return JsonDeck.build(decks, true, false, false, false);
	}
}
