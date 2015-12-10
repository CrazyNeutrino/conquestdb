package org.meb.conquest.db.converter;

import javax.persistence.AttributeConverter;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.TournamentPlace;

public class TournamentPlaceConverter implements AttributeConverter<TournamentPlace, String> {

	@Override
	public String convertToDatabaseColumn(TournamentPlace arg0) {
		if (arg0 == null) {
			return null;
		}
		return arg0.toString().replace('_', '-').toLowerCase();
	}

	@Override
	public TournamentPlace convertToEntityAttribute(String arg0) {
		arg0 = StringUtils.trimToNull(arg0);
		if (arg0 == null) {
			return null;
		}
		return TournamentPlace.valueOf(arg0.replace('-', '_').toUpperCase());
	}
}