package org.meb.conquest.db.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.meb.conquest.db.converter.TournamentTypeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum TournamentType {
	
	WORLDS, NATIONALS, REGIONALS, LOCAL;
	
	private static final Logger log = LoggerFactory.getLogger(TournamentType.class);
	
	public static Set<TournamentType> convertToTournamentTypes(
			Collection<String> tournamentTypeStrings) {
		
		Set<TournamentType> tournamentTypes;

		if (tournamentTypeStrings == null) {
			tournamentTypes = null;
		} else {
			TournamentTypeConverter converter = new TournamentTypeConverter();
			tournamentTypes = new HashSet<>();
			for (String tournamentTypeString : tournamentTypeStrings) {
				try {
					tournamentTypes.add(converter.convertToEntityAttribute(tournamentTypeString));
				} catch (RuntimeException e) {
					log.error("Unable to convert string to enum", e);
				}
			}
		}
		return tournamentTypes;
	}
}
