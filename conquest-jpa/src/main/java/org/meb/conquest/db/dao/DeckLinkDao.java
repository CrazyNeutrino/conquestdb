package org.meb.conquest.db.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckLink_;
import org.meb.conquest.db.model.Deck_;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.model.User_;
import org.meb.conquest.db.query.DeckLinkQuery;
import org.meb.conquest.db.query.Query;

public class DeckLinkDao extends JpaDaoAbstract<DeckLink, DeckLinkQuery> {

	public DeckLinkDao(EntityManager em) {
		super(em);
	}

	@Override
	protected DeckLinkQuery createQuery(DeckLink example) {
		return new DeckLinkQuery(example);
	}

	@Override
	protected void fetchRelatedEntities(Query<DeckLink> query, Root<DeckLink> root) {
		root.fetch(DeckLink_.deck);
	}

	@Override
	protected List<Predicate> buildCustomCriteria(DeckLinkQuery query, Root<DeckLink> root) {
		List<Predicate> predicates = super.buildCustomCriteria(query, root);

		Deck deck = query.getExample().getDeck();
		if (deck != null) {
			EntityManager em = getEntityManager();
			CriteriaBuilder cb = em.getCriteriaBuilder();

			Path<Deck> deckPath = root.get(DeckLink_.deck);
			if (deck.getType() != null) {
				predicates.add(cb.equal(deckPath.get(Deck_.id), deck.getId()));
			}

			User user = deck.getUser();
			if (user != null) {
				Path<User> userPath = deckPath.get(Deck_.user);
				Long id = user.getId();
				if (id != null) {
					predicates.add(cb.equal(userPath.get(User_.id), id));
				}
				String username = StringUtils.trimToNull(user.getUsername());
				if (username != null) {
					predicates.add(cb.equal(userPath.get(User_.username), username));
				}
			}
		}

		return predicates;
	}
}
