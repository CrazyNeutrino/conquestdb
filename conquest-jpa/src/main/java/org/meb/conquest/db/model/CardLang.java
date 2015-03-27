package org.meb.conquest.db.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = { "base" })
@Entity
@Table(name = "cqt_card_l")
@NoArgsConstructor
public class CardLang implements ILang<CardBase> {

	private Date faqDate;
	private String faqText;
	private String faqVersion;
	private String flavourText;
	private String name;
	private String recordState;
	private String text;
	private String trait;
	private String keyword;

	@ManyToOne
	@JoinColumn(name = "card_id")
	private CardBase base;
	private String langCode;
	private String imageLangCode;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	public CardLang(String langCode) {
		this.langCode = langCode;
	}
}
