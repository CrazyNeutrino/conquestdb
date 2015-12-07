package org.meb.conquest.web.json.model;

import org.meb.conquest.db.model.DeckInterest;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JsonDeckInterest {

	// private Long deckId;
	private Integer favourite;
	private Integer superb;

	public JsonDeckInterest(DeckInterest deckInterest) {
		// this.deckId = deckInterest.getDeckId();
		this.favourite = deckInterest.getFavourite();
		this.superb = deckInterest.getSuperb();
	}
}
