package org.meb.conquest.rest.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.PropertyResourceBundle;
import java.util.regex.Pattern;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.persistence.EntityManager;
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
import org.jboss.resteasy.annotations.Form;
import org.meb.conquest.auth.AuthToken;
import org.meb.conquest.cache.CardCacheManager;
import org.meb.conquest.core.Cache;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.CardSet;
import org.meb.conquest.db.query.DeckQuery;
import org.meb.conquest.json.JsonUtils;
import org.meb.conquest.json.model.JsonDeck;
import org.meb.conquest.json.model.JsonDeckComment;
import org.meb.conquest.json.model.JsonDeckLink;
import org.meb.conquest.json.model.JsonDeckMember;
import org.meb.conquest.json.model.JsonDecks;
import org.meb.conquest.json.model.JsonError;
import org.meb.conquest.rest.MessageBundleResolver;
import org.meb.conquest.rest.controller.ExportedDeck.Type;
import org.meb.conquest.rest.exception.DeckException;
import org.meb.conquest.service.DeckService;
import org.meb.conquest.service.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/deck")
public class DeckController {

	private static final Logger log = LoggerFactory.getLogger(DeckController.class);

	@Inject
	private RequestContext queryContext;

	@Inject
	private DeckService deckService;

	@Inject
	private AuthToken authToken;

	@Inject
	private Cache cache;

	@Inject
	private MessageBundleResolver resolver;

	@Inject
	private EntityManager em;

