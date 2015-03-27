package org.meb.conquest.db.model.loc;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cqv_cycle_loc")
public class Cycle {

	private String name;
	private String description;
	private String techName;

	@Version
	private Long version;

	@Id
	private String code;
}
