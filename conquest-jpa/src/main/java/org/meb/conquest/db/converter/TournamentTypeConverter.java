package org.meb.conquest.db.converter;

import javax.persistence.AttributeConverter;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.TournamentType;

public class TournamentTypeConverter implements AttributeConverter<TournamentType, String> {

	@Override
	public String convertToDatabaseColumn(TournamentType arg0) {
		if (arg0 == null) {
			return null;
		}
		return arg0.toString().replace('_', '-').toLowerCase();
	}

	@Override
	public TournamentType convertToEntityAttribute(String arg0) {
		arg0 = StringUtils.trimToNull(arg0);
		if (arg0 == null) {
			return null;
		}
		return TournamentType.valueOf(arg0.replace('-', '_').toUpperCase());
	}
}