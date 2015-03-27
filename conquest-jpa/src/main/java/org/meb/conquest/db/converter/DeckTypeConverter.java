package org.meb.conquest.db.converter;

import javax.persistence.AttributeConverter;

import org.meb.conquest.db.model.DeckType;

public class DeckTypeConverter implements AttributeConverter<DeckType, String> {

	@Override
	public String convertToDatabaseColumn(DeckType arg0) {
		if (arg0 == null) {
			return null;
		}
		return arg0.toString().replace('_', '-').toLowerCase();
	}

	@Override
	public DeckType convertToEntityAttribute(String arg0) {
		if (arg0 == null) {
			return null;
		}
		return DeckType.valueOf(arg0.replace('-', '_').toUpperCase());
	}
}