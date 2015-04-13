package org.meb.conquest.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.cache.UserCacheManager;
import org.meb.conquest.core.Constant;
import org.meb.conquest.db.dao.CardDao;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.query.CardQuery;
import org.meb.conquest.db.util.Transformers;
import org.meb.conquest.rest.exception.DeckException;

public class DeckValidator {

	private CardDao cardDao;

	@Getter
	@Setter
	private RequestContext requestContext;

	private UserCacheManager ucm;

	public DeckValidator(CardDao cardDao, UserCacheManager ucm) {
		this.cardDao = cardDao;
		this.ucm = ucm;
	}

	public void validate(Deck deck) throws DeckException {
		validateDeckType(deck);
		resolveValidateWarlord(deck);
		resolveValidateCards(deck);
		validateDeck(deck);

		User user = ucm.getUser(requestContext.getUserId());
		if (user.getUsername().equals("conquestdb")) {
			return;
		}

		validateComposition(deck);
	}

	public void validateDeckType(Deck deck) throws DeckException {
		DeckType type = deck.getType();
		if (type == null || (type != DeckType.BASE && type != DeckType.SNAPSHOT)) {
			throw buildDeckException(deck);
		}
	}

	private void resolveValidateWarlord(Deck deck) throws DeckException {
		Card warlord = deck.getWarlord();
		if (warlord == null || warlord.getId() == null) {
			throw buildDeckException(deck, "error.deck.warlord.notSet");
		} else {
			warlord = cardDao.findUnique(warlord);
			if (warlord == null) {
				throw buildDeckException(deck, "error.deck.warlord.notFound");
			} else if (warlord.getType() != CardType.WARLORD) {
				throw buildDeckException(deck, "error.deck.warlord.invalidId");
			} else {
				deck.setWarlord(warlord);
			}
		}
	}

	private void resolveValidateCards(Deck deck) throws DeckException {
		Set<DeckMember> deckMembers = deck.getDeckMembers();

		// remove members with null or zero quantity
		Iterator<DeckMember> memberIter = deckMembers.iterator();
		while (memberIter.hasNext()) {
			DeckMember member = memberIter.next();
			Integer quantity = member.getQuantity();
			if (quantity == null || quantity.equals(0)) {
				memberIter.remove();
			}
		}

		Set<Long> cardIds = CollectionUtils.collect(deckMembers, Transformers.DEME_CARD_ID, new HashSet<Long>());
		CardQuery cardQuery = new CardQuery();
		cardQuery.setIds(cardIds);
		List<Card> cards = cardDao.find(cardQuery);
		Map<Long, Card> cardsMap = new HashMap<>();
		MapUtils.populateMap(cardsMap, cards, Transformers.CARD_ID);

		for (DeckMember member : deckMembers) {
			Card card = member.getCard();
			if (card == null || card.getId() == null) {
				throw buildDeckException(deck, "error.deck.card.notSet");
			} else {
				card = cardsMap.get(card.getId());
				if (card == null) {
					throw buildDeckException(deck, "error.deck.card.notFound");
				} else {
					member.setCard(card);
				}
			}
		}
	}

	private void validateDeck(Deck deck) throws DeckException {
		Integer csQuantity = deck.getConfigCsQuantity();
		if (csQuantity == null || csQuantity < 1 || csQuantity > 3) {
			DeckException de = buildDeckException(deck, "error.deck.deck.invalidCsQuantity");
			de.setErrorCoreParameter(1, String.valueOf(csQuantity));
			throw de;
		}

		if (StringUtils.isBlank(deck.getName())) {
			throw buildDeckException(deck, "error.deck.name.empty");
		}
		if (deck.getName().trim().length() > Constant.Deck.MAX_NAME_LEN) {
			DeckException de = buildDeckException(deck, "error.deck.name.tooLong");
			de.setErrorCoreParameter(0, String.valueOf(Constant.Deck.MAX_NAME_LEN));
			throw de;
		}
		if (deck.getDescription() != null && deck.getDescription().trim().length() > Constant.Deck.MAX_DESCRIPTION_LEN) {
			DeckException de = buildDeckException(deck, "error.deck.description.tooLong");
			de.setErrorCoreParameter(0, String.valueOf(Constant.Deck.MAX_DESCRIPTION_LEN));
			throw de;
		}
	}

	private void validateComposition(Deck deck) throws DeckException {
		Set<DeckMember> deckMembers = deck.getDeckMembers();

		Long deckId = deck.getId();
		DeckType deckType = deck.getType();
		Faction deckFaction = deck.getWarlord().getFaction();

		int totalQuantity = 0;
		int synapseQuantity = 0;
		if (deckType == DeckType.BASE || (deckType == DeckType.SNAPSHOT && deckId == null)) {
			// validate each type quantity
			for (DeckMember deckMember : deckMembers) {
				Card card = deckMember.getCard();
				Integer maxQuantity;
				if (card.getWarlordId() == null && card.getType() != CardType.SYNAPSE) {
					maxQuantity = Math.min(3, deck.getConfigCsQuantity() * card.getQuantity());
				} else {
					maxQuantity = card.getQuantity();
				}
				Integer quantity = deckMember.getQuantity();
				if (quantity == null || quantity < 1 || quantity > maxQuantity) {
					DeckException de = buildDeckException(deck, "error.deck.comp.invalidQuantity");
					de.setErrorCoreParameter(0, card.getName());
					de.setErrorCoreParameter(1, String.valueOf(quantity));
					throw de;
				}
				totalQuantity += quantity;
				
				if (card.getType() == CardType.SYNAPSE) {
					synapseQuantity++;
				}
			}
		}

		if (deckType == DeckType.SNAPSHOT && deckId == null && totalQuantity < 50) {
			DeckException de = buildDeckException(deck, "error.deck.comp.invalidTotalQuantity");
			de.setErrorCoreParameter(0, String.valueOf(totalQuantity));
			throw de;
		}
		
		if (deckType == DeckType.SNAPSHOT && deckId == null && deckFaction == Faction.TYRANID && synapseQuantity != 1) {
			DeckException de = buildDeckException(deck, "error.deck.comp.invalidSynapseQuantity");
			de.setErrorCoreParameter(1, String.valueOf(synapseQuantity));
			throw de;
		}

		if (deckType == DeckType.BASE || (deckType == DeckType.SNAPSHOT && deckId == null)) {
			Faction[] alliance = deckFaction.alliance();
			HashSet<Faction> factions = new HashSet<>();
			for (DeckMember deckMember : deckMembers) {
				Card card = deckMember.getCard();
				Faction faction = card.getFaction();
				if (ArrayUtils.indexOf(alliance, faction) < 0) {
					DeckException de = buildDeckException(deck, "error.deck.comp.invalidCard");
					de.setErrorCoreParameter(1, card.getName());
					throw de;
				}
				factions.add(faction);
			}

			factions.remove(deckFaction);
			factions.remove(Faction.NEUTRAL);
			if (factions.size() > 1) {
				DeckException de = buildDeckException(deck, "error.deck.comp.tooManyAlliedFactions");
				de.setErrorCoreParameter(1, String.valueOf(factions));
				throw de;
			}
		}
	}

	private DeckException buildDeckException(Deck deck) {
		return buildDeckException(deck, null);
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
