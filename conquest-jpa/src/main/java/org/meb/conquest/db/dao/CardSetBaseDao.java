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

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.CardSetBase;
import org.meb.conquest.db.model.CardSetBase_;

public class CardSetBaseDao {

	private EntityManager em;

	public CardSetBaseDao(EntityManager em) {
		this.em = em;
	}

	private TypedQuery<CardSetBase> createQuery(CardSetBase example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CardSetBase> cq = cb.createQuery(CardSetBase.class);
		Root<CardSetBase> root = cq.from(CardSetBase.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);

		String techName = example.getTechName();
		if (StringUtils.isNotBlank(techName)) {
			predicates.add(cb.equal(cb.lower(root.get(CardSetBase_.techName)),
					techName.toLowerCase()));
		}

		if (predicates.size() > 0) {
			cq.where(predicates.toArray(new Predicate[predicates.size()]));
		}

		cq.orderBy(cb.asc(root.get(CardSetBase_.sequence)));

		return em.createQuery(cq);
	}

	public List<CardSetBase> find(CardSetBase example) {
		return createQuery(example).getResultList();
	}

	public CardSetBase findUnique(CardSetBase example) {
		CardSetBase csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}
}
