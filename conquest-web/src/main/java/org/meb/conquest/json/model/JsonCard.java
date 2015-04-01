package org.meb.conquest.json.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.db.converter.CardTypeConverter;
import org.meb.conquest.db.converter.FactionConverter;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.util.Utils;

@Getter
@Setter
@NoArgsConstructor
public class JsonCard {

	private Long id;
	private String techName;
	private String name;
	private String nameEn;
//	private String text;
	private String imageBase;
	private String faction;
	private String factionDisplay;
	private String type;
	private String typeDisplay;
	private String trait;
	private String keyword;
	private Integer number;
	private Integer quantity;
	private Integer cost;
	private Integer shield;
	private Integer command;
	private Integer attack;
	private Integer hitPoints;
	private Long warlordId;
	private Boolean loyal;
	private Boolean unique;
	private Long setId;
	private Integer startingHandSize;
	private Integer startingResources;
	private String illustrator;

	public JsonCard(Card card) {
		id = card.getId();
		techName = card.getTechName();
		name = card.getName();
		nameEn = card.getNameEn();
//		text = card.getText();
		imageBase = Utils.imageBase(card, true);
		faction = new FactionConverter().convertToDatabaseColumn(card.getFaction());
		factionDisplay = card.getFactionDisplay();
		type = new CardTypeConverter().convertToDatabaseColumn(card.getType());
		typeDisplay = card.getTypeDisplay();
		trait = card.getTrait();
		keyword = card.getKeyword();
		number = card.getNumber();
		quantity = card.getQuantity();
		cost = card.getCost();
		shield = card.getShield();
		command = card.getCommand();
		attack = card.getAttack();
		hitPoints = card.getHitPoints();
		warlordId = card.getWarlordId();
		loyal = card.getLoyal();
		unique = card.getUnique();
		setId = card.getCrstId();
		startingHandSize = card.getStartingHandSize();
		startingResources = card.getStartingResources();
		illustrator = card.getIllustrator();
	}
}
