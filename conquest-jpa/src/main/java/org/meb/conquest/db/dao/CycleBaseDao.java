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
import org.meb.conquest.db.model.CycleBase;
import org.meb.conquest.db.model.CycleBase_;

public class CycleBaseDao {

	private EntityManager em;

	public CycleBaseDao(EntityManager em) {
		this.em = em;
	}

	private TypedQuery<CycleBase> createQuery(CycleBase example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CycleBase> cq = cb.createQuery(CycleBase.class);
		Root<CycleBase> root = cq.from(CycleBase.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(1);

		String techName = StringUtils.trimToEmpty(example.getTechName()).toLowerCase();
		if (StringUtils.isNotBlank(techName)) {
			predicates.add(cb.equal(cb.lower(root.get(CycleBase_.techName)), techName.toLowerCase()));
		}

		if (predicates.size() > 0) {
			cq.where(predicates.toArray(new Predicate[predicates.size()]));
		}

		return em.createQuery(cq);
	}

	public List<CycleBase> find(CycleBase example) {
		return createQuery(example).getResultList();
	}

	public CycleBase findUnique(CycleBase example) {
		CycleBase csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}
}
