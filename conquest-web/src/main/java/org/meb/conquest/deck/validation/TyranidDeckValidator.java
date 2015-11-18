package org.meb.conquest.deck.validation;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.loc.Card;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TyranidDeckValidator extends DeckValidatorBase {

	@NonNull
	@Getter
	private Predicate<Card> allowedCardPredicate;

	@Override
	protected void validateQuantities(Deck deck) throws DeckException {
		super.validateQuantities(deck);

		if (getValidationMode() == ValidationMode.STRICT) {
			int synapseQuantity = 0;
			for (DeckMember deckMember : deck.getDeckMembers()) {
				if (deckMember.getCard().getType() == CardType.SYNAPSE) {
					synapseQuantity += deckMember.getQuantity().intValue();
				}
			}

			if (synapseQuantity != 1) {
				DeckException de = buildDeckException(deck,
						"error.deck.comp.invalidSynapseQuantity");
				de.setErrorCoreParameter(1, String.valueOf(synapseQuantity));
				throw de;
			}
		}
	}

	@Override
	protected void validateComposition(Deck deck) throws DeckException {
		// not needed
	}
}
