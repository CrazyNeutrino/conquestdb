package org.meb.conquest.web.rest.controller;

import java.util.Date;
import java.util.List;

import javax.ws.rs.QueryParam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.meb.conquest.db.query.Sorting;
import org.meb.conquest.db.query.Sorting.Direction;

@Getter
@Setter
@NoArgsConstructor
public class DeckQueryParams {

	@QueryParam("language")
	private String language;

	@QueryParam("pageNumber")
	private Integer pageNumber;

	@QueryParam("pageSize")
	private Integer pageSize;

	@QueryParam("createDateMin")
	@DateFormat("yyyy-MM-dd")
	private Date createDateMin;

	@QueryParam("createDateMax")
	@DateFormat("yyyy-MM-dd")
	private Date createDateMax;

	@QueryParam("modifyDateMin")
	@DateFormat("yyyy-MM-dd")
	private Date modifyDateMin;

	@QueryParam("modifyDateMax")
	@DateFormat("yyyy-MM-dd")
	private Date modifyDateMax;

	@QueryParam("publishDateMin")
	@DateFormat("yyyy-MM-dd")
	private Date publishDateMin;

	@QueryParam("publishDateMax")
	@DateFormat("yyyy-MM-dd")
	private Date publishDateMax;

	@QueryParam("primaryFaction")
	private List<String> primaryFaction;

	@QueryParam("secondaryFaction")
	private List<String> secondaryFaction;

	@QueryParam("setTechName")
	private List<String> crstTechNames;
	
	@QueryParam("setMatchMode")
	private String crstMatchMode;
	
	@QueryParam("setSkipCoreSetOnly")
	private Boolean crstSkipCoreSetOnly;

	@QueryParam("warlordTechName")
	private List<String> warlordTechNames;

	@QueryParam("username")
	private String username;
	
	@QueryParam("snapshotBaseId")
	private Long snapshotBaseId;
	
	@QueryParam("snapshotLatest")
	private Boolean snapshotLatest;

	@QueryParam("order")
	private List<String> orderItems;

	public Sorting orderItemsAsSorting() {
		Sorting sorting = new Sorting();
		if (orderItems != null) {
			for (String orderItem : orderItems) {
				String[] tokens = orderItem.split(",");
				if (tokens != null && tokens.length == 2) {
					String property = tokens[0];
					if ("publishDate".equals(property)) {
						property = "createDate";
					} else if ("warlord".equals(property)) {
						property = "warlord.name";
					} else if ("username".equals(property)) {
						property = "user.name";
					}
					sorting.setSorting(property, Direction.valueOf(tokens[1].toUpperCase()));
				}
			}
		}
		return sorting;
	}
}
