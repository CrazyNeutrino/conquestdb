package org.meb.conquest.web.rest.controller;

import javax.ws.rs.Path;

//@Path("/public/deck")
public class PublicDeckController {

	// private static final Logger log =
	// LoggerFactory.getLogger(PublicDeckController.class);
	//
	// @Inject
	// private QueryContext queryContext;
	//
	// @Inject
	// private DeckService deckService;
	//
	// @Inject
	// private AuthToken authUser;
	//
	// @Inject
	// private Cache cache;
	//
	// @Inject
	// private MessageBundleResolver resolver;
	//
	// @GET
	// @Produces(MediaType.APPLICATION_JSON)
	// public Response loadDecks(@Form DeckQueryParams params) {
	// log.info("loadDecks(): auth user: {}", authUser);
	//
	// queryContext.setUserId(authUser.getUserId());
	// queryContext.setUserLanguage(params.getLanguage());
	//
	// try {
	// Deck example = new Deck();
	// example.setType(DeckType.SNAPSHOT);
	// example.setSnapshotPublic(Boolean.TRUE);
	// // example.setSnapshotLatest(params.getSnapshotLatest());
	// example.setUser(new User(params.getUsername()));
	//
	// DeckQuery query = new DeckQuery(example);
	// query.setPageNumber(params.getPageNumber());
	// query.setPageSize(params.getPageSize());
	// query.setPrimaryFactions(Faction.convertToFactions(params.getPrimaryFaction()));
	// query.setSecondaryFactions(Faction.convertToFactions(params.getSecondaryFaction()));
	// query.setWarlordTechNames(new HashSet<>(params.getWarlordTechNames()));
	//
	// List<String> crstTechNames = params.getCrstTechNames();
	// if (crstTechNames != null && crstTechNames.size() > 0) {
	//
	// List<CardSet> crstList = cache.loadCardSets();
	// Collections.sort(new ArrayList<>(crstList), new Comparator<CardSet>() {
	//
	// @Override
	// public int compare(CardSet o1, CardSet o2) {
	// return o1.getSequence().compareTo(o2.getSequence());
	// }
	//
	// });
	//
	// long bitmap = 0;
	// for (int i = 0; i < crstList.size(); i++) {
	// if (crstTechNames.contains(crstList.get(i).getTechName())) {
	// bitmap |= 1 << i;
	// }
	// }
	//
	// query.setCrstBitmap(new Long(bitmap));
	// }
	//
	// Date publishDateMin = params.getPublishDateMin();
	// if (publishDateMin != null) {
	// query.setCreateDateMin(DateUtils.truncate(publishDateMin,
	// Calendar.DAY_OF_MONTH));
	// }
	// Date publishDateMax = params.getPublishDateMax();
	// if (publishDateMax != null) {
	// query.setCreateDateMax(DateUtils.ceiling(publishDateMax,
	// Calendar.DAY_OF_MONTH));
	// }
	// Long snapshotBaseId = params.getSnapshotBaseId();
	// if (snapshotBaseId != null) {
	// query.getExample().setSnapshotBase(new Deck(snapshotBaseId));
	// }
	// query.correctPageNumberAndSize(20);
	// query.setSorting(params.orderItemsAsSorting());
	// if (query.getSorting().itemsCount() == 0) {
	// query.getSorting().setSortingDesc("createDate");
	// }
	//
	// Long total = deckService.countDecks(query);
	// List<Deck> decks = deckService.findDecks(query);
	//
	// JsonDecks jsonDecks = new JsonDecks();
	// jsonDecks.setDecks(JsonDeck.toJsonDecks(decks, true, false, true));
	// jsonDecks.setTotal(total);
	// jsonDecks.setPageNumber(query.getPageNumber());
	// jsonDecks.setPageSize(query.getPageSize());
	// String json = JsonUtils.write(jsonDecks);
	// return Response.ok(json).build();
	// } catch (IOException e) {
	// log.error("Unable to load published decks", e);
	// return Response.serverError().build();
	// }
	// }
	//
	// @GET
	// @Path("/{id}")
	// @Produces(MediaType.APPLICATION_JSON)
	// public Response loadDeck(@PathParam("id") String id,
	// @QueryParam("language") String language) {
	// log.info("loadDeck(): auth user: {}, id: ", authUser, id);
	//
	// queryContext.setUserId(authUser.getUserId());
	// queryContext.setUserLanguage(language);
	//
	// Response response = null;
	//
	// try {
	// Deck deck;
	// if (Pattern.matches("-?\\d+", id)) {
	// deck = deckService.findPublicSnapshot(Long.valueOf(id));
	// Deck example = new Deck();
	// example.setType(DeckType.SNAPSHOT);
	// example.setSnapshotBase(new Deck(deck.getSnapshotBase().getId()));
	// List<Deck> decks = deckService.findDecks(new DeckQuery(example));
	// deck.setRelatedSnapshots(new HashSet<>(decks));
	// } else {
	// deck = deckService.findDeckViaPrivateLink(id);
	// }
	//
	// JsonDeck jsonDeck = new JsonDeck();
	// if (deck == null) {
	// long timestamp = System.currentTimeMillis();
	// String message =
	// "Unable to load public deck [user id: {}, link value: {}, timestamp: {}]";
	// logError(message, new Object[] { authUser.getUserId(), id, timestamp },
	// null);
	// return Response.serverError().entity(new JsonError(timestamp,
	// "core.deck.public.notFound")).build();
	// } else {
	// jsonDeck = new JsonDeck(deck, true, false, true);
	// response = Response.ok(JsonUtils.write(jsonDeck)).build();
	// }
	// } catch (IOException e) {
	// long timestamp = System.currentTimeMillis();
	// String message =
	// "Unable to load public deck [user id: {}, link value: {}, timestamp: {}]";
	// logError(message, new Object[] { authUser.getUserId(), id, timestamp },
	// null);
	// return Response.serverError().entity(new JsonError(timestamp,
	// "core.deck.public.notFound")).build();
	// }
	//
	// return response;
	// }
	//
	// @GET
	// @Path("/export/octgn/{deckId}")
	// @Produces(MediaType.TEXT_PLAIN)
	// public Response exportDeckToOctgn(@PathParam("deckId") Long deckId,
	// @QueryParam("language") String language) {
	// queryContext.setUserId(authUser.getUserId());
	// queryContext.setUserLanguage(language);
	//
	// try {
	// ExportedDeck exported = deckService.exportDeck(deckId, Type.OCTGN);
	// ResponseBuilder rs = Response.ok(exported.getData());
	// rs.header("Content-Disposition", "attachment; filename=\"" +
	// exported.getTechName() + ".o8d\"");
	// return rs.build();
	// } catch (Exception e) {
	// DeckException de = processException(e, "error.deck.oper.export");
	// log.error(de.toString(), de);
	// PropertyResourceBundle bundle =
	// resolver.getBundle(queryContext.getUserLanguage());
	// JsonError jsonError = new JsonError(de.getTimestamp().getTime(),
	// de.toUserMessage(bundle));
	// return Response.serverError().entity(jsonError).build();
	// }
	// }
	//
	// @GET
	// @Path("/comment")
	// @Produces(MediaType.APPLICATION_JSON)
	// public Response loadDeckComemnts(@Form DeckCommentQueryParams params) {
	// log.info("loadDeckComments(): auth user: {}", authUser);
	//
	// queryContext.setUserId(authUser.getUserId());
	// queryContext.setUserLanguage(params.getLanguage());
	//
	// try {
	// List<DeckComment> deckComments =
	// deckService.findPublicSnapshotComments(params.getSnapshotIds());
	// String json =
	// JsonUtils.write(JsonDeckComment.toJsonDeckComments(deckComments));
	// return Response.ok(json).build();
	// } catch (IOException e) {
	// log.error("Unable to load deck comments decks", e);
	// return Response.serverError().build();
	// }
	// }
	//
	// private DeckException processException(Exception e, String message) {
	// DeckException de;
	// if (e instanceof DeckException) {
	// de = (DeckException) e;
	// } else {
	// de = new DeckException(e);
	// de.setPrimaryMessage(message);
	// de.withQueryContext(queryContext);
	// }
	// return de;
	// }
	//
	// private void logError(String message, Object[] params, Exception e) {
	// message = MessageFormatter.arrayFormat(message, params).getMessage();
	// log.error(message, e);
	// }
	//
	// @SuppressWarnings("unused")
	// private void logError(String message, Object param0, Object param1,
	// Exception e) {
	// message = MessageFormatter.format(message, param0, param1).getMessage();
	// log.error(message, e);
	// }
}