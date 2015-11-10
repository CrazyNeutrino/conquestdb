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
import org.meb.conquest.db.model.CycleLang;
import org.meb.conquest.db.model.CycleLang_;

public class CycleLangDao {

	private EntityManager em;
	private String langCode;

	public CycleLangDao(EntityManager em, String langCode) {
		this.em = em;
		this.langCode = langCode;
	}

	private TypedQuery<CycleLang> createQuery(CycleLang example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CycleLang> cq = cb.createQuery(CycleLang.class);
		Root<CycleLang> root = cq.from(CycleLang.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);
		predicates.add(cb.equal(root.get(CycleLang_.langCode), langCode));

		String name = StringUtils.trimToEmpty(example.getName()).toLowerCase();
		if (StringUtils.isNotBlank(name)) {
			predicates.add(cb.equal(cb.lower(root.get(CycleLang_.name)), name.toLowerCase()));
		}

		String description = StringUtils.trimToEmpty(example.getDescription()).toLowerCase();
		if (StringUtils.isNotBlank(description)) {
			predicates.add(cb.equal(cb.lower(root.get(CycleLang_.description)),
					description.toLowerCase()));
		}

		cq.where(predicates.toArray(new Predicate[predicates.size()]));

		return em.createQuery(cq);
	}

	public List<CycleLang> find(CycleLang example) {
		return createQuery(example).getResultList();
	}

	public CycleLang findUnique(CycleLang example) {
		CycleLang csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}
}
