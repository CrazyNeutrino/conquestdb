package org.meb.conquest.service;

import java.util.List;
import java.util.Set;

import org.meb.conquest.db.model.loc.Card;

public interface CardProvider {

	Card provide(Long id);
	
	List<Card> provide(Set<Long> ids);
}
