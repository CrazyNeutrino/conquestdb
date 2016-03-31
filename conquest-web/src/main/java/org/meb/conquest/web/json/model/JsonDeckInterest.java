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
		if (deckInterest == null || deckInterest.getFavourite() == null) {
			this.favourite = 0;
		} else {
			this.favourite = deckInterest.getFavourite();
		}
		if (deckInterest == null || deckInterest.getSuperb() == null) {
			this.superb = 0;
		} else {
			this.superb = deckInterest.getSuperb();
		}
	}
}
