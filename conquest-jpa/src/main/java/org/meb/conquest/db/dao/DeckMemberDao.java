package org.meb.conquest.db.dao;

import javax.persistence.EntityManager;

import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.query.DeckMemberQuery;

public class DeckMemberDao extends JpaDaoAbstract<DeckMember, DeckMemberQuery> {

	public DeckMemberDao(EntityManager em) {
		super(em);
	}

	@Override
	protected DeckMemberQuery createQuery(DeckMember example) {
		return new DeckMemberQuery(example);
	}
}
