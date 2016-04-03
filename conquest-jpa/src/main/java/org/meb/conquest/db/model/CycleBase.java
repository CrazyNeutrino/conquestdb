package org.meb.conquest.db.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

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
@ToString(exclude = { "langItems", "cardSetBaseItems" })
@Entity
@Table(name = "cqt_cycle")
public class CycleBase implements IBase<CycleLang> {

	private String recordState;
	private String techName;

	@OneToMany(mappedBy = "base", cascade = CascadeType.ALL)
	@MapKey(name = "langCode")
	@OrderBy(value = "langCode")
	private Map<String, CycleLang> langItems;

	@OneToMany(mappedBy = "cycleBase", cascade = CascadeType.ALL)
	@OrderBy(value = "sequence")
	private Set<CardSetBase> cardSetBaseItems;

	@Version
	private Long version;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	public CycleBase() {
		langItems = new HashMap<String, CycleLang>();
		cardSetBaseItems = new HashSet<CardSetBase>();
	}
	
	public CycleBase(String techName) {
		this();
		this.techName = techName;
	}
	
	public CycleBase cloneWithIdentity() {
		return new CycleBase(techName);
	}
}
