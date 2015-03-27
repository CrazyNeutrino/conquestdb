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
@NoArgsConstructor
@ToString
@Entity
@Table(name = "cqt_deck_comment")
public class DeckComment {

	@ManyToOne
	@JoinColumn(name = "deck_id")
	private Deck deck;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private String value;
	private Date createDate;
	private Date modifyDate;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public DeckComment(Long id) {
		this.id = id;
	}
}
