package org.meb.conquest.util;

import java.util.List;

import org.meb.conquest.db.model.loc.Card;

public interface WarlordCardHelper {

	List<Card> filterValidCards(List<Card> cards);
}
