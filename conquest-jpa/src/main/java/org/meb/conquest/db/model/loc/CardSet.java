package org.meb.conquest.db.model.loc;

import java.util.Date;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.Type;
import org.meb.conquest.db.converter.CardSetTypeConverter;
import org.meb.conquest.db.model.CardSetType;

@Getter
@Setter
@Entity
@Table(name = "cqv_card_set")
@NoArgsConstructor
public class CardSet {

	private String cycleDescription;
	private String cycleName;
	private String cycleTechName;
	private String description;
	private String name;
	private Date releaseDate;
	
	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean released;
	private Integer sequence;
	private String symbol;
	private String techName;
	
	@Convert(converter = CardSetTypeConverter.class)
	private CardSetType typeCode;
	private String typeDisplay;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	public CardSet(Long id) {
		this.id = id;
	}
}
