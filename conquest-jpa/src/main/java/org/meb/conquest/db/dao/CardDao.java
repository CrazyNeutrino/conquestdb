package org.meb.conquest.db.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.Card_;
import org.meb.conquest.db.query.CardQuery;

public class CardDao extends JpaDaoAbstract<Card, CardQuery> {

	public CardDao(EntityManager em) {
		super(em);
	}

	@Override
	protected CardQuery createQuery(Card example) {
		return new CardQuery(example);
	}

	@Override
	protected List<Predicate> buildCustomCriteria(CardQuery query, Root<Card> root) {
		List<Predicate> predicates = new ArrayList<Predicate>();
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();

		if (query.isSearchDeckCards()) {
			Faction faction = query.getDeckFaction();
			Long warlordId = query.getDeckWarlordId();

			Predicate prThisFaction = cb.equal(root.get(Card_.faction), faction);
			Predicate prThisSignSquad = cb.equal(root.get(Card_.warlordId), warlordId);
			Predicate prFactions = root.get(Card_.faction).in((Object[]) faction.alliance());
			Predicate prNotLoyal = cb.equal(root.get(Card_.loyal), Boolean.FALSE);
			Predicate prNotSignSquad = root.get(Card_.warlordId).isNull();

			predicates.add(prFactions);
			predicates.add(root.get(Card_.type).in(CardType.TOKEN, CardType.PLANET, CardType.WARLORD).not());
			predicates.add(cb.or(prThisSignSquad, prNotSignSquad));
			predicates.add(cb.or(prNotLoyal, prThisFaction));
		} else {
			predicates.addAll(super.buildCustomCriteria(query, root));

			String text = StringUtils.trimToEmpty(query.getText()).toLowerCase();
			if (StringUtils.isNotBlank(text)) {
				text = "%" + text + "%";
				List<Predicate> textPredicates = new ArrayList<Predicate>();
				if (query.isSearchInName()) {
					textPredicates.add(cb.like(cb.lower(root.get(Card_.name)), text));
				}
				if (query.isSearchInTrait()) {
					textPredicates.add(cb.like(cb.lower(root.get(Card_.trait)), text));
				}
				if (query.isSearchInText()) {
					textPredicates.add(cb.like(cb.lower(root.get(Card_.text)), text));
				}

				if (textPredicates.size() > 0) {
					predicates.add(cb.or(textPredicates.toArray(new Predicate[textPredicates.size()])));
				}
			}
		}

		return predicates;
	}
}
