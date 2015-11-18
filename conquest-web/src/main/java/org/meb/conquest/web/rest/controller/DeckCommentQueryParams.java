package org.meb.conquest.web.rest.controller;

import java.util.List;

import javax.ws.rs.QueryParam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeckCommentQueryParams {

	@QueryParam("language")
	private String language;

	@QueryParam("snapshotId")
	private Long snapshotId;
	
	@QueryParam("snapshotIds")
	private List<Long> snapshotIds;
}
