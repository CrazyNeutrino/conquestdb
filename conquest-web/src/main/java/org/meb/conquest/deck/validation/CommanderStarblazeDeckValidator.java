package org.meb.conquest.deck.validation;

import java.util.HashSet;
import java.util.Set;

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

		Set<String> spaceMarines = new HashSet<>();
		Set<String> astraMilitarum = new HashSet<>();
		Set<String> eldar = new HashSet<>();

		for (DeckMember member : deck.getDeckMembers()) {
			Card card = member.getCard();
			Faction faction = card.getFaction();

			if (faction == Faction.SPACE_MARINES) {
				spaceMarines.add(card.getName());
			} else if (faction == Faction.ELDAR) {
				eldar.add(card.getName());
			} else if (faction == Faction.ASTRA_MILITARUM) {
				astraMilitarum.add(card.getName());
			}
		}
		
		if (astraMilitarum.size() > 0) {
			if (spaceMarines.size() > 0) {
				DeckException de = buildDeckException(deck, "error.deck.comp.starblaze00");
				de.setErrorCoreParameter(0, joinCardNames(astraMilitarum, 3));
				de.setErrorCoreParameter(1, joinCardNames(spaceMarines, 3));
				throw de;
			} else if (eldar.size() > 0) {
				DeckException de = buildDeckException(deck, "error.deck.comp.starblaze01");
				de.setErrorCoreParameter(0, joinCardNames(astraMilitarum, 3));
				de.setErrorCoreParameter(1, joinCardNames(eldar, 3));
				throw de;
			}
		}
	}
}
