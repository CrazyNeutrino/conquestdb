package org.meb.conquest.service.api;

import java.util.List;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.query.DeckQuery;
import org.meb.conquest.web.rest.controller.ExportedDeck;
import org.meb.conquest.web.rest.controller.ExportedDeck.Type;

public interface DeckService extends SearchService {

	Deck findUserDeck(Long deckId, boolean throwWhenNotFound) throws DeckException;

	Deck findUserDeckViaPrivateLink(String id, boolean throwWhenNotFound) throws DeckException;
	
	List<Deck> findUserDecks();

	List<Deck> findUserDecks(DeckQuery query);
	
	Long countUserDecks(DeckQuery query);

	Deck saveUserDeck(Long deckId, Deck deck) throws DeckException;

	void deleteUserDeck(Long deckId) throws DeckException;

	ExportedDeck exportUserDeck(Long deckId, Type type) throws DeckException;
	
	ExportedDeck exportUserDecks(DeckQuery query, Type type) throws DeckException;

	DeckLink findUserDeckLink(Long deckId, Long linkId) throws DeckException;

	List<DeckLink> findUserDeckLinks(Long deckId) throws DeckException;

	DeckLink saveUserDeckLink(Long deckId, String linkName) throws DeckException;

	void deleteUserDeckLink(Long deckId, Long linkId) throws DeckException;

	Deck findPublicDeck(Long deckId, boolean throwWhenNotFound) throws DeckException;

	List<Deck> findPublicDecks(DeckQuery query);
	
	Long countPublicDecks(DeckQuery query);

	ExportedDeck exportPublicDeck(Long deckId, Type type) throws DeckException;

	DeckComment findPublicDeckComment(Long deckId, Long commentId);

	List<DeckComment> findPublicDeckComments(Long deckId);

	DeckComment savePublicDeckComment(Long deckId, Long commentId, DeckComment deckComment) throws DeckException;

	void deletePublicDeckComment(Long deckId, Long commentId) throws DeckException;
}
