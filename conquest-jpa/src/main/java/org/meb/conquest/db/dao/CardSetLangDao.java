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
import org.meb.conquest.db.model.CardSetBase;
import org.meb.conquest.db.model.CardSetLang;
import org.meb.conquest.db.model.CardSetLang_;

public class CardSetLangDao {

	private EntityManager em;
	private String langCode;

	public CardSetLangDao(EntityManager em, String langCode) {
		this.em = em;
		this.langCode = langCode;
	}

	private TypedQuery<CardSetLang> createQuery(CardSetLang example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CardSetLang> cq = cb.createQuery(CardSetLang.class);
		Root<CardSetLang> root = cq.from(CardSetLang.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);
		predicates.add(cb.equal(root.get(CardSetLang_.langCode), langCode));

		String name = example.getName();
		if (StringUtils.isNotBlank(name)) {
			predicates.add(cb.equal(cb.lower(root.get(CardSetLang_.name)), name.toLowerCase()));
		}

		String symbol = example.getSymbol();
		if (StringUtils.isNotBlank(symbol)) {
			predicates.add(cb.equal(cb.lower(root.get(CardSetLang_.symbol)), symbol.toLowerCase()));
		}

		String description = example.getDescription();
		if (StringUtils.isNotBlank(description)) {
			predicates.add(cb.equal(cb.lower(root.get(CardSetLang_.description)),
					description.toLowerCase()));
		}

		cq.where(predicates.toArray(new Predicate[predicates.size()]));

		return em.createQuery(cq);
	}

	public List<CardSetLang> find(CardSetLang example) {
		return createQuery(example).getResultList();
	}

	public CardSetLang findUnique(CardSetLang example) {
		CardSetLang csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}

	public List<CardSetBase> findBase(CardSetLang example) {
		ArrayList<CardSetBase> results = new ArrayList<CardSetBase>();
		for (CardSetLang csl : find(example)) {
			results.add(csl.getBase());
		}
		return results;
	}

	public CardSetBase findBaseUnique(CardSetLang example) {
		CardSetLang csl = findUnique(example);
		CardSetBase csb = csl == null ? null : csl.getBase();
		return csb;
	}
}
