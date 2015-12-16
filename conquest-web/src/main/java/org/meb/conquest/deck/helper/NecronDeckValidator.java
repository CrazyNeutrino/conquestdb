package org.meb.conquest.deck.helper;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.deck.validation.DeckValidatorBase;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class NecronDeckValidator extends DeckValidatorBase {

	@NonNull
	@Getter
	private Predicate<Card> allowedCardPredicate;

	@Override
	protected void validateComposition(Deck deck) throws DeckException {
		// TODO Auto-generated method stub
	}
}