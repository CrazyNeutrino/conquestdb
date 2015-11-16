package org.meb.conquest.db.model.loc;

import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Type;
import org.meb.conquest.db.converter.CardTypeConverter;
import org.meb.conquest.db.converter.FactionConverter;
import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "cqv_card")
@Access(AccessType.FIELD)
public class Card {

	private Integer attack;
	private Integer command;
	private Integer cost;
	private Integer shield;
	private Long crstId;
	private String crstDescription;
	private String crstName;
	private String crstReleaseDate;
	private Integer crstSequence;
	private String crstTechName;

	@Convert(converter = FactionConverter.class)
	@Column(name = "faction_code")
	private Faction faction;
	private String factionDisplay;
	private Date faqDate;
	private String faqText;
	private String faqVersion;
	private String flavourText;

	private Integer hitPoints;
	private String illustrator;
	private String imageLangCode;

	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean localized;

	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean loyal;
	private String name;
	private String nameEn;
	private Integer number;
	private Integer quantity;
	private Integer startingHandSize;
	private Integer startingResources;
	private String octgnId;
	private String techName;
	private String text;
	private String trait;
	private String traitEn;
	private String keyword;

	private Long warlordId;

	@Convert(converter = CardTypeConverter.class)
	@Column(name = "type_code")
	private CardType type;
	private String typeDisplay;

	@Column(name = "unq")
	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean unique;

	private Long id;

	@Version
	private Long version;

	public Card(Long id) {
		this.id = id;
	}

	public Card(CardType typeCode) {
		this.type = typeCode;
	}

	@Id
	@Access(AccessType.PROPERTY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
