package org.meb.conquest.db.query;

import org.meb.conquest.db.model.DeckInterest;

public class DeckInterestQuery extends Query<DeckInterest> {

	public DeckInterestQuery() {
		super(new DeckInterest());
	}
	
	public DeckInterestQuery(DeckInterest example) {
		super(example);
	}
}
