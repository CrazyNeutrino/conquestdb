package org.meb.conquest.db.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MapKey;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = { "langItems" })
@Entity
@Table(name = "cqt_domain")
public class DomainBase implements IBase<DomainLang> {

	private String domain;
	private String value;
	private String recordState;
	private Integer sequence;

	@OneToMany(mappedBy = "base", cascade = CascadeType.ALL)
	@MapKey(name = "langCode")
	@OrderBy(value = "langCode")
	private Map<String, DomainLang> langItems;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public DomainBase() {
		langItems = new HashMap<String, DomainLang>();
	}

	public DomainBase cloneWithIdentity() {
		DomainBase db = new DomainBase();
		db.setDomain(domain);
		db.setValue(value);
		return db;
	}
}
