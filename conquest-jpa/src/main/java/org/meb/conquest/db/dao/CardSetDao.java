package org.meb.conquest.db.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang.StringUtils;
import org.meb.conquest.db.model.loc.CardSet;
import org.meb.conquest.db.model.loc.CardSet_;

public class CardSetDao {

	private EntityManager em;

	public CardSetDao(EntityManager em) {
		this.em = em;
	}

	private TypedQuery<CardSet> createQuery(CardSet example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CardSet> cq = cb.createQuery(CardSet.class);
		Root<CardSet> root = cq.from(CardSet.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);

		Long id = example.getId();
		if (id != null) {
			predicates.add(cb.equal(root.get(CardSet_.id), id));
		}

		String techName = example.getTechName();
		if (StringUtils.isNotBlank(techName)) {
			predicates.add(cb.equal(cb.lower(root.get(CardSet_.techName)), techName.toLowerCase()));
		}

		String name = StringUtils.trimToEmpty(example.getName()).toLowerCase();
		if (StringUtils.isNotBlank(name)) {
			predicates.add(cb.like(cb.lower(root.get(CardSet_.name)), name));
		}

		if (predicates.size() > 0) {
			cq.where(predicates.toArray(new Predicate[predicates.size()]));
		}

		cq.orderBy(cb.asc(root.get(CardSet_.sequence)));

		return em.createQuery(cq);
	}

	public List<CardSet> find(CardSet example) {
		return createQuery(example).getResultList();
	}

	public CardSet findUnique(CardSet example) {
		CardSet cs;
		try {
			cs = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			cs = null;
		}
		return cs;
	}
}
