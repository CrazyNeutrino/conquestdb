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
import org.meb.conquest.db.model.CardBase;
import org.meb.conquest.db.model.CardLang;
import org.meb.conquest.db.model.CardLang_;

public class CardLangDao {

	private EntityManager em;
	private String langCode;

	public CardLangDao(EntityManager em, String langCode) {
		this.em = em;
		this.langCode = langCode;
	}

	private TypedQuery<CardLang> createQuery(CardLang example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CardLang> cq = cb.createQuery(CardLang.class);
		Root<CardLang> root = cq.from(CardLang.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);
		predicates.add(cb.equal(root.get(CardLang_.langCode), langCode));

		String name = example.getName();
		if (StringUtils.isNotBlank(name)) {
			predicates.add(cb.equal(cb.lower(root.get(CardLang_.name)), name.toLowerCase()));
		}

		cq.where(predicates.toArray(new Predicate[predicates.size()]));

		return em.createQuery(cq);
	}

	public List<CardLang> find(CardLang example) {
		return createQuery(example).getResultList();
	}

	public CardLang findUnique(CardLang example) {
		CardLang csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}

	public List<CardBase> findBase(CardLang example) {
		ArrayList<CardBase> results = new ArrayList<CardBase>();
		for (CardLang csl : find(example)) {
			results.add(csl.getBase());
		}
		return results;
	}

	public CardBase findBaseUnique(CardLang example) {
		CardLang csl = findUnique(example);
		CardBase csb = csl == null ? null : csl.getBase();
		return csb;
	}
}
