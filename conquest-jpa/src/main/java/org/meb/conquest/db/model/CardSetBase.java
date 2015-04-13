package org.meb.conquest.db.model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
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

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Type;
import org.meb.conquest.db.converter.CardSetTypeConverter;

@Getter
@Setter
@ToString(exclude = { "langItems" })
@Entity
@Table(name = "cqt_card_set")
public class CardSetBase implements IBase<CardSetLang>{

	@Convert(converter = CardSetTypeConverter.class)
	private CardSetType typeCode;
	private String recordState;
	private Date releaseDate;
	
	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean released;
	private Integer sequence;
	private String techName;
	
	@OneToMany(mappedBy = "base", cascade = CascadeType.ALL)
	@MapKey(name = "langCode")
	@OrderBy(value = "langCode")
	private Map<String, CardSetLang> langItems;
	
	@ManyToOne
	@JoinColumn(name = "cycle_id")
	private CycleBase cycleBase;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	public CardSetBase() {
		this(null);
	}

	public CardSetBase(String techName) {
		this.techName = techName;
		langItems = new HashMap<String, CardSetLang>();
	}
}
