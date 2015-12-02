package org.meb.conquest.db.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.Version;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Type;
import org.meb.conquest.db.converter.DeckTypeConverter;
import org.meb.conquest.db.converter.FactionConverter;
import org.meb.conquest.db.model.loc.Card;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "cqt_deck")
@Access(AccessType.FIELD)
public class Deck {

	private Integer configCsQuantity;

	private String name;
	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createDate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date modifyDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Convert(converter = DeckTypeConverter.class)
	@Column(name = "type_code")
	private DeckType type;

	@Convert(converter = FactionConverter.class)
	@Column(name = "comp_primary_faction")
	private Faction primaryFaction;

	@Convert(converter = FactionConverter.class)
	@Column(name = "comp_secondary_faction")
	private Faction secondaryFaction;

	@Column(name = "comp_crst_bitmap")
	private Long crstBitmap;

	@Column(name = "comp_cards_qty")
	private Integer cardsQuantity;

	@Column(name = "comp_arm_cards_qty")
	private Integer armyCardsQuantity;

	@Column(name = "comp_att_cards_qty")
	private Integer attachmentCardsQuantity;

	@Column(name = "comp_evt_cards_qty")
	private Integer eventCardsQuantity;
	
	private String tournamentType;
	private String tournamentPlace;

	@Column(name = "comp_sup_cards_qty")
	private Integer supportCardsQuantity;

	@ManyToOne
	@JoinColumn(name = "snapshot_base_id")
	private Deck snapshotBase;

	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean snapshotPublic;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "warlord_id")
	private Card warlord;

	@OneToMany(mappedBy = "deck", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<DeckMember> deckMembers = new HashSet<>();

	@OneToMany(mappedBy = "deck", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("createDate DESC")
	private Set<DeckLink> deckLinks = new HashSet<>();

	@OneToMany(mappedBy = "deck", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("createDate ASC")
	private Set<DeckComment> deckComments = new HashSet<>();

	@OneToMany(mappedBy = "snapshotBase"/*, cascade = CascadeType.ALL, orphanRemoval = true*/)
	@OrderBy("createDate DESC")
	private Set<Deck> snapshots = new HashSet<Deck>();

	@Transient
	private Set<Deck> relatedSnapshots = new HashSet<Deck>();
	
	@Transient
	private DeckInterest totalDeckInterest;
	
	@Transient
	private DeckInterest userDeckInterest;
	

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public Deck(Long id) {
		this.id = id;
	}

	public Deck(DeckType type) {
		this.type = type;
	}
}
