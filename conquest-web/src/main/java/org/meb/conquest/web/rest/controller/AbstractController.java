package org.meb.conquest.web.rest.controller;

import java.util.PropertyResourceBundle;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.web.auth.AuthToken;
import org.meb.conquest.web.json.model.JsonError;
import org.meb.conquest.web.rest.MessageBundleResolver;

public class AbstractController {

	@Inject
	protected RequestContext requestContext;
	@Inject
	protected AuthToken authToken;
	@Inject
	private MessageBundleResolver resolver;
	@Inject
	protected EntityManager em;

	protected DeckException buildDeckException(Exception e, String error) {
		DeckException de;
		if (e instanceof DeckException) {
			de = (DeckException) e;
			de.bindErrorContext(error);
		} else {
			de = new DeckException(e);
			de.setErrorCore(error);
			de.setRequestContext(requestContext);
		}
		return de;
	}

	protected JsonError buildJsonError(DeckException de) {
		PropertyResourceBundle bundle = resolver.getClientBundle(requestContext.getUserLanguage());
		return new JsonError(de.getTimestamp(), de.toUserMessage(bundle));
	}
}
