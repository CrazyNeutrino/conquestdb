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
import org.meb.conquest.db.model.DomainBase;
import org.meb.conquest.db.model.DomainBase_;

public class DomainBaseDao {

	private EntityManager em;

	public DomainBaseDao(EntityManager em) {
		this.em = em;
	}

	private TypedQuery<DomainBase> createQuery(DomainBase example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<DomainBase> cq = cb.createQuery(DomainBase.class);
		Root<DomainBase> root = cq.from(DomainBase.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);

		String domain = example.getDomain();
		if (StringUtils.isNotBlank(domain)) {
			predicates.add(cb.equal(cb.lower(root.get(DomainBase_.domain)), domain.toLowerCase()));
		}

		String value = example.getValue();
		if (value != null) {
			predicates.add(cb.equal(root.get(DomainBase_.value), value));
		}

		if (predicates.size() > 0) {
			cq.where(predicates.toArray(new Predicate[predicates.size()]));
		}

		return em.createQuery(cq);
	}

	public List<DomainBase> find(DomainBase example) {
		return createQuery(example).getResultList();
	}

	public DomainBase findUnique(DomainBase example) {
		DomainBase csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}
}
