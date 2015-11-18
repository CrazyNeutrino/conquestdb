package org.meb.conquest.deck.helper;

import static org.apache.commons.collections4.PredicateUtils.allPredicate;
import static org.apache.commons.collections4.PredicateUtils.orPredicate;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.predicate.CommonCardPredicate;
import org.meb.conquest.deck.predicate.RegularDeckCardPredicate;
import org.meb.conquest.deck.predicate.VehicleCardPredicate;
import org.meb.conquest.deck.validation.DeckValidator;
import org.meb.conquest.deck.validation.GorzodDeckValidator;

public class GorzodDeckHelper extends DeckHelperBase {

	public GorzodDeckHelper(Card warlord) {
		super(warlord);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Predicate<Card> buildAllowedCardPredicate() {
		Predicate<Card> regular = new RegularDeckCardPredicate(getWarlord());
		Predicate<Card> common = new CommonCardPredicate();
		Predicate<Card> vehicle = new VehicleCardPredicate();
		Predicate<Card> amOrSm = new Predicate<Card>() {
			@Override
			public boolean evaluate(Card card) {
				return card.getFaction() == Faction.ASTRA_MILITARUM
						|| card.getFaction() == Faction.SPACE_MARINES;
			}
		};
		return orPredicate(regular, allPredicate(common, vehicle, amOrSm));
	}

	@Override
	public DeckValidator buildDeckValidator() {
		return new GorzodDeckValidator(buildAllowedCardPredicate());
	}
}
