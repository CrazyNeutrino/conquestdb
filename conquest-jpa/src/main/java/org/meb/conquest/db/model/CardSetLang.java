package org.meb.conquest.db.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = { "base" })
@Entity
@Table(name = "cqt_card_set_l")
public class CardSetLang implements ILang<CardSetBase> {

	private String symbol;
	private String name;
	private String description;
	private String recordState;

	@ManyToOne
	@JoinColumn(name = "crst_id")
	private CardSetBase base;
	private String langCode;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

}
