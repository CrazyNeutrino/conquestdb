package org.meb.conquest.service.api;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.service.DeckInterestWrapper;

public interface DeckInterestService extends SearchService {

	DeckInterestWrapper markFavourite(Long deckId, Integer value) throws DeckException;

	DeckInterestWrapper markSuperb(Long deckId, Integer value) throws DeckException;

	DeckInterestWrapper loadDeckInterests(Long deckId);

	void flushDeckInterests();
}
