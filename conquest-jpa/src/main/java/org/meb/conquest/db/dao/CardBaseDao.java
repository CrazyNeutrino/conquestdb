package org.meb.conquest.db.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang.StringUtils;
import org.meb.conquest.db.model.CardBase;
import org.meb.conquest.db.model.CardBase_;
import org.meb.conquest.db.model.CardSetBase;
import org.meb.conquest.db.model.CardSetBase_;
import org.meb.conquest.db.model.CardType;

public class CardBaseDao {

	private EntityManager em;

	public CardBaseDao(EntityManager em) {
		this.em = em;
	}

	private TypedQuery<CardBase> createQuery(CardBase example) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CardBase> cq = cb.createQuery(CardBase.class);
		Root<CardBase> root = cq.from(CardBase.class);
		cq.select(root);

		List<Predicate> predicates = new ArrayList<Predicate>(3);

		String techName = example.getTechName();
		if (StringUtils.isNotBlank(techName)) {
			predicates
					.add(cb.equal(cb.lower(root.get(CardBase_.techName)), techName.toLowerCase()));
		}

		CardType typeCode = example.getType();
		if (typeCode != null) {
			predicates.add(cb.equal(root.get(CardBase_.type), typeCode));
		}
		
		Integer number = example.getNumber();
		if (number != null) {
			predicates.add(cb.equal(root.get(CardBase_.number), number));
		}

		Join<CardBase, CardSetBase> csbJoin = root.join(CardBase_.cardSetBase);
		
		CardSetBase csb = example.getCardSetBase();
		if (csb != null) {
			String csbTechName = csb.getTechName();
			if (StringUtils.isNotBlank(csbTechName)) {
				predicates.add(cb.equal(cb.lower(csbJoin.get(CardSetBase_.techName)),
						csbTechName.toLowerCase()));
			}
		}

		if (predicates.size() > 0) {
			cq.where(predicates.toArray(new Predicate[predicates.size()]));
		}
		
		List<Order> orderList = new ArrayList<Order>();
		orderList.add(cb.asc(csbJoin.get(CardSetBase_.sequence)));
		orderList.add(cb.asc(root.get(CardBase_.number)));
		cq.orderBy(orderList);

		return em.createQuery(cq);
	}

	public List<CardBase> find(CardBase example) {
		return createQuery(example).getResultList();
	}

	public CardBase findUnique(CardBase example) {
		CardBase csl;
		try {
			csl = createQuery(example).getSingleResult();
		} catch (NoResultException e) {
			csl = null;
		}
		return csl;
	}
	
	public CardBase findUnique(Long id) {
		return em.find(CardBase.class, id);
	}
}
