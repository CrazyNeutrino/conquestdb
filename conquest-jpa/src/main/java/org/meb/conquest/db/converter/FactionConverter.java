package org.meb.conquest.db.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.meb.conquest.db.model.Faction;

@Converter
public class FactionConverter implements AttributeConverter<Faction, String> {

	@Override
	public String convertToDatabaseColumn(Faction arg0) {
		if (arg0 == null) {
			return null;
		}
		return arg0.toString().replace('_', '-').toLowerCase();
	}

	@Override
	public Faction convertToEntityAttribute(String arg0) {
		if (arg0 == null) {
			return null;
		}
		return Faction.valueOf(arg0.replace('-', '_').toUpperCase());
	}
}
