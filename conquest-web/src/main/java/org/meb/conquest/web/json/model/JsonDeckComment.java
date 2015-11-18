package org.meb.conquest.web.json.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;

@Getter
@Setter
@NoArgsConstructor
public class JsonDeckComment {

	private Long id;
	private Long deckId;
	private String value;
	private String username;
	private Date createDate;
	private Date modifyDate;

	public JsonDeckComment(DeckComment deckComment) {
		id = deckComment.getId();
		deckId = deckComment.getDeck().getId();
		username = deckComment.getUser().getUsername();
		createDate = deckComment.getCreateDate();
		modifyDate = deckComment.getModifyDate();
		value = deckComment.getValue();
	}

	public DeckComment toDeckComment() throws DeckException {
		DeckComment deckComment = new DeckComment();
		deckComment.setId(id);
		deckComment.setDeck(new Deck(deckId));
		deckComment.setCreateDate(createDate);
		deckComment.setModifyDate(modifyDate);
		deckComment.setValue(value);
		return deckComment;
	}

	public static List<JsonDeckComment> toJsonDeckComments(List<DeckComment> deckComments) {
		List<JsonDeckComment> jsonDeckComments = null;
		if (deckComments != null) {
			jsonDeckComments = new ArrayList<>();
			for (DeckComment deckComment : deckComments) {
				jsonDeckComments.add(new JsonDeckComment(deckComment));
			}
		}
		return jsonDeckComments;
	}
}
