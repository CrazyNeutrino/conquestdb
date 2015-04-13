package org.meb.conquest.service;

import java.io.IOException;
import java.io.Serializable;
import java.io.StringWriter;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.collections4.map.MultiValueMap;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.commons.lang3.StringUtils;
import org.apache.deltaspike.jpa.api.transaction.Transactional;
import org.jboss.resteasy.util.Hex;
import org.meb.conquest.cache.CardCacheManager;
import org.meb.conquest.cache.UserCacheManager;
import org.meb.conquest.core.Cache;
import org.meb.conquest.core.Constant;
import org.meb.conquest.db.dao.CardDao;
import org.meb.conquest.db.dao.DeckCommentDao;
import org.meb.conquest.db.dao.DeckDao;
import org.meb.conquest.db.dao.DeckLinkDao;
import org.meb.conquest.db.dao.DeckMemberDao;
import org.meb.conquest.db.dao.JpaDao;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckLinkType;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.CardSet;
import org.meb.conquest.db.query.DeckCommentQuery;
import org.meb.conquest.db.query.DeckLinkQuery;
import org.meb.conquest.db.query.DeckMemberQuery;
import org.meb.conquest.db.query.DeckQuery;
import org.meb.conquest.db.query.Query;
import org.meb.conquest.db.util.DatabaseUtils;
import org.meb.conquest.db.util.Transformers;
import org.meb.conquest.db.util.Utils;
import org.meb.conquest.rest.controller.ExportedDeck;
import org.meb.conquest.rest.controller.ExportedDeck.Type;
import org.meb.conquest.rest.exception.DeckException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.bootstrap.DOMImplementationRegistry;
import org.w3c.dom.ls.DOMImplementationLS;
import org.w3c.dom.ls.LSOutput;
import org.w3c.dom.ls.LSSerializer;

public class DeckServiceImpl extends SearchServiceImpl implements DeckService, Serializable {

	private static final Logger log = LoggerFactory.getLogger(DeckServiceImpl.class);
	private static final long serialVersionUID = -3917684297662777248L;

	@Inject
	private EntityManager em;

	@Inject
	private RequestContext requestContext;

	@Inject
	private Cache cache;

	@Inject
	private CardCacheManager ccm;

	@Inject
	private UserCacheManager ucm;

	private DeckDao deckDao;
	private DeckMemberDao deckMemberDao;
	private DeckLinkDao deckLinkDao;
	private DeckCommentDao deckCommentDao;
	private JpaDao<User, Query<User>> userDao;

	@PostConstruct
	private void initalize() {
		deckDao = new DeckDao(em);
		deckLinkDao = new DeckLinkDao(em);
		deckCommentDao = new DeckCommentDao(em);
		deckMemberDao = new DeckMemberDao(em);
		userDao = new JpaDao<>(em);
	}

	private List<Deck> findDecks(DeckQuery query) {
		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());

		long[] t = new long[11];

		t[0] = System.currentTimeMillis();
		List<Deck> decks = deckDao.find(query);
		for (Deck deck : decks) {
			deck.setUser(ucm.getUser(deck.getUser().getId()));
			deck.setWarlord(ccm.getCard(deck.getWarlord().getId()));
			Deck snapshotBase = deck.getSnapshotBase();
			if (snapshotBase != null) {
				snapshotBase.setUser(ucm.getUser(snapshotBase.getUser().getId()));
				snapshotBase.setWarlord(ccm.getCard(snapshotBase.getWarlord().getId()));
			}
		}
		t[1] = System.currentTimeMillis();

