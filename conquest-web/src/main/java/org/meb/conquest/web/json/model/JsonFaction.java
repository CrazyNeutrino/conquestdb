package org.meb.conquest.web.json.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JsonFaction {

	private String techName;
	private String name;
	private String nameEn;
	private String shortName;

	public JsonFaction(String techName, String name, String shortName) {
		this.techName = techName;
		this.name = name;
		this.shortName = shortName;
	}
	
	public JsonFaction(String techName, String name, String nameEn, String shortName) {
		this.techName = techName;
		this.name = name;
		this.nameEn = nameEn;
		this.shortName = shortName;
	}
}
