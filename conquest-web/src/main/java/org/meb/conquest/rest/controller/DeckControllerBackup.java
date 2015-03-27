package org.meb.conquest.rest.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.PropertyResourceBundle;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.collections4.Transformer;
import org.meb.conquest.auth.AuthToken;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.json.CardLoader;
import org.meb.conquest.json.DeckLoader;
import org.meb.conquest.json.JsonUtils;
import org.meb.conquest.json.model.JsonCard;
import org.meb.conquest.json.model.JsonDeck;
import org.meb.conquest.json.model.JsonDeckLink;
import org.meb.conquest.json.model.JsonDeckMember;
import org.meb.conquest.json.model.JsonError;
import org.meb.conquest.rest.MessageBundleResolver;
import org.meb.conquest.rest.controller.ExportedDeck.Type;
import org.meb.conquest.rest.exception.DeckException;
import org.meb.conquest.service.DeckService;
import org.meb.conquest.service.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//@Path("/deck")
public class DeckControllerBackup {

//	private static final Logger log = LoggerFactory.getLogger(DeckControllerBackup.class);
//
//	@Inject
//	private QueryContext queryContext;
//
//	@Inject
//	private DeckService deckService;
//
//	@Inject
//	private DeckLoader deckLoader;
//
//	@Inject
//	private CardLoader cardLoader;
//
//	@Inject
//	private AuthToken authUser;
//
//	@Inject
//	private MessageBundleResolver resolver;
//
//	@GET
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response loadDecks(@QueryParam("language") String language) {
//		log.info("loadDecks(): auth user: {}", authUser);
//
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			String json = JsonUtils.write(deckLoader.loadUserDecks());
//			return Response.ok(json).build();
//		} catch (IOException e) {
//			log.error("Unable to load decks", e);
//			return Response.serverError().build();
//		}
//	}
//
//	@GET
//	@Path("/{id}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response loadDeck(@PathParam("id") Long id, @QueryParam("language") String language) {
//		log.info("getDecks(): auth user: {}, id: ", authUser, id);
//
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			JsonDeck jsonDeck = null;
//			Deck deck = deckService.findUserDeck(id);
//			if (deck != null) {
//				jsonDeck = new JsonDeck(deck, true, true, true);
//			}
//			fillAllWarlordDeckCards(jsonDeck);
//			return Response.ok(JsonUtils.write(jsonDeck)).build();
//		} catch (IOException e) {
//			log.error("Unable to load deck", e);
//			return Response.serverError().build();
//		}
//	}
//
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response insertDeck(@QueryParam("language") String language, String body) {
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			Deck deck = JsonUtils.readObject(body, JsonDeck.class).toDeck();
//			deck = deckService.saveUserDeck(null, deck);
//			JsonDeck jsonDeck = new JsonDeck(deck, true, false, false);
//			fillAllWarlordDeckCards(jsonDeck);
//			return Response.ok(JsonUtils.write(jsonDeck)).build();
//		} catch (Exception e) {
//			DeckException de = processException(e, "error.deck.oper.save");
//			log.error(de.toString(), de);
//			PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
//			JsonError jsonError = new JsonError(de.getTimestamp().getTime(), de.toUserMessage(bundle));
//			return Response.serverError().entity(jsonError).build();
//		}
//	}
//
//	@PUT
//	@Path("/{id}")
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response updateDeck(@PathParam("id") Long id, @QueryParam("language") String language, String body) {
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			Deck deck = JsonUtils.readObject(body, JsonDeck.class).toDeck();
//			deck = deckService.saveUserDeck(id, deck);
//			JsonDeck jsonDeck = new JsonDeck(deck, true, true, true);
//			fillAllWarlordDeckCards(jsonDeck);
//			return Response.ok(JsonUtils.write(jsonDeck)).build();
//		} catch (Exception e) {
//			DeckException de = processException(e, "error.deck.oper.save");
//			log.error(de.toString(), de);
//			PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
//			JsonError jsonError = new JsonError(de.getTimestamp().getTime(), de.toUserMessage(bundle));
//			return Response.serverError().entity(jsonError).build();
//		}
//	}
//
//	@DELETE
//	@Path("/{id}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response deleteDeck(@PathParam("id") Long id, @QueryParam("language") String language) {
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			deckService.deleteUserDeck(id);
//			return Response.ok("{}").build();
//		} catch (Exception e) {
//			DeckException de = processException(e, "error.deck.oper.delete");
//			log.error(de.toString(), de);
//			PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
//			JsonError jsonError = new JsonError(de.getTimestamp().getTime(), de.toUserMessage(bundle));
//			return Response.serverError().entity(jsonError).build();
//		}
//	}
//
//	@GET
//	@Path("/export/octgn/{id}")
//	@Produces(MediaType.TEXT_PLAIN)
//	public Response exportDeckToOctgn(@PathParam("id") Long id, @QueryParam("language") String language) {
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			ExportedDeck exported = deckService.exportUserDeck(id, Type.OCTGN);
//			ResponseBuilder rs = Response.ok(exported.getData());
//			rs.header("Content-Disposition", "attachment; filename=\"" + exported.getTechName() + ".o8d\"");
//			return rs.build();
//		} catch (Exception e) {
//			DeckException de = processException(e, "error.deck.oper.export");
//			log.error(de.toString(), de);
//			PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
//			JsonError jsonError = new JsonError(de.getTimestamp().getTime(), de.toUserMessage(bundle));
//			return Response.serverError().entity(jsonError).build();
//		}
//	}
//
//	@POST
//	@Path("/link")
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response insertDeckLink(@QueryParam("language") String language, String body) {
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
//			DeckLink deckLink = JsonUtils.readObject(body, JsonDeckLink.class).toDeckLink();
//			deckLink = deckService.saveUserDeckLink(deckLink.getDeck().getId(), deckLink.getName());
//			JsonDeckLink jsonDeckLink = new JsonDeckLink(deckLink);
//			return Response.ok(JsonUtils.write(jsonDeckLink)).build();
//		} catch (Exception e) {
//			DeckException de = processException(e, "error.deck.oper.savePrivateLink");
//			log.error(de.toString(), de);
//			PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
//			JsonError jsonError = new JsonError(de.getTimestamp().getTime(), de.toUserMessage(bundle));
//			return Response.serverError().entity(jsonError).build();
//		}
//	}
//
//	@DELETE
//	@Path("/link/{id}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response deleteDeckLink(@PathParam("id") Long id, @QueryParam("language") String language) {
//		queryContext.setUserId(authUser.getUserId());
//		queryContext.setUserLanguage(language);
//
//		try {
////			deckService.deleteUserDeckLink(id);
//			return Response.ok("{}").build();
//		} catch (Exception e) {
//			DeckException de = processException(e, "error.deck.oper.deletePrivateLink");
//			log.error(de.toString(), de);
//			PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
//			JsonError jsonError = new JsonError(de.getTimestamp().getTime(), de.toUserMessage(bundle));
//			return Response.serverError().entity(jsonError).build();
//		}
//	}
//
//	private void fillAllWarlordDeckCards(JsonDeck jsonDeck) {
//		List<JsonDeckMember> members = jsonDeck.getMembers();
//		HashMap<Long, JsonDeckMember> membersMap = new HashMap<Long, JsonDeckMember>();
//		MapUtils.populateMap(membersMap, members, new Transformer<JsonDeckMember, Long>() {
//
//			@Override
//			public Long transform(JsonDeckMember member) {
//				return member.getCardId();
//			}
//
//		});
//
//		List<JsonCard> warlordDeckCards = cardLoader.loadWarlordDeckCards(jsonDeck.getWarlordId());
//		for (JsonCard card : warlordDeckCards) {
//			JsonDeckMember member = membersMap.get(card.getId());
//			if (member == null) {
//				member = new JsonDeckMember();
//				member.setCardId(card.getId());
//				member.setQuantity(0);
//				members.add(member);
//			}
//		}
//	}
//
//	private DeckException processException(Exception e, String message) {
//		DeckException de;
//		if (e instanceof DeckException) {
//			de = (DeckException) e;
//		} else {
//			de = new DeckException(e);
//			de.setPrimaryMessage(message);
//			de.setQueryContext(queryContext);
//		}
//		return de;
//	}
}