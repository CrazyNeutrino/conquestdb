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
		this(new DeckComment(), Mode.AND);
	}
	
	public DeckCommentQuery(DeckComment example) {
		this(example, Mode.AND);
	}

	public DeckCommentQuery(DeckComment example, Mode mode) {
		super(example, mode);
		getFetchPaths().add("user");
		getFetchPaths().add("deck");
	}
}