	@Inject
	private CardCacheManager ccm;	

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response loadUserDecks(@Form DeckQueryParams params) {
		log.info("loadUserDecks(): auth token: {}", authToken);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(params.getLanguage());

		try {
			DeckQuery query = new DeckQuery().withMembers();
			query.setPageNumber(params.getPageNumber());
			query.setPageSize(params.getPageSize());
			query.setPrimaryFactions(Faction.convertToFactions(params.getPrimaryFaction()));
			query.setSecondaryFactions(Faction.convertToFactions(params.getSecondaryFaction()));
			query.setWarlordTechNames(new HashSet<>(params.getWarlordTechNames()));

			query.setCrstBitmap(computeCrstBitmap(params.getCrstTechNames()));
			query.setCrstMatchMode(params.getCrstMatchMode());
			query.setCrstSkipCoreSetOnly(params.getCrstSkipCoreSetOnly());

			query.setCreateDateMin(params.getCreateDateMin());
			query.setCreateDateMax(params.getCreateDateMax());
			query.expandCreateDateToFullDay();

			query.setModifyDateMin(params.getModifyDateMin());
			query.setModifyDateMax(params.getModifyDateMax());
			query.expandModifyDateToFullDay();

			Long snapshotBaseId = params.getSnapshotBaseId();
			if (snapshotBaseId == null) {
				query.getExample().setType(DeckType.BASE);
			} else {
				query.getExample().setType(DeckType.SNAPSHOT);
				query.getExample().setSnapshotPublic(Boolean.TRUE);
				query.getExample().setSnapshotBase(new Deck(snapshotBaseId));
			}

			query.correctPageNumberAndSize(20);
			query.setSorting(params.orderItemsAsSorting());
			if (query.getSorting().itemsCount() == 0) {
				query.getSorting().setSortingDesc("createDate");
			}

			Long total = deckService.countUserDecks(query);
			List<Deck> decks = deckService.findUserDecks(query);

			List<JsonDeck> tmps = JsonDeck.build(decks, true, false, false, false);
			for (JsonDeck tmp : tmps) {
				fillAllWarlordDeckCards(tmp);
			}

			JsonDecks jsonDecks = new JsonDecks();
			jsonDecks.setDecks(tmps);
			jsonDecks.setTotal(total);
			jsonDecks.setPageNumber(query.getPageNumber());
			jsonDecks.setPageSize(query.getPageSize());
			return Response.ok(JsonUtils.write(jsonDecks)).build();
		} catch (IOException e) {
			DeckException de = buildDeckException(e, "error.deck.oper.loadDecks");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/{deckId}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response loadUserDeck(@PathParam("deckId") Long deckId, @QueryParam("language") String language)
			throws DeckException {
		log.info("loadUserDeck(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			JsonDeck jsonDeck = null;
			Deck deck = deckService.findUserDeck(deckId, true);
			if (deck != null) {
				jsonDeck = new JsonDeck().withMembers().withLinks().withSnapshots().build(deck);
			}
			fillAllWarlordDeckCards(jsonDeck);
			return Response.ok(JsonUtils.write(jsonDeck)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.loadDeck");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response createUserDeck(@QueryParam("language") String language, String body) {
		log.info("createUserDeck(): auth token: {}", authToken);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			Deck deck = JsonUtils.readObject(body, JsonDeck.class).buildDeck();
			deck = deckService.saveUserDeck(null, deck);
			JsonDeck jsonDeck = new JsonDeck().withMembers().build(deck);
			fillAllWarlordDeckCards(jsonDeck);
			return Response.ok(JsonUtils.write(jsonDeck)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.save");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@PUT
	@Path("/{deckId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response updateUserDeck(@PathParam("deckId") Long deckId, @QueryParam("language") String language,
			String body) {
		log.info("updateUserDeck(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			Deck deck = JsonUtils.readObject(body, JsonDeck.class).buildDeck();
			deck = deckService.saveUserDeck(deckId, deck);
			JsonDeck jsonDeck = new JsonDeck().withMembers().withLinks().withSnapshots().build(deck);
			fillAllWarlordDeckCards(jsonDeck);
			return Response.ok(JsonUtils.write(jsonDeck)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.save");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@DELETE
	@Path("/{deckId}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response deleteUserDeck(@PathParam("deckId") Long deckId, @QueryParam("language") String language) {
		log.info("deleteUserDeck(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			deckService.deleteUserDeck(deckId);
			return Response.ok("{}").build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.delete");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/export/{deckId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	@RolesAllowed("user")
	public Response exportUserDeckToOctgn(@PathParam("deckId") Long deckId, @QueryParam("language") String language) {
		log.info("exportUserDeckToOctgn(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			ExportedDeck exported = deckService.exportUserDeck(deckId, Type.OCTGN);
			ResponseBuilder rs = Response.ok(exported.getCharacterData());
			rs.header("Content-Disposition", "attachment; filename=\"" + exported.getTechName() + ".o8d\"");
			return rs.build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.export");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/export")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	@RolesAllowed("user")
	public Response exportUserDecksToOctgn(@Form DeckQueryParams params, @QueryParam("language") String language) {
		log.info("exportUserDecksToOctgn(): auth token: {}", authToken);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			Deck deck = new Deck();
			deck.setType(DeckType.BASE);
			deck.setUser(new User(queryContext.getUserId()));

			DeckQuery query = new DeckQuery(deck).withMembers();
			query.setPrimaryFactions(Faction.convertToFactions(params.getPrimaryFaction()));
			query.setSecondaryFactions(Faction.convertToFactions(params.getSecondaryFaction()));
			query.setWarlordTechNames(new HashSet<>(params.getWarlordTechNames()));

			List<String> crstTechNames = params.getCrstTechNames();
			if (crstTechNames != null && crstTechNames.size() > 0) {

				List<CardSet> crstList = cache.loadCardSets();
				Collections.sort(new ArrayList<>(crstList), new Comparator<CardSet>() {

					@Override
					public int compare(CardSet o1, CardSet o2) {
						return o1.getSequence().compareTo(o2.getSequence());
					}

				});

				long bitmap = 0;
				for (int i = 0; i < crstList.size(); i++) {
					if (crstTechNames.contains(crstList.get(i).getTechName())) {
						bitmap |= 1 << i;
					}
				}

				query.setCrstBitmap(new Long(bitmap));
				query.setCrstMatchMode(params.getCrstMatchMode());
			}
			query.setCrstSkipCoreSetOnly(params.getCrstSkipCoreSetOnly());

			query.setCreateDateMin(params.getCreateDateMin());
			query.setCreateDateMax(params.getCreateDateMax());
			query.expandCreateDateToFullDay();
			query.setModifyDateMin(params.getModifyDateMin());
			query.setModifyDateMax(params.getModifyDateMax());
			query.expandModifyDateToFullDay();

			Long snapshotBaseId = params.getSnapshotBaseId();
			if (snapshotBaseId != null) {
				query.getExample().setSnapshotBase(new Deck(snapshotBaseId));
			}
			query.correctPageNumberAndSize(20);
			query.setSorting(params.orderItemsAsSorting());
			if (query.getSorting().itemsCount() == 0) {
				query.getSorting().setSortingDesc("createDate");
			}

			ExportedDeck exported = deckService.exportUserDecks(query, Type.OCTGN);
			ResponseBuilder rs = Response.ok(exported.getByteData());
			rs.header("Content-Disposition", "attachment; filename=\"" + "decks_o8d.zip\"");
			return rs.build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.export");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/{deckId}/link")
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadUserDeckLinks(@PathParam("deckId") Long deckId, @QueryParam("language") String language) {
		log.info("loadUserDeckLinks(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			List<DeckLink> deckLinks = deckService.findUserDeckLinks(deckId);
			String json = JsonUtils.write(JsonDeckLink.toJsonDeckLinks(deckLinks));
			return Response.ok(json).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.loadLinks");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@POST
	@Path("/{deckId}/link")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response createUserDeckLink(@PathParam("deckId") Long deckId, @QueryParam("language") String language,
			String body) {
		log.info("createUserDeckLink(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			DeckLink deckLink = JsonUtils.readObject(body, JsonDeckLink.class).toDeckLink();
			deckLink = deckService.saveUserDeckLink(deckId, deckLink.getName());
			JsonDeckLink jsonDeckLink = new JsonDeckLink(deckLink);
			return Response.ok(JsonUtils.write(jsonDeckLink)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.savePrivateLink");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@DELETE
	@Path("/{deckId}/link/{linkId}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response deleteUserDeckLink(@PathParam("deckId") Long deckId, @PathParam("linkId") Long linkId,
			@QueryParam("language") String language) {

		Object[] args = new Object[] { authToken, deckId, linkId };
		log.info("deleteUserDeckLink(): auth token: {}, deck id: {}, link id: {}", args);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			deckService.deleteUserDeckLink(deckId, linkId);
			return Response.ok("{}").build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.deletePrivateLink");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/public")
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadPublicDecks(@Form DeckQueryParams params) {
		log.info("loadPublicDecks(): auth token: {}", authToken);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(params.getLanguage());

		try {
			Deck example = new Deck();
			example.setType(DeckType.SNAPSHOT);
			example.setSnapshotPublic(Boolean.TRUE);
			example.setUser(new User(params.getUsername()));
			if (params.getSnapshotBaseId() != null) {
				example.setSnapshotBase(new Deck(params.getSnapshotBaseId()));
			}

			DeckQuery query = new DeckQuery(example).withMembers();
			query.setPageNumber(params.getPageNumber());
			query.setPageSize(params.getPageSize());
			query.setPrimaryFactions(Faction.convertToFactions(params.getPrimaryFaction()));
			query.setSecondaryFactions(Faction.convertToFactions(params.getSecondaryFaction()));
			query.setWarlordTechNames(new HashSet<>(params.getWarlordTechNames()));

			query.setCrstBitmap(computeCrstBitmap(params.getCrstTechNames()));
			query.setCrstMatchMode(params.getCrstMatchMode());
			query.setCrstSkipCoreSetOnly(params.getCrstSkipCoreSetOnly());

			query.setCreateDateMin(params.getPublishDateMin());
			query.setCreateDateMax(params.getPublishDateMax());
			query.expandCreateDateToFullDay();

			query.setModifyDateMin(params.getModifyDateMin());
			query.setModifyDateMax(params.getModifyDateMax());
			query.expandModifyDateToFullDay();

			query.correctPageNumberAndSize(20);
			query.setSorting(params.orderItemsAsSorting());
			if (query.getSorting().itemsCount() == 0) {
				query.getSorting().setSortingDesc("createDate");
			}

			Long total = deckService.countPublicDecks(query);
			List<Deck> decks = deckService.findPublicDecks(query);

			JsonDecks jsonDecks = new JsonDecks();
			jsonDecks.setDecks(JsonDeck.build(decks, true, false, false, false));
			jsonDecks.setTotal(total);
			jsonDecks.setPageNumber(query.getPageNumber());
			jsonDecks.setPageSize(query.getPageSize());
			String json = JsonUtils.write(jsonDecks);
			return Response.ok(json).build();
		} catch (IOException e) {
			DeckException de = buildDeckException(e, "error.deck.oper.loadDecks");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/public/{deckId}")
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadPublicDeck(@PathParam("deckId") String deckId, @QueryParam("language") String language) {
		log.info("loadPublicDeck(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		Response response = null;

		try {
			Deck deck;
			Deck snapshotBase;

			if (Pattern.matches("-?\\d+", deckId)) {
				deck = deckService.findPublicDeck(Long.valueOf(deckId), true);
				deck.getDeckMembers().size();
				deck.getDeckComments().size();
				deck.getDeckLinks().clear();
				snapshotBase = new Deck(deck.getSnapshotBase().getId());
			} else {
				deck = deckService.findUserDeckViaPrivateLink(deckId, true);
				deck.getDeckMembers().size();
				deck.getDeckComments().clear();
				deck.getDeckLinks().clear();
				snapshotBase = new Deck(deck.getId());
			}

			em.detach(deck);

			Deck example = new Deck();
			example.setType(DeckType.SNAPSHOT);
			example.setSnapshotPublic(Boolean.TRUE);
			example.setSnapshotBase(snapshotBase);
			List<Deck> decks = deckService.findPublicDecks(new DeckQuery(example).withMembers());
			deck.setSnapshots(new HashSet<>(decks));

			JsonDeck jsonDeck = new JsonDeck().withMembers().withComments().withSnapshots().build(deck);
			response = Response.ok(JsonUtils.write(jsonDeck)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.loadDeck");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}

		return response;
	}

	@GET
	@Path("/public/export/{deckId}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	@PermitAll
	public Response exportPublicDeckToOctgn(@PathParam("deckId") Long deckId, @QueryParam("language") String language) {
		log.info("exportPublicDeckToOctgn(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			ExportedDeck exported = deckService.exportPublicDeck(deckId, Type.OCTGN);
			ResponseBuilder rs = Response.ok(exported.getCharacterData());
			rs.header("Content-Disposition", "attachment; filename=\"" + exported.getTechName() + ".o8d\"");
			return rs.build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.export");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@GET
	@Path("/public/{deckId}/comment")
	@Produces(MediaType.APPLICATION_JSON)
	@PermitAll
	public Response loadPublicDeckComments(@PathParam("deckId") Long deckId, @QueryParam("language") String language) {
		log.info("loadPublicDeckComments(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			List<DeckComment> deckComments = deckService.findPublicDeckComments(deckId);
			String json = JsonUtils.write(JsonDeckComment.toJsonDeckComments(deckComments));
			return Response.ok(json).build();
		} catch (IOException e) {
			DeckException de = buildDeckException(e, "error.deck.oper.loadComments");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@POST
	@Path("/public/{deckId}/comment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response createPublicDeckComment(@PathParam("deckId") Long deckId, @QueryParam("language") String language,
			String body) {

		log.info("createPublicDeckComment(): auth token: {}, deck id: {}", authToken, deckId);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			DeckComment deckComment = JsonUtils.readObject(body, JsonDeckComment.class).toDeckComment();
			deckComment = deckService.savePublicDeckComment(deckId, null, deckComment);
			JsonDeckComment jsonDeckComment = new JsonDeckComment(deckComment);
			return Response.ok(JsonUtils.write(jsonDeckComment)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.saveComment");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@PUT
	@Path("/public/{deckId}/comment/{commentId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response updatePublicDeckComment(@PathParam("deckId") Long deckId, @PathParam("commentId") Long commentId,
			@QueryParam("language") String language, String body) {

		Object[] args = new Object[] { authToken, deckId, commentId };
		log.info("updatePublicDeckComment(): auth token: {}, deck id: {}, comment id: {}", args);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			DeckComment deckComment = JsonUtils.readObject(body, JsonDeckComment.class).toDeckComment();
			deckComment = deckService.savePublicDeckComment(deckId, commentId, deckComment);
			JsonDeckComment jsonDeckComment = new JsonDeckComment(deckComment);
			return Response.ok(JsonUtils.write(jsonDeckComment)).build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.saveComment");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	@DELETE
	@Path("/public/{deckId}/comment/{commentId}")
	@Produces(MediaType.APPLICATION_JSON)
	@RolesAllowed("user")
	public Response deletePublicDeckComemnt(@PathParam("deckId") Long deckId, @PathParam("commentId") Long commentId,
			@QueryParam("language") String language) {

		Object[] args = new Object[] { authToken, deckId, commentId };
		log.info("deletePublicDeckComment(): auth token: {}, deck id: {}, comment id: {}", args);

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(language);

		try {
			deckService.deletePublicDeckComment(deckId, commentId);
			return Response.ok("{}").build();
		} catch (Exception e) {
			DeckException de = buildDeckException(e, "error.deck.oper.deleteComment");
			log.error(de.toString(), de);
			return Response.serverError().entity(buildJsonError(de)).build();
		}
	}

	private void fillAllWarlordDeckCards(JsonDeck jsonDeck) {
		List<JsonDeckMember> members = jsonDeck.getMembers();
		HashMap<Long, JsonDeckMember> membersMap = new HashMap<Long, JsonDeckMember>();
		MapUtils.populateMap(membersMap, members, new Transformer<JsonDeckMember, Long>() {

			@Override
			public Long transform(JsonDeckMember member) {
				return member.getCardId();
			}

		});

		List<Card> warlordDeckCards = ccm.getWarlordCards(jsonDeck.getWarlordId());
		for (Card card : warlordDeckCards) {
			JsonDeckMember member = membersMap.get(card.getId());
			if (member == null) {
				member = new JsonDeckMember();
				member.setCardId(card.getId());
				member.setQuantity(0);
				members.add(member);
			}
		}
	}

	private Long computeCrstBitmap(Collection<String> crstTechNames) {
		Long crstBitmap = null;

		if (crstTechNames != null && crstTechNames.size() > 0) {

			List<CardSet> crstList = cache.loadCardSets();
			Collections.sort(new ArrayList<>(crstList), new Comparator<CardSet>() {

				@Override
				public int compare(CardSet o1, CardSet o2) {
					return o1.getSequence().compareTo(o2.getSequence());
				}

			});

			long bitmap = 0;
			for (int i = 0; i < crstList.size(); i++) {
				if (crstTechNames.contains(crstList.get(i).getTechName())) {
					bitmap |= 1 << i;
				}
			}
			crstBitmap = new Long(bitmap);
		}

		return crstBitmap;
	}

	private DeckException buildDeckException(Exception e, String error) {
		DeckException de;
		if (e instanceof DeckException) {
			de = (DeckException) e;
			de.bindErrorContext(error);
		} else {
			de = new DeckException(e);
			de.setErrorCore(error);
			de.setRequestContext(queryContext);
		}
		return de;
	}

	private JsonError buildJsonError(DeckException de) {
		PropertyResourceBundle bundle = resolver.getClientBundle(queryContext.getUserLanguage());
		return new JsonError(de.getTimestamp(), de.toUserMessage(bundle));
	}
}