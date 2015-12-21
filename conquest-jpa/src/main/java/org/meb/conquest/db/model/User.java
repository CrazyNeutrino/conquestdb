package org.meb.conquest.db.model;

import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Version;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString(includeFieldNames = true)
@Entity
@Table(name = "cqt_user")
@Access(AccessType.FIELD)
public class User {

	private Date signUpDate;
	private Date signInDate;
	private String timeZoneId;

	@Column(name = "name")
	private String username;
	private String email;
	private String hash;
	private String salt;

	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean active = Boolean.TRUE;
	private String activationCode;
	private String resetPasswordCode;
	private Long twitterId;

	@OneToOne
	@PrimaryKeyJoinColumn
	private UserContribSummary userContribSummary;

	@Access(AccessType.PROPERTY)
	private Long id;

	@Version
	private Long version;

	public User(Long id) {
		this.id = id;
	}

	public User(String username) {
		this.username = username;
	}

	public User(String username, Boolean active) {
		this.username = username;
		this.active = active;
	}

	public User(String username, String email, String hash, String salt) {
		this.username = username;
		this.email = email;
		this.hash = hash;
		this.salt = salt;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
