package org.meb.conquest.deck.helper;

import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class DeckHelperFactory {

	private DeckHelperFactory() {

	}

	public static DeckHelper buildDeckHelper(Card warlord) {
		DeckHelper helper;
		if (warlord.getFaction() == Faction.TYRANID) {
			helper = new TyranidDeckHelper(warlord);
		} else if (warlord.getTechName().equals("commander-starblaze")) {
			helper = new CommanderStarblazeDeckHelper(warlord);
		} else if (warlord.getTechName().equals("gorzod")) {
			helper = new GorzodDeckHelper(warlord);
		} else {
			helper = new RegularDeckHelper(warlord);
		}
		return helper;
	}
}
