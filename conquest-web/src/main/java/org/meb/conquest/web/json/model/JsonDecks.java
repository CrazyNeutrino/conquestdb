package org.meb.conquest.web.json.model;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JsonDecks {

	private List<JsonDeck> decks;
	private Long total;
	private Integer pageNumber;
	private Integer pageSize;
}
