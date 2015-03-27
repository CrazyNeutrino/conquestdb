package org.meb.conquest.db.model;

import java.util.HashSet;
import java.util.Set;

public enum DeckType {

	BASE, SNAPSHOT;

	public static Set<String> valuesLowerCase() {
		Set<String> set = new HashSet<>();
		for (DeckType type : DeckType.values()) {
			set.add(type.toString().toLowerCase());
		}
		return set;
	}
	
	public static Set<String> valuesUpperCase() {
		Set<String> set = new HashSet<>();
		for (DeckType type : DeckType.values()) {
			set.add(type.toString().toUpperCase());
		}
		return set;
	}
}
