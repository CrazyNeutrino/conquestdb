package org.meb.conquest.deck.validation;

import org.apache.commons.collections4.Predicate;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.DeckMember;
import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CommanderStarblazeDeckValidator extends DeckValidatorBase {

	@NonNull
	@Getter
	private Predicate<Card> allowedCardPredicate;

	@Override
	protected void validateComposition(Deck deck) throws DeckException {

		int spaceMarines = 0;
		int astraMilitarum = 0;
		int eldar = 0;

		for (DeckMember member : deck.getDeckMembers()) {
			Card card = member.getCard();
			Faction faction = card.getFaction();

			if (faction == Faction.SPACE_MARINES) {
				spaceMarines++;
			} else if (faction == Faction.ELDAR) {
				eldar++;
			} else if (faction == Faction.ASTRA_MILITARUM) {
				astraMilitarum++;
			}
		}
		
		if (astraMilitarum > 0) {
			if (spaceMarines > 0) {
				DeckException de = buildDeckException(deck, "error.deck.comp.starblaze00");
				de.setErrorCoreParameter(0, String.valueOf(astraMilitarum));
				de.setErrorCoreParameter(1, String.valueOf(spaceMarines));
				throw de;
			} else if (eldar > 0) {
				DeckException de = buildDeckException(deck, "error.deck.comp.starblaze01");
				de.setErrorCoreParameter(0, String.valueOf(astraMilitarum));
				de.setErrorCoreParameter(1, String.valueOf(eldar));
				throw de;
			}
		}
	}
}
