package org.meb.conquest.db.util;

import java.text.Normalizer;
import java.text.Normalizer.Form;

import org.apache.commons.lang.StringUtils;
import org.meb.conquest.db.converter.FactionConverter;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Utils {

	private static final Logger log = LoggerFactory.getLogger(Utils.class);

	public static String toTechName(String name) {
		String techName = Normalizer.normalize(name, Form.NFD).replaceAll("[^\\p{ASCII}\\p{Digit}]", "");
		techName = techName.replaceAll("[^\\p{Alnum} \\-]", "").replace(' ', '-').replaceAll("\\-+", "-");
		techName = StringUtils.removeStart(techName, "-");
		techName = StringUtils.removeEnd(techName, "-");
		techName = techName.toLowerCase().trim();
		log.debug("toTechName(): name: {}, techName: {}", name, techName);
		return techName;
	}

	public static String techNameToAcronym(String techName) {
		String[] tokens = techName.split("-");
		StringBuilder builder = new StringBuilder();
		for (String token : tokens) {
			builder.append(token.charAt(0));
		}
		return builder.toString();
	}

	public static String imageName(Card card, boolean includeSetPath) {
		return imageBase(card, includeSetPath) + ".jpg";
	}

	public static String imageBase(Card card, boolean includeSetPath) {
		StringBuilder builder = new StringBuilder();

		if (card.getImageLangCode() == null) {
			builder.append("no-card-image.png");
		} else {
			builder.append(card.getImageLangCode());
			builder.append("/");
			if (includeSetPath) {
				builder.append(StringUtils.leftPad(card.getCrstSequence().toString(), 2, '0'));
				builder.append("-");
				builder.append(techNameToAcronym(card.getCrstTechName()));
				builder.append("/");
			}

			builder.append(StringUtils.leftPad(card.getNumber().toString(), 3, '0'));
			builder.append("-");
			builder.append(card.getTechName());
		}
		return builder.toString();
	}

	public static String imageBase(Faction faction) {
		return new FactionConverter().convertToDatabaseColumn(faction);
	}
}
