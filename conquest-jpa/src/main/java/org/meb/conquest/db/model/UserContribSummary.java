package org.meb.conquest.db.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "cqv_user_contrib_summary")
public class UserContribSummary {

	@Id
	@Column(name = "user_id")
	private Long id;

	@OneToOne
	@PrimaryKeyJoinColumn
	private User user;

	@Type(type = "org.hibernate.type.YesNoType")
	private Boolean contributor;

	public UserContribSummary(User user) {
		this.user = user;
	}
}
