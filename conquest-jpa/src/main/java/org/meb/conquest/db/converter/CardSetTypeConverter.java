package org.meb.conquest.db.converter;

import javax.persistence.AttributeConverter;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.db.model.CardSetType;

public class CardSetTypeConverter implements AttributeConverter<CardSetType, String> {

	@Override
	public String convertToDatabaseColumn(CardSetType arg0) {
		if (arg0 == null) {
			return null;
		}
		return arg0.toString().replace('_', '-').toLowerCase();
	}

	@Override
	public CardSetType convertToEntityAttribute(String arg0) {
		arg0 = StringUtils.trimToNull(arg0);
		if (arg0 == null) {
			return null;
		}
		return CardSetType.valueOf(arg0.replace('-', '_').toUpperCase());
	}
}