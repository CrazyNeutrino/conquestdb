package org.meb.conquest.deck.validation;

import java.util.Iterator;
import java.util.Set;

import org.apache.commons.collections4.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.core.Constant;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.core.exception.DeckExceptionBuilder;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.loc.Card;

import lombok.Getter;
import lombok.Setter;

public abstract class DeckValidatorBase implements DeckValidator {

	@Getter
	@Setter
	private ValidationMode validationMode;

	@Getter
	@Setter
	private DeckExceptionBuilder deckExceptionBuilder;

	protected abstract Predicate<Card> getAllowedCardPredicate();
	
	protected abstract void validateComposition(Deck deck) throws DeckException;

	@Override
	public void validate(Deck deck) throws DeckException {
		validateDeck(deck);
		validateQuantities(deck);
		validateAllowedCards(deck);
		validateComposition(deck);
	}

	protected void validateDeck(Deck deck) throws DeckException {
		Integer csQuantity = deck.getConfigCsQuantity();
		if (csQuantity == null || csQuantity < 1 || csQuantity > 3) {
			DeckException de = buildDeckException(deck, "error.deck.deck.invalidCsQuantity");
			de.setErrorCoreParameter(1, String.valueOf(csQuantity));
			throw de;
		}

		if (StringUtils.isBlank(deck.getName())) {
			throw buildDeckException(deck, "error.deck.name.empty");
		}
		if (deck.getName().trim().length() > Constant.Deck.MAX_NAME_LEN) {
			DeckException de = buildDeckException(deck, "error.deck.name.tooLong");
			de.setErrorCoreParameter(0, String.valueOf(Constant.Deck.MAX_NAME_LEN));
			throw de;
		}
		if (deck.getDescription() != null
				&& deck.getDescription().trim().length() > Constant.Deck.MAX_DESCRIPTION_LEN) {
			DeckException de = buildDeckException(deck, "error.deck.description.tooLong");
			de.setErrorCoreParameter(0, String.valueOf(Constant.Deck.MAX_DESCRIPTION_LEN));
			throw de;
		}
	}

	protected void validateQuantities(Deck deck) throws DeckException {
		/*
		 * check each member quantity
		 */
		Integer csQuantity = deck.getConfigCsQuantity();
		int totalQuantity = 0;
		for (DeckMember deckMember : deck.getDeckMembers()) {
			Card card = deckMember.getCard();
			Integer maxQuantity;
			boolean signSquad = card.getWarlordId() != null;
			boolean synapse = card.getType() == CardType.SYNAPSE;
			if (signSquad || synapse) {
				maxQuantity = card.getQuantity();
			} else {
				maxQuantity = Math.min(3, csQuantity * card.getQuantity());
			}
			Integer quantity = deckMember.getQuantity();
			if (quantity == null || quantity < 1 || quantity > maxQuantity) {
				DeckException de = buildDeckException(deck, "error.deck.comp.invalidQuantity");
				de.setErrorCoreParameter(0, card.getName());
				de.setErrorCoreParameter(1, String.valueOf(quantity));
				throw de;
			}
			totalQuantity += deckMember.getQuantity().intValue();
		}

		/*
		 * check total members quantity
		 */
		if (validationMode == ValidationMode.STRICT && totalQuantity < 50) {
			DeckException de = buildDeckException(deck, "error.deck.comp.invalidTotalQuantity");
			de.setErrorCoreParameter(0, String.valueOf(totalQuantity));
			throw de;
		}
	}

	protected void validateAllowedCards(Deck deck) throws DeckException {
		/*
		 * check if cards are allowed in this deck
		 */
		Predicate<Card> predicate = getAllowedCardPredicate();
		for (DeckMember member : deck.getDeckMembers()) {
			Card card = member.getCard();
			if (!predicate.evaluate(card)) {
				DeckException de = buildDeckException(deck, "error.deck.comp.invalidCard");
				de.setErrorCoreParameter(1, card.getName());
				throw de;
			}
		}
	}

	protected DeckException buildDeckException(Deck deck, String error) {
		return deckExceptionBuilder.build(deck, error);
	}

	protected String joinCardNames(Set<String> cardNames, int max) {
		int count = 0;
		StringBuilder joinedCardNames = new StringBuilder();
		Iterator<String> iter = cardNames.iterator();
		while (iter.hasNext() && count++ < max) {
			joinedCardNames.append(iter.next());
			if (iter.hasNext()) {
				if (count == max) {
					joinedCardNames.append(", ...");
				} else {
					joinedCardNames.append(", ");
				}
			}
		}
		return joinedCardNames.toString();
	}
}
