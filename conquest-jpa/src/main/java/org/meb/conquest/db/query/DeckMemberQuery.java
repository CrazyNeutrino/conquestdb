package org.meb.conquest.db.query;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

import org.meb.conquest.db.model.DeckMember;

@Getter
@Setter
public class DeckMemberQuery extends Query<DeckMember> {

	@CriteriaIn("deck.id")
	private Collection<Long> deckIds;
	
	public DeckMemberQuery() {
		super(new DeckMember(), Mode.AND);
	}

	public DeckMemberQuery(DeckMember example) {
		super(example, Mode.AND);
	}
}
