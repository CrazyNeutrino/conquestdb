package org.meb.conquest.deck;

import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class WarlordDeckHelperFactory {

	private WarlordDeckHelperFactory() {

	}

	public static DeckHelper buildWarlordCardHelper(Card warlord) {
		DeckHelper helper;
		if (warlord.getFaction() == Faction.TYRANID) {
			helper = new TyranidDeckHelper(warlord);
		} else if (warlord.getTechName().equals("commander-starblaze")) {
			helper = new CommanderStarblazeDeckHelper(warlord);
		} else if (warlord.getTechName().equals("gorzod")) {
			helper = new GorzodDeckHelper(warlord);
		} else {
			helper = new StandardDeckHelper(warlord);
		}
		return helper;
	}
}
