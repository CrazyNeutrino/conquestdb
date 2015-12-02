package org.meb.conquest.service.api;

import java.util.List;

import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.query.CardQuery;

public interface CardService extends SearchService {

	List<Card> findCards(CardQuery query);

}
