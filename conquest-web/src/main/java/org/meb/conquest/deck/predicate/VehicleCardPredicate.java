package org.meb.conquest.deck.predicate;

import org.apache.commons.collections4.Predicate;
import org.apache.commons.lang3.ArrayUtils;
import org.meb.conquest.db.model.loc.Card;

public class VehicleCardPredicate implements Predicate<Card> {

	@Override
	public boolean evaluate(Card card) {
		String trait = card.getTraitEn();
		if (trait == null) {
			return false;
		} else {
			String[] traits = trait.trim().toLowerCase().split(" *\\. *");
			return ArrayUtils.indexOf(traits, "vehicle") >= 0;
		}
	}
}
