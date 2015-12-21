package org.meb.conquest.db.query;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

import org.meb.conquest.db.model.User;

@Getter
@Setter
public class UserQuery extends Query<User> {

	@CriteriaIn("deck.id")
	private Collection<Long> deckIds;
	
	public UserQuery() {
		this(new User(), Mode.AND);
	}
	
	public UserQuery(User example) {
		this(example, Mode.AND);
	}

	public UserQuery(User example, Mode mode) {
		super(example, mode);
		getFetchPaths().add("userContribSummary");
	}
}
