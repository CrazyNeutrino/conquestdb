package org.meb.conquest.db.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Parameter;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.db.model.Deck_;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.model.User_;
import org.meb.conquest.db.query.DeckQuery;
import org.meb.conquest.db.query.Query;

public class DeckDao extends JpaDaoAbstract<Deck, DeckQuery> {

	public DeckDao(EntityManager em) {
		super(em);
	}

	@Override
	protected void fetchRelatedEntities(Query<Deck> query, Root<Deck> root) {
		// root.fetch(Deck_.warlord);
		// root.fetch(Deck_.user);
		if (query.getExample().getType() == DeckType.SNAPSHOT) {
			root.fetch(Deck_.snapshotBase); // .fetch(Deck_.warlord);
		}
	}

	@Override
	protected DeckQuery createQuery(Deck example) {
		return new DeckQuery(example);
	}

	@Override
	protected void setTypedQueryParameterValues(TypedQuery<?> typedQuery, DeckQuery query) {
		if (query.getCrstBitmap() != null) {
			for (Parameter<?> paramater : typedQuery.getParameters()) {
				if ("crstBitmap".equals(paramater.getName())) {
					typedQuery.setParameter("crstBitmap", query.getCrstBitmap());
					break;
				}
			}			
		}		
	}

	@Override
	protected List<Predicate> buildCustomCriteria(DeckQuery query, Root<Deck> root) {
		List<Predicate> predicates = super.buildCustomCriteria(query, root);

		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();

		User user = query.getExample().getUser();
		if (user != null) {
			Long id = user.getId();
			if (id != null) {
				predicates.add(cb.equal(root.join(Deck_.user).get(User_.id), id));
			}
			String username = StringUtils.trimToNull(user.getUsername());
			if (username != null) {
				predicates.add(cb.equal(root.join(Deck_.user).get(User_.username), username));
			}
		}

		Deck snapshotBase = query.getExample().getSnapshotBase();
		if (snapshotBase != null) {
			Long id = snapshotBase.getId();
			if (id != null) {
				predicates.add(cb.equal(root.join(Deck_.snapshotBase).get(Deck_.id), id));
			}
		}

		Path<Long> crstBitmapPath = null;
		
		Long crstBitmap = query.getCrstBitmap();
		if (crstBitmap != null) {
			ParameterExpression<Long> crstBitmapParameter = cb.parameter(Long.class, "crstBitmap");
			crstBitmapPath = root.get(Deck_.crstBitmap);
			if ("exact".equals(query.getCrstMatchMode())) {
				predicates.add(cb.equal(crstBitmapPath, crstBitmap));
			} else {
				Expression<?> function = cb.function("cqp_bitwise_or", Long.class, crstBitmapPath, crstBitmapParameter);
				predicates.add(cb.equal(function, crstBitmap));				
			}
		}
		if (Boolean.TRUE.equals(query.getCrstSkipCoreSetOnly())) {
			if (crstBitmap == null) {
				crstBitmapPath = root.get(Deck_.crstBitmap);
			}
			predicates.add(cb.notEqual(crstBitmapPath, 1L));
		}

		return predicates;
	}
}
