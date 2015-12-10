package org.meb.conquest.db.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.meb.conquest.db.converter.TournamentPlaceConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum TournamentPlace {

	FIRST, SECOND;

	private static final Logger log = LoggerFactory.getLogger(TournamentPlace.class);
	
	public static Set<TournamentPlace> convertToTournamentPlaces(
			Collection<String> tournamentPlaceStrings) {

		Set<TournamentPlace> tournamentPlaces;

		if (tournamentPlaceStrings == null) {
			tournamentPlaces = null;
		} else {
			TournamentPlaceConverter converter = new TournamentPlaceConverter();
			tournamentPlaces = new HashSet<>();
			for (String tournamentPlaceString : tournamentPlaceStrings) {
				try {
					tournamentPlaces.add(converter.convertToEntityAttribute(tournamentPlaceString));
				} catch (RuntimeException e) {
					log.error("Unable to convert string to enum", e);
				}
			}
		}
		return tournamentPlaces;
	}
}
