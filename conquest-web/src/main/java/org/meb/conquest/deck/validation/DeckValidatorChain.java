package org.meb.conquest.deck.validation;

import java.util.ArrayList;
import java.util.List;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.core.exception.DeckExceptionBuilder;
import org.meb.conquest.db.model.Deck;

import lombok.Getter;
import lombok.Setter;

public class DeckValidatorChain implements DeckValidator {

	private List<DeckValidator> validators = new ArrayList<>();

	@Getter
	@Setter
	private ValidationMode validationMode;

	@Getter
	@Setter
	private DeckExceptionBuilder deckExceptionBuilder;

	@Override
	public void validate(Deck deck) throws DeckException {
		for (DeckValidator validator : validators) {
			validator.validate(deck);
		}
	}

	public void addValidator(DeckValidator validator) {
		if (validator == null) {
			throw new IllegalArgumentException("Validator is null");
		}
		if (validator.getValidationMode() == null) {
			validator.setValidationMode(validationMode);
		}
		if (validator.getDeckExceptionBuilder() == null) {
			validator.setDeckExceptionBuilder(deckExceptionBuilder);
		}
		validators.add(validator);
	}
}
