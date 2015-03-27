package org.meb.conquest.json.model;

import java.util.Date;
import java.util.List;

import javax.ws.rs.QueryParam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JsonDeckFilter {

	@QueryParam("language")
	private String language;
	
	@QueryParam("pageNumber")
	private Integer pageNumber;
	
	@QueryParam("pageSize")
	private Integer pageSize;
	
	@QueryParam("createDateFrom")
	private Date createDateFrom;
	
	@QueryParam("createDateTo")
	private Date createDateTo;
	
	@QueryParam("modifyDateFrom")
	private Date modifyDateFrom;
	
	@QueryParam("modifyDateTo")
	private Date modifyDateTo;
	
	@QueryParam("factionPrimary")
	private List<String> factionPrimary;
	
	@QueryParam("factionSecondary")
	private List<String> factionSecondary;
	
	@QueryParam("setTechName")
	private List<String> setTechName;
	
	@QueryParam("warlordTechName")
	private List<String> warlordTechName;
	
	@QueryParam("username")
	private String username;
}
