package org.meb.conquest.db.model;

import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKey;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Version;

import org.hibernate.annotations.Type;
import org.meb.conquest.db.converter.CardTypeConverter;
import org.meb.conquest.db.converter.FactionConverter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = { "langItems" })
@Entity
@Table(name = "cqt_card")
public class CardBase implements IBase<CardLang> {

	private Integer attack;
	private Integer command;
	private Integer cost;
	private Integer shield;

	@Convert(converter = FactionConverter.class)
	@Column(name = "faction_code")
	private Faction faction;
	private Integer hitPoints;
	private String illustrator;

	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean loyal;
	private Integer number;
	private Integer quantity;
	private String recordState;

	private Integer startingHandSize;
	private Integer startingResources;
	private String techName;
	private String octgnId;

	@NonNull
	@Convert(converter = CardTypeConverter.class)
	@Column(name = "type_code")
	private CardType type;

	@Column(name = "unq")
	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean unique;

	@OneToMany(mappedBy = "base", cascade = CascadeType.ALL)
	@MapKey(name = "langCode")
	@OrderBy(value = "langCode")
	private Map<String, CardLang> langItems;

	@ManyToOne
	@JoinColumn(name = "crst_id")
	private CardSetBase cardSetBase;

	@ManyToOne
	@JoinColumn(name = "warlord_id")
	private CardBase warlordBase;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Version
	private Long version;

	public CardBase cloneWithIdentity() {
		CardBase cb = new CardBase();
		cb.setNumber(this.number);
		cb.setCardSetBase(this.cardSetBase);
		cb.setTechName(this.techName);
		return cb;
	}
}