		if (decks != null && !decks.isEmpty()) {
			Collection<Long> deckIds = CollectionUtils.collect(decks, Transformers.DECK_ID);

			log.info("deck ids: {}", deckIds);

			List<DeckMember> deckMembers = new ArrayList<>();
			if (query.isLoadMembers()) {
				DeckMemberQuery deckMemberQuery = new DeckMemberQuery();
				deckMemberQuery.setDeckIds(deckIds);
				t[2] = System.currentTimeMillis();
				deckMembers = deckMemberDao.find(deckMemberQuery);
				for (DeckMember deckMember : deckMembers) {
					deckMember.setCard(ccm.getCard(deckMember.getCard().getId()));
				}
				t[3] = System.currentTimeMillis();
				log.info("deck members found: {}", deckMembers.size());
			}

			List<DeckLink> deckLinks = new ArrayList<>();
			if (query.isLoadLinks()) {
				DeckLinkQuery deckLinkQuery = new DeckLinkQuery();
				deckLinkQuery.setDeckIds(deckIds);
				t[4] = System.currentTimeMillis();
				deckLinks = deckLinkDao.find(deckLinkQuery);
				t[5] = System.currentTimeMillis();
				log.info("deck links found: {}", deckLinks.size());
			}

			List<DeckComment> deckComments = new ArrayList<>();
			if (query.isLoadComments()) {
				DeckCommentQuery deckCommentQuery = new DeckCommentQuery();
				deckCommentQuery.setDeckIds(deckIds);
				t[6] = System.currentTimeMillis();
				deckComments = deckCommentDao.find(deckCommentQuery);
				t[7] = System.currentTimeMillis();
				log.info("deck comments found: {}", deckComments.size());
			}

			List<Deck> snapshots = new ArrayList<>();
			if (query.isLoadSnapshots()) {
				TypedQuery<Deck> snapshotQuery = em.createQuery("from Deck where snapshotBase in :decks", Deck.class);
				snapshotQuery.setParameter("decks", decks);
				t[8] = System.currentTimeMillis();
				snapshots = snapshotQuery.getResultList();
				t[9] = System.currentTimeMillis();
				log.info("deck snapshots found: {}", snapshots.size());
			}

			MultiValueMap<Long, DeckMember> demeMap = new MultiValueMap<>();
			MapUtils.populateMap(demeMap, deckMembers, Transformers.DEME_DECK_ID);
			MultiValueMap<Long, DeckLink> deliMap = new MultiValueMap<>();
			MapUtils.populateMap(deliMap, deckLinks, Transformers.DELI_DECK_ID);
			MultiValueMap<Long, DeckComment> decoMap = new MultiValueMap<>();
			MapUtils.populateMap(decoMap, deckComments, Transformers.DECO_DECK_ID);
			MultiValueMap<Long, Deck> snapshotsMap = new MultiValueMap<>();
			MapUtils.populateMap(snapshotsMap, snapshots, Transformers.DECK_SNBA_ID);
			for (Deck deck : decks) {
				Long deckId = deck.getId();

				deck.setDeckMembers(new HashSet<DeckMember>());
				if (demeMap.containsKey(deckId)) {
					deck.getDeckMembers().addAll(demeMap.getCollection(deckId));
				}

				deck.setDeckLinks(new HashSet<DeckLink>());
				if (deliMap.containsKey(deckId)) {
					deck.getDeckLinks().addAll(deliMap.getCollection(deckId));
				}

				deck.setDeckComments(new HashSet<DeckComment>());
				if (deliMap.containsKey(deckId)) {
					deck.getDeckComments().addAll(decoMap.getCollection(deckId));
				}

				deck.setSnapshots(new HashSet<Deck>());
				if (snapshotsMap.containsKey(deckId)) {
					deck.getSnapshots().addAll(snapshotsMap.getCollection(deckId));
				}
			}

			log.info("deck ids (members multimap): {}", demeMap.keySet());
			log.info("deck ids (links multimap): {}", deliMap.keySet());
			log.info("deck ids (comments multimap): {}", deliMap.keySet());
			log.info("deck ids (snapshots multimap): {}", snapshotsMap.keySet());
		}
		t[10] = System.currentTimeMillis();

		Object[] times = new Object[] { t[10] - t[0], t[1] - t[0], t[3] - t[2], t[5] - t[4], t[7] - t[6], t[9] - t[8] };
		log.info("find times: total: {}, decks: {}, members: {}, links: {}, comments: {}, snapshots: {}", times);

