package org.meb.conquest.web.rest.controller;

import java.io.IOException;
import java.util.List;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Predicate;
import org.meb.conquest.core.Cache;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.web.auth.AuthToken;
import org.meb.conquest.web.json.JsonUtils;
import org.meb.conquest.web.json.model.JsonCard;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/card")
public class CardController {

	private static final Logger log = LoggerFactory.getLogger(CardController.class);

	@Inject
	private RequestContext queryContext;

	@Inject
	private AuthToken authUser;

	@Inject
	private Cache cache;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadCards(@QueryParam("language") String language) {
		log.info("loadCards(): auth user: {}", authUser);

		queryContext.setUserId(authUser.getUserId());
		queryContext.setUserLanguage(language);

		try {
			List<Card> cards = cache.loadCards();
			return Response.ok(JsonUtils.write(cards)).build();
		} catch (IOException e) {
			log.error("Unable to load cards", e);
			return Response.serverError().build();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadCard(@PathParam("id") final Long id, @QueryParam("language") String language) {
		log.info("getDecks(): auth user: {}, id: ", authUser, id);

		queryContext.setUserId(authUser.getUserId());
		queryContext.setUserLanguage(language);

		try {
			Card card = CollectionUtils.find(cache.loadCards(), new Predicate<Card>() {

				@Override
				public boolean evaluate(Card card) {
					return card.getId().equals(id);
				}
			});

			return Response.ok(JsonUtils.write(new JsonCard(card))).build();
		} catch (IOException e) {
			log.error("Unable to load card", e);
			return Response.serverError().build();
		}
	}
}