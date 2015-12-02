package org.meb.conquest.service.api;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.service.DeckInterestWrapper;

public interface DeckInterestService extends SearchService {

	DeckInterestWrapper favourite(Long deckId, Integer value) throws DeckException;

	DeckInterestWrapper rate(Long deckId, Integer value) throws DeckException;

	DeckInterestWrapper loadInterest(Long deckId);

	void flushToDatabase();
}
