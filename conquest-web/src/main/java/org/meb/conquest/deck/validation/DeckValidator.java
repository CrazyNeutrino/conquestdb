package org.meb.conquest.deck.validation;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.core.exception.DeckExceptionBuilder;
import org.meb.conquest.db.model.Deck;

public interface DeckValidator {

	public enum ValidationMode {
		STRICT
	};

	void validate(Deck deck) throws DeckException;

	ValidationMode getValidationMode();
	
	void setValidationMode(ValidationMode validationMode);
	
	DeckExceptionBuilder getDeckExceptionBuilder();
	
	void setDeckExceptionBuilder(DeckExceptionBuilder deckExceptionBuilder);
}