		return decks;
	}

	private Long countDecks(DeckQuery query) {
		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());
		return deckDao.count(query);
	}

	@Override
	public Deck findUserDeck(Long deckId, boolean throwWhenNotFound) throws DeckException {
		checkUserIdSet();

		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());
		Deck deck = new Deck(deckId);
		deck.setUser(new User(requestContext.getUserId()));
		deck = deckDao.findUnique(deck);
		if (deck == null && throwWhenNotFound) {
			DeckException de = new DeckException("error.deck.deck.notFound");
			de.setDeckId(deckId);
			de.setRequestContext(requestContext);
			throw de;
		}

		return deck;
	}

	@Override
	@Transactional
	public Deck findUserDeckViaPrivateLink(String value, boolean throwWhenNotFound) throws DeckException {
		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());
		DeckLink deckLink = new DeckLink();
		deckLink.setValue(value);
		deckLink = deckLinkDao.findUnique(deckLink);
		if (deckLink == null && throwWhenNotFound) {
			DeckException de = new DeckException("error.deck.deck.notFound");
			de.setDeckLink(value);
			de.setRequestContext(requestContext);
			throw de;
		} else {
			return deckLink.getDeck();
		}
	}

	@Override
	public List<Deck> findUserDecks() {
		return findUserDecks(new DeckQuery().withMembers());
	}

	@Override
	public List<Deck> findUserDecks(DeckQuery query) {
		checkUserIdSet();

		query.getExample().setUser(new User(requestContext.getUserId()));
		return findDecks(query);
	}

	@Override
	public Long countUserDecks(DeckQuery query) {
		checkUserIdSet();

		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());

		User oldUser = query.getExample().getUser();
		try {
			query.getExample().setUser(new User(requestContext.getUserId()));
			return countDecks(query);
		} finally {
			query.getExample().setUser(oldUser);
		}
	}

	@Override
	@Transactional
	public Deck saveUserDeck(Long deckId, Deck deck) throws DeckException {
		checkUserIdSet();

		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());
		try {
			if (deck.getId() == null) {
				Long count = countUserDecks(new DeckQuery());
				if (count >= Constant.Deck.MAX_QUANTITY) {
					DeckException de = buildDeckException(deck, "error.deck.decksQuantity.exceeded");
					de.setErrorCoreParameter(0, String.valueOf(Constant.Deck.MAX_QUANTITY));
					throw de;
				}
			}

			DeckValidator validator = new DeckValidator(new CardDao(em), ucm);
			validator.setRequestContext(requestContext);
			validator.validate(deck);

			deck.setId(deckId);

			if (deckId == null) {
				for (DeckMember member : deck.getDeckMembers()) {
					member.setDeck(deck);
				}

				if (deck.getType() == DeckType.SNAPSHOT) {
					Deck snapshotBase = deck.getSnapshotBase();
					if (snapshotBase == null || snapshotBase.getId() == null) {
						DeckException de = new DeckException("error.deck.snapshotBase.notSet",
								"error.deck.oper.publish");
						de.setDeck(deck);
						de.setRequestContext(requestContext);
						throw de;
					} else {
						snapshotBase = findUserDeck(snapshotBase.getId(), false);
					}
					if (snapshotBase == null) {
						DeckException de = new DeckException("error.deck.snapshotBase.notFound",
								"error.deck.oper.publish");
						de.setDeck(deck);
						de.setRequestContext(requestContext);
						throw de;
					}
					deck.setSnapshotBase(snapshotBase);

					// Integer maxSnapshotVersion = 0;
					// Set<Deck> pds = publishBase.getSnapshots();
					// for (Deck pd : pds) {
					// maxSnapshotVersion = Math.max(maxSnapshotVersion,
					// pd.getSnapshotVersion());
					// if (Boolean.TRUE.equals(pd.getSnapshotLatest())) {
					// pd.setSnapshotLatest(Boolean.FALSE);
					// em.flush();
					// }
					// }
					// deck.setSnapshotVersion(maxSnapshotVersion + 1);
					// deck.setSnapshotLatest(Boolean.TRUE);
				}
			} else {
				Deck persistent = findUserDeck(deckId, false);

				if (deck.getType() != persistent.getType()) {
					DeckException de = new DeckException("error.deck.deck.invalidType", "error.deck.oper.modify");
					de.setDeck(deck);
					de.setRequestContext(requestContext);
					throw de;
				}

				persistent.setName(deck.getName());
				persistent.setDescription(deck.getDescription());

				if (deck.getType() != DeckType.SNAPSHOT) {
					persistent.setConfigCsQuantity(deck.getConfigCsQuantity());

					// check warlord ids match
					if (!persistent.getWarlord().getId().equals(deck.getWarlord().getId())) {
						DeckException de = new DeckException("error.deck.warlord.invalidId", "error.deck.oper.modify");
						de.setDeck(deck);
						de.setRequestContext(requestContext);
						throw de;
					}

					HashMap<Long, DeckMember> membersMap = new HashMap<>();
					MapUtils.populateMap(membersMap, deck.getDeckMembers(), Transformers.DEME_CARD_ID);
					HashMap<Long, DeckMember> persistentMembersMap = new HashMap<>();
					MapUtils.populateMap(persistentMembersMap, persistent.getDeckMembers(), Transformers.DEME_CARD_ID);

					// merge
					Iterator<DeckMember> iter = persistent.getDeckMembers().iterator();
					while (iter.hasNext()) {
						DeckMember persistentMember = iter.next();
						Long cardId = persistentMember.getCard().getId();
						if (!membersMap.containsKey(cardId)) {
							persistentMember.setDeck(null);
							iter.remove();
						}
					}

					for (DeckMember member : deck.getDeckMembers()) {
						Long cardId = member.getCard().getId();
						if (persistentMembersMap.containsKey(cardId)) {
							DeckMember persistentMember = persistentMembersMap.get(cardId);
							Integer quantity = member.getQuantity();
							if (quantity == null || quantity.equals(0)) {
								persistent.getDeckMembers().remove(persistentMember);
							} else {
								persistentMember.setQuantity(quantity);
							}
						} else {
							member.setDeck(persistent);
							persistent.getDeckMembers().add(member);
						}
					}
				}

				deck = persistent;
			}

			computeDeckInfo(deck);

			Date date = new Date();
			deck.setUser(userDao.findUnique(new User(requestContext.getUserId())));
			deck.setModifyDate(date);
			if (deck.getId() == null) {
				deck.setCreateDate(date);
				em.persist(deck);
			} else {
				deck = em.merge(deck);
			}

			em.flush();
		} catch (DeckException | RuntimeException e) {
			DeckException de = null;

			if (e instanceof DeckException) {
				de = (DeckException) e;
			} else {
				ExceptionFilter filter = new ExceptionFilter(e);
				if (filter.findViolatedConstraint()) {
					String violatedConstraint = filter.getViolatedConstraint();
					if (Constant.Constraint.UK_DECK_NAME.equals(violatedConstraint)) {
						de = new DeckException(e);
						de.setErrorCore("error.deck.name.exists");
						de.setErrorContext("error.deck.oper.save");
						de.setDeck(deck);
						de.setRequestContext(requestContext);
					}
				}
				if (de == null) {
					de = new DeckException(e);
					de.setErrorCore("error.deck.oper.save");
				}
			}

			throw de;
		}
		return deck;
	}

	@Override
	@Transactional
	public void deleteUserDeck(Long deckId) throws DeckException {
		checkUserIdSet();

		try {
			em.remove(findUserDeck(deckId, true));
			em.flush();
		} catch (Exception e) {
			DeckException de = null;
			if (e instanceof DeckException) {
				de = (DeckException) e;
				de.bindErrorContext("error.deck.oper.delete");
			} else {
				ExceptionFilter filter = new ExceptionFilter(e);
				if (filter.findViolatedConstraint()) {
					String violatedConstraint = filter.getViolatedConstraint();
					if (Constant.Constraint.FK_DECK_SNAPSHOT_BASE.equals(violatedConstraint)) {
						de = new DeckException("error.deck.publishedDeck.exists", "error.deck.oper.delete");
					}
				}
				if (de == null) {
					de = new DeckException("error.deck.oper.delete");
				}
			}

			throw de;
		}
	}

	@Override
	public ExportedDeck exportUserDeck(Long deckId, Type type) throws DeckException {
		try {
			return exportDeck(findUserDeck(deckId, true), type);
		} catch (DeckException de) {
			throw de.bindErrorContext("error.deck.oper.export");
		}
	}

	@Override
	public ExportedDeck exportUserDecks(DeckQuery query, Type type) throws DeckException {
		List<Deck> decks = findUserDecks(query);
		return exportDecks(decks, type);
	}

	@Override
	@Transactional
	public DeckLink findUserDeckLink(Long deckId, Long linkId) throws DeckException {
		checkUserIdSet();

		DatabaseUtils.executeSetUserLang(em, requestContext.getUserLanguage());
		Deck deck = new Deck(deckId);
		deck.setUser(new User(requestContext.getUserId()));
		DeckLink deckLink = new DeckLink(linkId);
		deckLink.setDeck(deck);
		return deckLinkDao.findUnique(deckLink);
	}

	@Override
	@Transactional
	public List<DeckLink> findUserDeckLinks(Long deckId) throws DeckException {
		return new ArrayList<>(findUserDeck(deckId, true).getDeckLinks());
	}

	@Override
	@Transactional
	public DeckLink saveUserDeckLink(Long deckId, String linkName) throws DeckException {
		checkUserIdSet();

		Deck deck = findUserDeck(deckId, false);

		SecureRandom random = new SecureRandom();
		String value;
		do {
			byte[] data = new byte[8];
			random.nextBytes(data);
			value = Hex.encodeHex(data);
		} while (Pattern.matches("\\d+", value));

		Date date = new Date();

		DeckLink link = new DeckLink();
		link.setDeck(deck);
		link.setValue(value);
		link.setType(DeckLinkType.PUBLIC);
		link.setCreateDate(date);
		link.setName(linkName);

		em.persist(link);
		em.flush();

		return link;
	}

	@Override
	@Transactional
	public void deleteUserDeckLink(Long deckId, Long linkId) throws DeckException {
		checkUserIdSet();

		DeckLink deckLink = findUserDeckLink(deckId, linkId);
		em.remove(deckLink);
		em.flush();
	}

	@Override
	public Deck findPublicDeck(Long deckId, boolean throwWhenNotFound) throws DeckException {
		Deck deck = new Deck(deckId);
		deck.setType(DeckType.SNAPSHOT);
		deck.setSnapshotPublic(Boolean.TRUE);
		deck = deckDao.findUnique(deck);
		if (deck == null && throwWhenNotFound) {
			DeckException de = new DeckException("error.deck.deck.notFound");
			de.setDeckId(deckId);
			de.setRequestContext(requestContext);
			throw de;
		}
		return deck;
	}

	@Override
	public List<Deck> findPublicDecks(DeckQuery query) {
		return findDecks(query);
	}

	@Override
	public Long countPublicDecks(DeckQuery query) {
		return countDecks(query);
	}

	@Override
	public ExportedDeck exportPublicDeck(Long deckId, Type type) throws DeckException {
		try {
			return exportDeck(findPublicDeck(deckId, true), type);
		} catch (DeckException de) {
			throw de.bindErrorContext("error.deck.oper.export");
		}
	}

	@Override
	public DeckComment findPublicDeckComment(Long deckId, Long commentId) {
		throw new IllegalStateException("Not implemented");
	}

	@Override
	public List<DeckComment> findPublicDeckComments(Long deckId) {
		Deck deck = new Deck(deckId);
		deck.setType(DeckType.SNAPSHOT);
		deck.setSnapshotPublic(Boolean.TRUE);
		DeckComment deckComment = new DeckComment();
		deckComment.setDeck(deck);
		DeckCommentQuery query = new DeckCommentQuery(deckComment);
		query.getSorting().setSortingAsc("createDate");
		return deckCommentDao.find(query);
	}

	@Override
	@Transactional
	public DeckComment savePublicDeckComment(Long deckId, Long commentId, DeckComment deckComment) throws DeckException {
		checkUserIdSet();

		if (deckId == null) {
			DeckException de = new DeckException("error.deck.deck.invalidId", "error.deck.oper.saveComment");
			de.setDeckId(deckId);
			de.setRequestContext(requestContext);
			throw de;
		}

		if (commentId == null) {
			Deck deck = findPublicDeck(deckId, true);
			Date date = new Date();
			String value = deckComment.getValue();
			if (StringUtils.isBlank(value)) {
				throw new DeckException("error.deck.comment.empty", "error.deck.oper.saveComment");
			}

			if (value.trim().length() > Constant.Deck.MAX_COMMENT_LEN) {
				DeckException de = new DeckException("error.deck.comment.tooLong", "error.deck.oper.saveComment");
				de.setErrorCoreParameter(0, String.valueOf(Constant.Deck.MAX_COMMENT_LEN));
				throw de;
			}

			deckComment = new DeckComment();
			deckComment.setDeck(deck);
			deckComment.setUser(userDao.findUnique(new User(requestContext.getUserId())));
			deckComment.setCreateDate(date);
			deckComment.setModifyDate(date);
			deckComment.setValue(value);
			em.persist(deckComment);
			em.flush();
		}

		return deckComment;
	}

	@Override
	@Transactional
	public void deletePublicDeckComment(Long deckId, Long commentId) {

	}

	private void checkUserIdSet() {
		requestContext.checkUserIdSet();
	}

	private ExportedDeck exportDeck(Deck deck, Type type) throws DeckException {
		ExportedDeck exported;
		switch (type) {
			case OCTGN:
				exported = exportOctgn(deck);
				break;
			default:
				throw new IllegalArgumentException("Unsupported export type");
		}
		return exported;
	}

	private ExportedDeck exportDecks(List<Deck> decks, Type type) throws DeckException {

		if (decks == null || decks.isEmpty()) {
			return null;
		}

		MultiValueMap<Faction, Deck> deckMap = new MultiValueMap<>();
		MapUtils.populateMap(deckMap, decks, Transformers.DECK_PRI_FACT);

		ExportedDeck exported = null;
		try {
			switch (type) {
				case OCTGN:
					ByteArrayOutputStream baos = new ByteArrayOutputStream();
					ZipOutputStream zos = new ZipOutputStream(baos);

					Set<Faction> factions = deckMap.keySet();
					for (Faction faction : factions) {
						Collection<Deck> factionDecks = deckMap.getCollection(faction);
						for (Deck fd : factionDecks) {
							StringBuilder nameBuilder = new StringBuilder(faction.toString().toLowerCase());
							nameBuilder.append("/");
							nameBuilder.append(StringUtils.replaceChars(fd.getName(), "/\\?%*:;|\"<>", " "));
							nameBuilder.append(".o8d");
							zos.putNextEntry(new ZipEntry(nameBuilder.toString()));
							zos.write(exportOctgn(fd).getCharacterData().getBytes());
							zos.closeEntry();
						}
					}
					zos.flush();
					zos.close();

					exported = new ExportedDeck();
					exported.setByteData(baos.toByteArray());
					break;
				default:
					throw new IllegalArgumentException("Unsupported export type");
			}
		} catch (IOException e) {
			throw new DeckException("error.deck.oper.export");
		}

		return exported;
	}

	private ExportedDeck exportOctgn(Deck deck) throws DeckException {
		String gameId = "af04f855-58c4-4db3-a191-45fe33381679";

		ExportedDeck exported = new ExportedDeck();
		exported.setName(deck.getName());
		exported.setTechName(Utils.toTechName(deck.getName()));

		try {
			DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			Document doc = db.newDocument();

			Element deckElem = (Element) doc.appendChild(doc.createElement("deck"));
			deckElem.setAttribute("game", gameId);

			Card warlord = ccm.getCard(deck.getWarlord().getId());
			Element warlordSectionElem = (Element) deckElem.appendChild(doc.createElement("section"));
			warlordSectionElem.setAttribute("name", "Warlord");
			warlordSectionElem.appendChild(createCardElement(doc, warlord.getOctgnId(), warlord.getNameEn(), 1));

			Element armiesSectionElem = (Element) deckElem.appendChild(doc.createElement("section"));
			armiesSectionElem.setAttribute("name", "Armies");
			for (DeckMember member : deck.getDeckMembers()) {
				Card card = ccm.getCard(member.getCard().getId());
				member.setCard(card);
				armiesSectionElem.appendChild(createCardElement(doc, card.getOctgnId(), card.getNameEn(),
						member.getQuantity()));
			}

			exported.setCharacterData(serialize(doc));
		} catch (Exception e) {
			DeckException de = new DeckException(e);
			de.setErrorCore("error.deck.oper.export");
			de.setDeck(deck);
			de.setRequestContext(requestContext);
			throw de;
		}

		return exported;
	}

	private Element createCardElement(Document doc, String id, String name, Integer quantity) {
		Element cardElem = doc.createElement("card");
		cardElem.setAttribute("qty", quantity.toString());
		cardElem.setAttribute("id", id);
		if (StringUtils.isNotBlank(name)) {
			cardElem.appendChild(doc.createTextNode(name));
		}
		return cardElem;
	}

	private String serialize(Document doc) throws Exception {
		StringWriter writer = new StringWriter();

		DOMImplementationRegistry reg = DOMImplementationRegistry.newInstance();
		DOMImplementationLS impl = (DOMImplementationLS) reg.getDOMImplementation("LS");
		LSSerializer serializer = impl.createLSSerializer();
		serializer.getDomConfig().setParameter("format-pretty-print", true);
		LSOutput lso = impl.createLSOutput();
		lso.setCharacterStream(writer);
		serializer.write(doc, lso);

		return writer.toString();
	}

	private void computeDeckInfo(Deck deck) {
		Faction primaryFaction = deck.getWarlord().getFaction();
		Faction secondaryFaction = null;
		TreeSet<String> crstSet = new TreeSet<>();
		Set<DeckMember> deckMembers = deck.getDeckMembers();
		for (DeckMember deckMember : deckMembers) {
			Faction faction = deckMember.getCard().getFaction();
			if (faction != primaryFaction && faction != Faction.NEUTRAL && secondaryFaction == null) {
				secondaryFaction = faction;
			}
			crstSet.add(deckMember.getCard().getCrstTechName().toLowerCase());
		}

		MultiValueMap<String, DeckMember> crstMap = new MultiValueMap<>();
		MapUtils.populateMap(crstMap, deckMembers, Transformers.DEME_CRST_TECH_NAME);
		List<CardSet> crstList = cache.loadCardSets();
		Collections.sort(new ArrayList<>(crstList), new Comparator<CardSet>() {

			@Override
			public int compare(CardSet o1, CardSet o2) {
				return o1.getSequence().compareTo(o2.getSequence());
			}

		});

		Long crstBitmap;
		if (crstMap == null || crstMap.isEmpty()) {
			crstBitmap = new Long(0);
		} else {
			long bitmap = 0;
			for (int i = 0; i < crstList.size(); i++) {
				if (crstMap.keySet().contains(crstList.get(i).getTechName())) {
					bitmap |= 1 << i;
				}
			}
			crstBitmap = new Long(bitmap);
		}

		MultiValueMap<CardType, DeckMember> cardTypeMap = new MultiValueMap<>();
		MapUtils.populateMap(cardTypeMap, deckMembers, Transformers.DEME_CARD_TYPE);

		deck.setPrimaryFaction(primaryFaction);
		deck.setSecondaryFaction(secondaryFaction);
		deck.setCrstBitmap(crstBitmap);
		deck.setCardsQuantity(sumDeckMembersQuantity(deckMembers));
		deck.setArmyCardsQuantity(sumDeckMembersQuantity(cardTypeMap.getCollection(CardType.ARMY)));
		deck.setAttachmentCardsQuantity(sumDeckMembersQuantity(cardTypeMap.getCollection(CardType.ATTACHMENT)));
		deck.setEventCardsQuantity(sumDeckMembersQuantity(cardTypeMap.getCollection(CardType.EVENT)));
		deck.setSupportCardsQuantity(sumDeckMembersQuantity(cardTypeMap.getCollection(CardType.SUPPORT)));
	}

	private int sumDeckMembersQuantity(Collection<DeckMember> deckMembers) {
		int quantity = 0;
		if (deckMembers != null) {
			for (DeckMember deckMember : deckMembers) {
				quantity += deckMember.getQuantity();
			}
		}
		return quantity;
	}

	private DeckException buildDeckException(Deck deck, String error) {
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