package org.meb.conquest.db.util;

import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.Domain;

import com.google.common.base.Function;

public class Functions {

	public static final Function<Deck, Long> DECK_ID = new Function<Deck, Long>() {

		@Override
		public Long apply(Deck input) {
			return input.getId();
		}
	};

	public static final Function<Deck, Long> DECK_SNBA_ID = new Function<Deck, Long>() {

		@Override
		public Long apply(Deck input) {
			Deck snaphotBase = input.getSnapshotBase();
			if (snaphotBase == null) {
				return null;
			} else {
				return snaphotBase.getId();
			}
		}
	};
	
	public static final Function<Deck, Faction> DECK_PRI_FACT = new Function<Deck, Faction>() {

		@Override
		public Faction apply(Deck input) {
			return input.getPrimaryFaction();
		}
	};

	public static final Function<DeckMember, Long> DEME_ID = new Function<DeckMember, Long>() {

		@Override
		public Long apply(DeckMember input) {
			return input.getId();
		}
	};

	public static final Function<DeckMember, Long> DEME_CARD_ID = new Function<DeckMember, Long>() {

		@Override
		public Long apply(DeckMember input) {
			return input.getCard().getId();
		}
	};
	
	public static final Function<DeckMember, Card> DEME_CARD = new Function<DeckMember, Card>() {

		@Override
		public Card apply(DeckMember input) {
			return input.getCard();
		}
	};

	public static final Function<DeckMember, Long> DEME_DECK_ID = new Function<DeckMember, Long>() {

		@Override
		public Long apply(DeckMember input) {
			return input.getDeck().getId();
		}
	};

	public static final Function<DeckLink, Long> DELI_DECK_ID = new Function<DeckLink, Long>() {

		@Override
		public Long apply(DeckLink input) {
			return input.getDeck().getId();
		}
	};

	public static final Function<DeckComment, Long> DECO_DECK_ID = new Function<DeckComment, Long>() {

		@Override
		public Long apply(DeckComment input) {
			return input.getDeck().getId();
		}
	};

	public static final Function<DeckMember, String> DEME_CARD_TECH_NAME = new Function<DeckMember, String>() {

		@Override
		public String apply(DeckMember input) {
			return input.getCard().getTechName();
		}
	};

	public static final Function<DeckMember, String> DEME_CRST_TECH_NAME = new Function<DeckMember, String>() {

		@Override
		public String apply(DeckMember input) {
			return input.getCard().getCrstTechName();
		}
	};

	public static final Function<DeckMember, Faction> DEME_CARD_FACTION = new Function<DeckMember, Faction>() {

		@Override
		public Faction apply(DeckMember input) {
			return input.getCard().getFaction();
		}
	};

	public static final Function<DeckMember, CardType> DEME_CARD_TYPE = new Function<DeckMember, CardType>() {

		@Override
		public CardType apply(DeckMember input) {
			return input.getCard().getType();
		}
	};

	public static final Function<Domain, String> DOMA_NAME = new Function<Domain, String>() {

		@Override
		public String apply(Domain input) {
			return input.getDomain();
		}
	};

	public static final Function<Domain, String> DOMA_VALUE = new Function<Domain, String>() {

		@Override
		public String apply(Domain input) {
			return input.getValue();
		}
	};

	public static final Function<Card, Long> CARD_ID = new Function<Card, Long>() {

		@Override
		public Long apply(Card input) {
			return input.getId();
		}
	};
}
