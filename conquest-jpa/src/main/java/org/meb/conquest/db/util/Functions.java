package org.meb.conquest.db.util;

import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckInterest;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.Domain;

import com.google.common.base.Function;

public class Functions {

	public static final Function<Card, Long> CardId = new Function<Card, Long>() {
	
		@Override
		public Long apply(Card input) {
			return input.getId();
		}
	};

	public static final Function<Deck, Long> DeckId = new Function<Deck, Long>() {

		@Override
		public Long apply(Deck input) {
			return input.getId();
		}
	};

	public static final Function<Deck, Long> DeckSnapshotId = new Function<Deck, Long>() {

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
	
	public static final Function<Deck, Faction> DeckPrimaryFaction = new Function<Deck, Faction>() {

		@Override
		public Faction apply(Deck input) {
			return input.getPrimaryFaction();
		}
	};

	public static final Function<DeckMember, Long> DeckMemberId = new Function<DeckMember, Long>() {

		@Override
		public Long apply(DeckMember input) {
			return input.getId();
		}
	};

	public static final Function<DeckMember, Card> DeckMemberCard = new Function<DeckMember, Card>() {
	
		@Override
		public Card apply(DeckMember input) {
			return input.getCard();
		}
	};

	public static final Function<DeckMember, Long> DeckMemberCardId = new Function<DeckMember, Long>() {
	
		@Override
		public Long apply(DeckMember input) {
			return input.getCard().getId();
		}
	};

	public static final Function<DeckMember, Faction> DeckMemberCardFaction = new Function<DeckMember, Faction>() {
	
		@Override
		public Faction apply(DeckMember input) {
			return input.getCard().getFaction();
		}
	};

	public static final Function<DeckMember, CardType> DeckMemberCardType = new Function<DeckMember, CardType>() {
	
		@Override
		public CardType apply(DeckMember input) {
			return input.getCard().getType();
		}
	};

	public static final Function<DeckMember, String> DeckMemberCardTechName = new Function<DeckMember, String>() {
	
		@Override
		public String apply(DeckMember input) {
			return input.getCard().getTechName();
		}
	};

	public static final Function<DeckMember, String> DeckMemberCrstTechName = new Function<DeckMember, String>() {
	
		@Override
		public String apply(DeckMember input) {
			return input.getCard().getCrstTechName();
		}
	};

	public static final Function<DeckMember, Long> DeckMemberDeckId = new Function<DeckMember, Long>() {

		@Override
		public Long apply(DeckMember input) {
			return input.getDeck().getId();
		}
	};

	public static final Function<DeckLink, Long> DeckLinkDeckId = new Function<DeckLink, Long>() {

		@Override
		public Long apply(DeckLink input) {
			return input.getDeck().getId();
		}
	};

	public static final Function<DeckComment, Long> DeckCommentDeckId = new Function<DeckComment, Long>() {

		@Override
		public Long apply(DeckComment input) {
			return input.getDeck().getId();
		}
	};
	
	public static final Function<DeckInterest, Long> DeckInterestDeckId = new Function<DeckInterest, Long>() {
		
		@Override
		public Long apply(DeckInterest input) {
			return input.getDeckId();
		}
	};

	public static final Function<DeckInterest, String> DeckInterestKey = new Function<DeckInterest, String>() {
	
		@Override
		public String apply(DeckInterest input) {
			return input.getDeckId() + "#" + input.getUserId();
		}
	};

	public static final Function<Domain, String> DomainName = new Function<Domain, String>() {

		@Override
		public String apply(Domain input) {
			return input.getDomain();
		}
	};

	public static final Function<Domain, String> DomainValue = new Function<Domain, String>() {

		@Override
		public String apply(Domain input) {
			return input.getValue();
		}
	};
}
