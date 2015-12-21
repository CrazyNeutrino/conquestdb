package org.meb.conquest.db.query;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

import org.meb.conquest.db.model.DeckLink;

@Getter
@Setter
public class DeckLinkQuery extends Query<DeckLink> {

	@CriteriaIn("deck.id")
	private Collection<Long> deckIds;
	
	public DeckLinkQuery() {
		this(new DeckLink(), Mode.AND);
	}

	public DeckLinkQuery(DeckLink example) {
		this(example, Mode.AND);
	}

	public DeckLinkQuery(DeckLink example, Mode mode) {
		super(example, mode);
		getFetchPaths().add("deck");
	}
}
