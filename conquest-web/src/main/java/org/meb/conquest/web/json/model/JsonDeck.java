package org.meb.conquest.web.json.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.converter.DeckTypeConverter;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckComment;
import org.meb.conquest.db.model.DeckLink;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.DeckType;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.util.Utils;
import org.meb.conquest.web.json.JsonDeckBuilder;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JsonDeck {

	private Long id;
	private String techName;
	private Long warlordId;
	private String name;
	private String description;
	private String username;
	private Date createDate;
	private Date modifyDate;
	private Integer configCsQuantity;

	private List<JsonDeckMember> members = new ArrayList<>();
	private List<JsonDeckLink> links = new ArrayList<>();
	private List<JsonDeckComment> comments = new ArrayList<>();
	private List<JsonDeck> snapshots = new ArrayList<>();
	// private List<JsonDeck> relatedSnapshots = new ArrayList<>();

	private Long snapshotBaseId;
	private Boolean snapshotPublic;
	// private Integer snapshotVersion;
	// private Boolean snapshotLatest;
	private String type;
	private String tournamentType;
	private String tournamentPlace;
	private JsonDeckInterest totalDeckInterest;
	private JsonDeckInterest userDeckInterest;

	private boolean loadMembers;
	private boolean loadLinks;
	private boolean loadComments;
	private boolean loadSnapshots;
	private boolean loadInterests;

	public JsonDeck build(Deck deck) {
		id = deck.getId();
		warlordId = deck.getWarlord().getId();
		name = deck.getName();
		if (name != null) {
			techName = Utils.toTechName(name);
		}
		description = deck.getDescription();
		createDate = deck.getCreateDate();
		modifyDate = deck.getModifyDate();
		configCsQuantity = deck.getConfigCsQuantity();
		if (deck.getSnapshotBase() != null) {
			snapshotBaseId = deck.getSnapshotBase().getId();
		}
		// snapshotVersion = deck.getSnapshotVersion();
		// snapshotLatest = deck.getSnapshotLatest();
		snapshotPublic = deck.getSnapshotPublic();
		type = deck.getType().toString().toLowerCase();
		username = deck.getUser().getUsername();
		tournamentType = deck.getTournamentType();
		tournamentPlace = deck.getTournamentPlace();

		if (loadMembers) {
			for (DeckMember deckMember : deck.getDeckMembers()) {
				members.add(new JsonDeckMember(deckMember));
			}
		}

		if (loadLinks) {
			for (DeckLink deckLink : deck.getDeckLinks()) {
				links.add(new JsonDeckLink(deckLink));
			}
		}

		if (loadComments) {
			for (DeckComment deckComment : deck.getDeckComments()) {
				comments.add(new JsonDeckComment(deckComment));
			}
		}

		if (loadSnapshots) {
			snapshots.addAll(new JsonDeckBuilder().buildMany(deck.getSnapshots()));
			// relatedSnapshots.addAll(build(deck.getRelatedSnapshots(), false,
			// false, false, false));
		}

		if (loadInterests) {
			totalDeckInterest = new JsonDeckInterest(deck.getTotalDeckInterest());
			userDeckInterest = new JsonDeckInterest(deck.getUserDeckInterest());
		}

		return this;
	}

	public Deck buildDeck() throws DeckException {
		Deck deck = new Deck();
		deck.setId(id);

		DeckTypeConverter dtc = new DeckTypeConverter();
		if (dtc.convertToDatabaseColumn(DeckType.BASE).equals(type)) {
			deck.setType(DeckType.BASE);
		} else if (dtc.convertToDatabaseColumn(DeckType.SNAPSHOT).equals(type)) {
			deck.setType(DeckType.SNAPSHOT);
			if (snapshotBaseId != null) {
				deck.setSnapshotBase(new Deck(snapshotBaseId));
			}
			deck.setSnapshotPublic(snapshotPublic);
		} else {
			throw new DeckException("error.deck.deck.invalidType");
		}

		deck.setName(name);
		deck.setDescription(description);
		deck.setCreateDate(createDate);
		deck.setModifyDate(modifyDate);
		deck.setConfigCsQuantity(configCsQuantity);
		deck.setWarlord(new Card(warlordId));
		deck.setTournamentType(tournamentType);
		deck.setTournamentPlace(tournamentPlace);

		deck.setType(DeckType.valueOf(type.toUpperCase()));
		Set<DeckMember> deckMembers = new LinkedHashSet<>();
		for (JsonDeckMember member : members) {
			DeckMember deckMember = new DeckMember();
			deckMember.setCard(new Card(member.getCardId()));
			deckMember.setQuantity(member.getQuantity());
			deckMembers.add(deckMember);
		}
		deck.setDeckMembers(deckMembers);
		return deck;
	}
}
