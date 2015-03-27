package org.meb.conquest.db.query;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

import org.meb.conquest.db.model.CardType;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

@Getter
@Setter
public class CardQuery extends Query<Card> {

	private String text;
	private boolean searchInName = true;
	private boolean searchInTrait = true;
	private boolean searchInText = true;
	
	private Long deckWarlordId;
	private Faction deckFaction;
	
	@CriteriaIn("id")
	private Set<Long> ids;
	
	@CriteriaIn("type")
	private Set<CardType> types;
	
	@CriteriaIn("faction")
	private Set<Faction> factions;
	
	@CriteriaIn("crstId")
	private Set<Long> crstIds;
	
	@CriteriaIn("crstTechName")
	private Set<String> crstTechNames;
	
	public CardQuery() {
		super(new Card());
	}
	
	public CardQuery(Card example) {
		super(example);
	}
	
	public boolean isSearchDeckCards() {
		return deckWarlordId != null && deckFaction != null;
	}
}
