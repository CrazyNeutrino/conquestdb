package org.meb.conquest.rest.exception;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.TreeMap;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.service.RequestContext;

@Getter
@Setter
@ToString(of = { "timestamp", "errorCore", "errorCoreParameters", "errorContext",
		"errorContextParameters", "userId", "userLanguage", "deckId", "deckUserId", "deckType",
		"snapshotBaseId", "deckLink" }, includeFieldNames = true)
public class DeckException extends Exception {

	private static final long serialVersionUID = -8041281990825185948L;

	private long timestamp;

	private String errorCore;
	private String errorContext;
	private Map<Integer, String> errorCoreParameters = new HashMap<>();
	private Map<Integer, String> errorContextParameters = new HashMap<>();

	private Long deckId;
	private Long deckUserId;
	private DeckType deckType;
	private Long snapshotBaseId;
	private String deckLink;

	private Long userId;
	private String userLanguage;

	public DeckException(String errorCore) {
		this(errorCore, null);
	}

	public DeckException(String errorCore, String errorContext) {
		this.timestamp = new Date().getTime();
		this.errorCore = errorCore;
		this.errorContext = errorContext;
	}

	public DeckException(Throwable cause) {
		super(cause);
		this.timestamp = new Date().getTime();
	}

	public void setDeck(Deck deck) {
		this.deckId = deck.getId();
		if (deck.getUser() != null) {
			this.deckUserId = deck.getUser().getId();
		}
		if (deck.getSnapshotBase() != null) {
			this.snapshotBaseId = deck.getSnapshotBase().getId();
		}
		this.deckType = deck.getType();
	}

	public void setRequestContext(RequestContext requestContext) {
		this.userId = requestContext.getUserId();
		this.userLanguage = requestContext.getUserLanguage();
	}

	public void setErrorCoreParameter(Integer index, String value) {
		errorCoreParameters.put(index, value);
	}

	public void setErrorContextParameter(Integer index, String value) {
		errorContextParameters.put(index, value);
	}

	public String toUserMessage(ResourceBundle bundle) {
		StringBuilder builder = new StringBuilder();
		if (errorContext != null) {
			builder.append(buildMessage(bundle, errorContext, errorContextParameters));
		}
		if (errorCore != null) {
			builder.append(" ").append(buildMessage(bundle, errorCore, errorCoreParameters));
		}

		return builder.toString().trim();
	}

	private String buildMessage(ResourceBundle bundle, String key, Map<Integer, String> parameters) {
		String message = bundle.getString(key);
		if (parameters.size() > 0) {
			message = MessageFormat.format(message, new TreeMap<>(parameters).values().toArray());
		}
		return message;
	}
	
	public DeckException bindErrorContext(String errorContext) {
		if (this.errorContext == null && !this.errorCore.equals(errorContext)) {
			this.errorContext = errorContext;
		}
		
		return this;
	}
}
