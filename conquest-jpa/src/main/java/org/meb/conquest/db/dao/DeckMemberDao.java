package org.meb.conquest.db.dao;

import javax.persistence.EntityManager;
import javax.persistence.criteria.Root;

import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.DeckMember_;
import org.meb.conquest.db.query.DeckMemberQuery;
import org.meb.conquest.db.query.Query;

public class DeckMemberDao extends JpaDaoAbstract<DeckMember, DeckMemberQuery> {

	public DeckMemberDao(EntityManager em) {
		super(em);
	}

	@Override
	protected DeckMemberQuery createQuery(DeckMember example) {
		return new DeckMemberQuery(example);
	}

	@Override
	protected void fetchRelatedEntities(Query<DeckMember> query, Root<DeckMember> root) {
//		root.fetch(DeckMember_.card);
	}
}
