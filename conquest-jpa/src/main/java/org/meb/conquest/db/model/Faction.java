package org.meb.conquest.db.model;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.meb.conquest.db.converter.FactionConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum Faction {

	ASTRA_MILITARUM, SPACE_MARINES, TAU, ELDAR, DARK_ELDAR, CHAOS, ORK, TYRANID {

		@Override
		public Set<Faction> alliance() {
			return new LinkedHashSet<Faction>(Arrays.asList(new Faction[] { TYRANID, NEUTRAL }));
		}
	},
	NECRON {
		@Override
		public Set<Faction> alliance() {
			return new LinkedHashSet<Faction>(Arrays.asList(new Faction[] { ASTRA_MILITARUM,
					SPACE_MARINES, TAU, ELDAR, DARK_ELDAR, CHAOS, ORK, NEUTRAL }));
		}
	},
	NEUTRAL {
		@Override
		public Set<Faction> alliance() {
			return new LinkedHashSet<Faction>();
		}
	};

	private static final Logger log = LoggerFactory.getLogger(Faction.class);

	public static Faction[] circle() {
		return Arrays.copyOf(values(), 7);
	}

	public static Set<Faction> convertToFactions(Collection<String> factionStrings) {
		Set<Faction> factions;

		if (factionStrings == null) {
			factions = null;
		} else {
			FactionConverter converter = new FactionConverter();
			factions = new HashSet<>();
			for (String factionString : factionStrings) {
				try {
					factions.add(converter.convertToEntityAttribute(factionString));
				} catch (RuntimeException e) {
					log.error("Unable to convert string to enum", e);
				}
			}
		}
		return factions;
	}

	public Set<Faction> alliance() {
		Faction[] circle = circle();
		Set<Faction> set = new LinkedHashSet<>();
		set.add(circle[(ordinal() - 1 + circle.length) % circle.length]);
		set.add(this);
		set.add(circle[(ordinal() + 1) % circle.length]);
		set.add(Faction.NEUTRAL);
		return set;
	}
}
