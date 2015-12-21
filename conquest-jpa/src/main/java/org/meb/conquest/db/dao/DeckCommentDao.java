package org.meb.conquest.db.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckComment_;
import org.meb.conquest.db.model.Deck_;
import org.meb.conquest.db.query.DeckCommentQuery;

public class DeckCommentDao extends JpaDaoAbstract<DeckComment, DeckCommentQuery> {

	public DeckCommentDao(EntityManager em) {
		super(em);
	}

	@Override
	protected DeckCommentQuery createQuery(DeckComment example) {
		return new DeckCommentQuery(example);
	}

	@Override
	protected List<Predicate> buildCustomCriteria(DeckCommentQuery query, Root<DeckComment> root) {
		List<Predicate> predicates = super.buildCustomCriteria(query, root);

		Deck deck = query.getExample().getDeck();
		if (deck != null) {
			EntityManager em = getEntityManager();
			CriteriaBuilder cb = em.getCriteriaBuilder();

			Path<Deck> deckPath = root.get(DeckComment_.deck);
			if (deck.getId() != null) {
				predicates.add(cb.equal(deckPath.get(Deck_.id), deck.getId()));
			}
			if (deck.getType() != null) {
				predicates.add(cb.equal(deckPath.get(Deck_.type), deck.getType()));
			}
			if (deck.getSnapshotPublic() != null) {
				predicates.add(
						cb.equal(deckPath.get(Deck_.snapshotPublic), deck.getSnapshotPublic()));
			}
		}

		return predicates;
	}
}
