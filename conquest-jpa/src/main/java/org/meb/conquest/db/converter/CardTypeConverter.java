package org.meb.conquest.db.converter;

import javax.persistence.AttributeConverter;

import org.meb.conquest.db.model.CardType;

public class CardTypeConverter implements AttributeConverter<CardType, String> {

	@Override
	public String convertToDatabaseColumn(CardType arg0) {
		if (arg0 == null) {
			return null;
		}
		return arg0.toString().replace('_', '-').toLowerCase();
	}

	@Override
	public CardType convertToEntityAttribute(String arg0) {
		if (arg0 == null) {
			return null;
		}
		return CardType.valueOf(arg0.replace('-', '_').toUpperCase());
	}
}