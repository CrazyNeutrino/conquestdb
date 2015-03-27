package org.meb.conquest.json.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JsonCardType {

	private String techName;
	private String name;
	private String shortName;

	public JsonCardType(String techName, String name, String shortName) {
		this.techName = techName;
		this.name = name;
		this.shortName = shortName;
	}
}
