package org.meb.conquest.util;

import org.meb.conquest.db.model.Faction;
import org.meb.conquest.db.model.loc.Card;

public class WarlordCardHelperFactory {

	private WarlordCardHelperFactory() {
		
	}
	
	public static WarlordCardHelper buildWarlordCardHelper(Card warlord) {
		WarlordCardHelper helper;
		if (warlord.getFaction() == Faction.TYRANID) {
			helper = new TyranidWarlordCardHelper(warlord);
		} else {
			helper = new StandardWarlordCardHelper(warlord);
		}
		return helper;
	}
}
