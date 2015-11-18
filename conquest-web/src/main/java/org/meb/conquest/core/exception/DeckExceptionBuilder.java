package org.meb.conquest.core.exception;

import javax.inject.Inject;

import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.service.RequestContext;

public class DeckExceptionBuilder {

	@Inject
	private RequestContext requestContext;

	public RequestContext getRequestContext() {
		return requestContext;
	}

	public void setRequestContext(RequestContext requestContext) {
		this.requestContext = requestContext;
	}

	public DeckException build(Deck deck, String error) {
		DeckException de;

		DeckType type = deck.getType();
		Long id = deck.getId();
		if (type == DeckType.BASE) {
			de = new DeckException(error, "error.deck.oper." + (id == null ? "save" : "modify"));
		} else if (type == DeckType.SNAPSHOT) {
			de = new DeckException(error, "error.deck.oper." + (id == null ? "publish" : "modify"));
		} else {
			de = new DeckException("error.deck.deck.invalidType");
		}

		de.setDeck(deck);
		de.setRequestContext(requestContext);

		return de;
	}
}
