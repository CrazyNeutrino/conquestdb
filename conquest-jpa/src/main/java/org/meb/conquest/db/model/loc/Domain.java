package org.meb.conquest.db.model.loc;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLInsert;
import org.hibernate.annotations.SQLUpdate;

@Getter
@Setter
@ToString
@Entity
@Table(name = "cqv_domain")
@SQLInsert(callable = true, check = ResultCheckStyle.NONE, sql = "call cqp_ins_domain_loc(?,?,?,?,?)")
@SQLUpdate(callable = false, check = ResultCheckStyle.NONE, sql = "call cqp_upd_domain_loc(?,?,?,?,?,?)")
public class Domain {

	private String description;
	private String descriptionEn;
	private String domain;
	private Integer sequence;
	private String value;
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public Domain() {
	}
	
	public Domain(Long id) {
		this.id = id;
	}

	public Domain(String domain) {
		this.domain = domain;
	}

	public Domain(String domain, String value) {
		this.domain = domain;
		this.value = value;
	}
}
