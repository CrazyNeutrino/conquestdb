package org.meb.conquest.db.query;

import java.util.Collection;

import org.meb.conquest.db.model.UserContribSummary;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserContribSummaryQuery extends Query<UserContribSummary> {

	@CriteriaIn("deck.id")
	private Collection<Long> deckIds;

	public UserContribSummaryQuery() {
		this(new UserContribSummary(), Mode.AND);
	}

	public UserContribSummaryQuery(UserContribSummary example) {
		this(example, Mode.AND);
	}

	public UserContribSummaryQuery(UserContribSummary example, Mode mode) {
		super(example, mode);
		getFetchPaths().add("user");
	}
}
