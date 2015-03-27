package org.meb.conquest.db.query;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

import org.meb.conquest.db.model.DeckComment;

@Getter
@Setter
public class DeckCommentQuery extends Query<DeckComment> {

	@CriteriaIn("deck.id")
	private Collection<Long> deckIds;
	
	public DeckCommentQuery() {
		super(new DeckComment(), Mode.AND);
	}

	public DeckCommentQuery(DeckComment example) {
		super(example, Mode.AND);
	}
}
