package org.meb.conquest.db.model;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.meb.conquest.db.converter.FactionConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum Faction {

	ASTRA_MILITARUM, SPACE_MARINES, TAU, ELDAR, DARK_ELDAR, CHAOS, ORK, TYRANID {

		@Override
		public Faction[] alliance() {
			return new Faction[] { TYRANID };
		}

		@Override
		public Faction[] allies() {
			return new Faction[0];
		}
	},
	NEUTRAL {
		@Override
		public Faction[] alliance() {
			return new Faction[0];
		}

		@Override
		public Faction[] allies() {
			return new Faction[0];
		}
	};

	private static final Logger log = LoggerFactory.getLogger(Faction.class);
	private static Faction[] alliesCircle = Arrays.copyOf(values(), 7);

	public static Faction[] alliesCircle() {
		return Arrays.copyOf(alliesCircle, alliesCircle.length);
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

	public Faction[] allies() {
		Faction[] allies = new Faction[3];
		allies[0] = alliesCircle[(ordinal() - 1 + alliesCircle.length) % alliesCircle.length];
		allies[1] = alliesCircle[(ordinal() + 1) % alliesCircle.length];
		allies[2] = NEUTRAL;
		return allies;
	}

	public Faction[] alliance() {
		Faction[] alliance = new Faction[4];
		alliance[0] = alliesCircle[(ordinal() - 1 + alliesCircle.length) % alliesCircle.length];
		alliance[1] = this;
		alliance[2] = alliesCircle[(ordinal() + 1) % alliesCircle.length];
		alliance[3] = NEUTRAL;
		return alliance;
	}
}
