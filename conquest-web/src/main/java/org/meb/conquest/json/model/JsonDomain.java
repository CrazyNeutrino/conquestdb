package org.meb.conquest.json.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.db.model.loc.Domain;

@Getter
@Setter
@NoArgsConstructor
public class JsonDomain {

	private Long id;
	private String domain;
	private String description;
	private String value;
	private Integer sequence;

	public JsonDomain(Domain domain) {
		this.id = domain.getId();
		this.domain = domain.getDomain();
		this.description = domain.getDescription();
		this.value = domain.getValue();
		this.sequence = domain.getSequence();
	}
}
