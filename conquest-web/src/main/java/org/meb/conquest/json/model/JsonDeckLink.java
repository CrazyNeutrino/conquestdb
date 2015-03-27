package org.meb.conquest.json.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckLink;

@Getter
@Setter
@NoArgsConstructor
public class JsonDeckLink {

	private Long id;
	private String value;
	private String name;
	private Date validFrom;
	private Date validTo;
	private Date createDate;
	private Long deckId;

	public JsonDeckLink(DeckLink deckLink) {
		this.id = deckLink.getId();
		this.value = deckLink.getValue();
		this.name = deckLink.getName();
		this.validFrom = deckLink.getValidFrom();
		this.validTo = deckLink.getValidTo();
		this.createDate = deckLink.getCreateDate();
		if (deckLink.getDeck() != null) {
			deckId = deckLink.getDeck().getId();
		}
	}

	public DeckLink toDeckLink() {
		DeckLink deckLink = new DeckLink();
		deckLink.setId(id);
		deckLink.setName(name);
		deckLink.setValue(value);
		deckLink.setValidFrom(validFrom);
		deckLink.setValidTo(validTo);
		if (deckId != null) {
			deckLink.setDeck(new Deck(deckId));
		}
		return deckLink;
	}

	public static List<JsonDeckLink> toJsonDeckLinks(List<DeckLink> deckLinks) {
		List<JsonDeckLink> jsonDeckLinks = null;
		if (deckLinks != null) {
			jsonDeckLinks = new ArrayList<>();
			for (DeckLink deckLink : deckLinks) {
				jsonDeckLinks.add(new JsonDeckLink(deckLink));
			}
		}
		return jsonDeckLinks;
	}
}
