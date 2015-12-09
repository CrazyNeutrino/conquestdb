package org.meb.conquest.web.rest.controller;

import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.service.DeckInterestWrapper;
import org.meb.conquest.service.api.DeckInterestService;
import org.meb.conquest.web.json.JsonUtils;
import org.meb.conquest.web.json.model.JsonDeckInterest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/deck")
public class DeckInterestController extends AbstractController {

	private static final Logger log = LoggerFactory.getLogger(DeckInterestController.class);

	@Inject
	private DeckInterestService deckInterestService;

	@POST
	@Path("/public/{deckId}/favourite/{value}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response markFavourite(@PathParam("deckId") Long deckId, @PathParam("value") Integer value,
			@QueryParam("language") String language) throws DeckException {

		requestContext.setUserId(authToken.getUserId());
		requestContext.setUserLanguage(language);

		if (value == null) {
			throw new WebApplicationException(Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
					.entity("Missing value parameter").build());
		}

		try {
			DeckInterestWrapper wrapper = deckInterestService.markFavourite(deckId, value);
			return Response.ok(JsonUtils.write(wrapperToMap(wrapper))).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.markFavourite");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@POST
	@Path("/public/{deckId}/superb/{value}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response markSuperb(@PathParam("deckId") Long deckId, @PathParam("value") Integer value,
			@QueryParam("language") String language) throws DeckException {

		requestContext.setUserId(authToken.getUserId());
		requestContext.setUserLanguage(language);

		if (value == null) {
			throw new WebApplicationException(Response.status(HttpURLConnection.HTTP_BAD_REQUEST)
					.entity("Missing value parameter").build());
		}

		try {
			DeckInterestWrapper wrapper = deckInterestService.markSuperb(deckId, value);
			return Response.ok(JsonUtils.write(wrapperToMap(wrapper))).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.markSuperb");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/public/{deckId}/interest")
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadInterest(@PathParam("deckId") Long deckId,
			@QueryParam("language") String language) throws DeckException {

		requestContext.setUserId(authToken.getUserId());
		requestContext.setUserLanguage(language);

		try {
			DeckInterestWrapper wrapper = deckInterestService.loadUserDeckInterests(deckId);
			return Response.ok(JsonUtils.write(wrapperToMap(wrapper))).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.rateDeck");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	private Map<String, JsonDeckInterest> wrapperToMap(DeckInterestWrapper wrapper) {
		Map<String, JsonDeckInterest> map = new HashMap<>();
		if (wrapper.getUserDeckInterest() != null) {
			map.put("user", new JsonDeckInterest(wrapper.getUserDeckInterest()));
		}
		if (wrapper.getTotalDeckInterest() != null) {
			map.put("total", new JsonDeckInterest(wrapper.getTotalDeckInterest()));
		}
		return map;
	}
}
