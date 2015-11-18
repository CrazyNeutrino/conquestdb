package org.meb.conquest.db.util;

import org.apache.commons.collections4.Transformer;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.Domain;

public class Transformers {

	public static final Transformer<Deck, Long> DECK_ID = new Transformer<Deck, Long>() {

		@Override
		public Long transform(Deck input) {
			return input.getId();
		}
	};

	public static final Transformer<Deck, Long> DECK_SNBA_ID = new Transformer<Deck, Long>() {

		@Override
		public Long transform(Deck input) {
			Deck snaphotBase = input.getSnapshotBase();
			if (snaphotBase == null) {
				return null;
			} else {
				return snaphotBase.getId();
			}
		}
	};
	
	public static final Transformer<Deck, Faction> DECK_PRI_FACT = new Transformer<Deck, Faction>() {

		@Override
		public Faction transform(Deck input) {
			return input.getPrimaryFaction();
		}
	};

	public static final Transformer<DeckMember, Long> DEME_ID = new Transformer<DeckMember, Long>() {

		@Override
		public Long transform(DeckMember input) {
			return input.getId();
		}
	};

	public static final Transformer<DeckMember, Long> DEME_CARD_ID = new Transformer<DeckMember, Long>() {

		@Override
		public Long transform(DeckMember input) {
			return input.getCard().getId();
		}
	};
	
	public static final Transformer<DeckMember, Card> DEME_CARD = new Transformer<DeckMember, Card>() {

		@Override
		public Card transform(DeckMember input) {
			return input.getCard();
		}
	};

	public static final Transformer<DeckMember, Long> DEME_DECK_ID = new Transformer<DeckMember, Long>() {

		@Override
		public Long transform(DeckMember input) {
			return input.getDeck().getId();
		}
	};

	public static final Transformer<DeckLink, Long> DELI_DECK_ID = new Transformer<DeckLink, Long>() {

		@Override
		public Long transform(DeckLink input) {
			return input.getDeck().getId();
		}
	};

	public static final Transformer<DeckComment, Long> DECO_DECK_ID = new Transformer<DeckComment, Long>() {

		@Override
		public Long transform(DeckComment input) {
			return input.getDeck().getId();
		}
	};

	public static final Transformer<DeckMember, String> DEME_CARD_TECH_NAME = new Transformer<DeckMember, String>() {

		@Override
		public String transform(DeckMember input) {
			return input.getCard().getTechName();
		}
	};

	public static final Transformer<DeckMember, String> DEME_CRST_TECH_NAME = new Transformer<DeckMember, String>() {

		@Override
		public String transform(DeckMember input) {
			return input.getCard().getCrstTechName();
		}
	};

	public static final Transformer<DeckMember, Faction> DEME_CARD_FACTION = new Transformer<DeckMember, Faction>() {

		@Override
		public Faction transform(DeckMember input) {
			return input.getCard().getFaction();
		}
	};

	public static final Transformer<DeckMember, CardType> DEME_CARD_TYPE = new Transformer<DeckMember, CardType>() {

		@Override
		public CardType transform(DeckMember input) {
			return input.getCard().getType();
		}
	};

	public static final Transformer<Domain, String> DOMA_NAME = new Transformer<Domain, String>() {

		@Override
		public String transform(Domain input) {
			return input.getDomain();
		}
	};

	public static final Transformer<Domain, String> DOMA_VALUE = new Transformer<Domain, String>() {

		@Override
		public String transform(Domain input) {
			return input.getValue();
		}
	};

	public static final Transformer<Card, Long> CARD_ID = new Transformer<Card, Long>() {

		@Override
		public Long transform(Card input) {
			return input.getId();
		}
	};
}
