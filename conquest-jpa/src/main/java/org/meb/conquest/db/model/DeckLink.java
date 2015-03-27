package org.meb.conquest.db.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@NoArgsConstructor
@ToString
@Entity
@Table(name = "cqt_deck_link")
public class DeckLink {

	@ManyToOne
	@JoinColumn(name = "deck_id")
	private Deck deck;

	@Enumerated(EnumType.STRING)
	private DeckLinkType type;
	private String value;
	private String name;
	private Date validFrom;
	private Date validTo;
	private Date createDate;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	public DeckLink(Long id) {
		this.id = id;
	}
}
