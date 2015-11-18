package org.meb.conquest.web.json.model;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.db.model.loc.CardSet;

@Getter
@Setter
@NoArgsConstructor
public class JsonCardSet {

	private Long id;
	private String name;
	private Date releaseDate;
	private Boolean released;
	private String techName;
	private String cycleName;
	private String cycleTechName;
	private Integer number;

	public JsonCardSet(CardSet cardSet) {
		id = cardSet.getId();
		techName = cardSet.getTechName();
		name = cardSet.getName();
		releaseDate = cardSet.getReleaseDate();
		released = cardSet.getReleased();
		cycleName = cardSet.getCycleName();
		cycleTechName = cardSet.getCycleTechName();
		number = cardSet.getSequence();
	}
}
