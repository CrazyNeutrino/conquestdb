package org.meb.conquest.deck.validation;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.predicate.VehicleCardPredicate;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GorzodDeckValidator extends DeckValidatorBase {

	@NonNull
	@Getter
	private Predicate<Card> allowedCardPredicate;

	@Override
	protected void validateComposition(Deck deck) throws DeckException {

		Set<String> spaceMarinesVehicle = new HashSet<>();
		Set<String> astraMilitarumNonVehicle = new HashSet<>();
		Set<String> chaosAny = new HashSet<>();

		VehicleCardPredicate vehicle = new VehicleCardPredicate();
		for (DeckMember member : deck.getDeckMembers()) {
			Card card = member.getCard();
			Faction faction = card.getFaction();

			if (faction == Faction.SPACE_MARINES) {
				spaceMarinesVehicle.add(card.getName());
			} else if (faction == Faction.CHAOS) {
				chaosAny.add(card.getName());
			} else if (faction == Faction.ASTRA_MILITARUM) {
				if (!vehicle.evaluate(card)) {
					astraMilitarumNonVehicle.add(card.getName());
				}
			}
		}

		if (spaceMarinesVehicle.size() > 0) {
			if (astraMilitarumNonVehicle.size() > 0) {
				DeckException de = buildDeckException(deck, "error.deck.comp.gorzod00");
				de.setErrorCoreParameter(0, joinCardNames(spaceMarinesVehicle, 3));
				de.setErrorCoreParameter(1, joinCardNames(astraMilitarumNonVehicle, 3));
				throw de;
			} else if (chaosAny.size() > 0) {
				DeckException de = buildDeckException(deck, "error.deck.comp.gorzod01");
				de.setErrorCoreParameter(0, joinCardNames(spaceMarinesVehicle, 3));
				de.setErrorCoreParameter(1, joinCardNames(chaosAny, 3));
				throw de;
			}
		}
	}
}
