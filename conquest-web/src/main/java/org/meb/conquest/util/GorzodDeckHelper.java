package org.meb.conquest.util;

import static org.apache.commons.collections4.PredicateUtils.allPredicate;
import static org.apache.commons.collections4.PredicateUtils.orPredicate;

import java.util.List;

import org.apache.commons.collections4.Predicate;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.util.predicate.CommonDeckCardPredicate;
import org.meb.conquest.util.predicate.StandardDeckCardPredicate;

public class GorzodDeckHelper extends DeckHelperBase {

	public GorzodDeckHelper(Card warlord) {
		super(warlord);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Card> filterValidDeckCards(List<Card> cards) {
		Predicate<Card> standard = new StandardDeckCardPredicate(getWarlord());
		Predicate<Card> common = new CommonDeckCardPredicate();
		Predicate<Card> amOrSm = new Predicate<Card>() {
			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.ASTRA_MILITARUM
						|| card.getFaction() == Faction.SPACE_MARINES;
			}
		};
		Predicate<Card> vehicle = new Predicate<Card>() {
			@Override
			public boolean evaluate(Card card) {
				String trait = card.getTraitEn();
				if (StringUtils.isBlank(trait)) {
					return false;
				} else {
					String[] traits = trait.trim().toLowerCase().split(" *\\. *");
					return ArrayUtils.indexOf(traits, "vehicle") >= 0;
				}
			}
		};
		return filterCards(cards, orPredicate(standard, allPredicate(common, amOrSm, vehicle)));
	}
}
