package org.meb.conquest.web.json;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.meb.conquest.db.model.Deck;
import org.meb.conquest.web.json.model.JsonDeck;

public class JsonDeckBuilder {

	private boolean loadMembers;
	private boolean loadLinks;
	private boolean loadComments;
	private boolean loadSnapshots;
	private boolean loadInterests;

	public JsonDeck build(Deck deck) {
		JsonDeck jsonDeck = new JsonDeck();
		jsonDeck.setLoadMembers(loadMembers);
		jsonDeck.setLoadLinks(loadLinks);
		jsonDeck.setLoadComments(loadComments);
		jsonDeck.setLoadSnapshots(loadSnapshots);
		jsonDeck.setLoadInterests(loadInterests);
		return jsonDeck.build(deck);
	}

	public List<JsonDeck> buildMany(Collection<Deck> decks) {
		List<JsonDeck> jsonDecks = null;
		if (decks != null) {
			jsonDecks = new ArrayList<>();
			for (Deck deck : decks) {
				jsonDecks.add(build(deck));
			}
		}
		return jsonDecks;
	}

	public JsonDeckBuilder withMembers() {
		loadMembers = true;
		return this;
	}

	public JsonDeckBuilder withLinks() {
		loadLinks = true;
		return this;
	}

	public JsonDeckBuilder withComments() {
		loadComments = true;
		return this;
	}

	public JsonDeckBuilder withSnapshots() {
		loadSnapshots = true;
		return this;
	}

	public JsonDeckBuilder withInterests() {
		loadInterests = true;
		return this;
	}
}
