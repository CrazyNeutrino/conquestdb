package org.meb.conquest.service;

import org.meb.conquest.db.model.DeckInterest;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeckInterestWrapper {

	private DeckInterest userDeckInterst;
	private DeckInterest totalDeckInterest;

	public DeckInterestWrapper(DeckInterest userDeckInterst, DeckInterest totalDeckInterest) {
		super();
		this.userDeckInterst = userDeckInterst;
		this.totalDeckInterest = totalDeckInterest;
	}
}
