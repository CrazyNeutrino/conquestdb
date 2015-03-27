package org.meb.conquest.rest.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExportedDeck {
	
	public enum Type {
		
		OCTGN, PLAIN
	}

	private String name;
	private String techName;
	private String characterData;
	private byte[] byteData;
}
