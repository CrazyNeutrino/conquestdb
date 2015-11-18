package org.meb.conquest.web.json.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.db.model.DeckMember;

@Getter
@Setter
@NoArgsConstructor
public class JsonDeckMember {

	private Long cardId;
	// private Integer maxQuantity;
	private Integer quantity;

	public JsonDeckMember(Long cardId, Integer quantity) {
		this.cardId = cardId;
		this.quantity = quantity;
		// this.setMaxQuantity(maxQuantity);
	}

	public JsonDeckMember(DeckMember deckMember) {
		this.cardId = deckMember.getCard().getId();
		this.quantity = deckMember.getQuantity();
		// this.setMaxQuantity(deckMember.getCard().getQuantity());
	}

	// public void setMaxQuantity(Integer maxQuantity) {
	// if (maxQuantity == null) {
	// this.maxQuantity = 3;
	// } else {
	// this.maxQuantity = maxQuantity;
	// }
	// }
}
