package org.meb.conquest.db.query;

import java.util.Calendar;
import java.util.Date;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang3.time.DateUtils;
import org.meb.conquest.db.model.Deck;
import org.meb.conquest.db.model.Faction;

@Getter
@Setter
public class DeckQuery extends Query<Deck> {

	@CriteriaMin("createDate")
	private Date createDateMin;

	@CriteriaMax("createDate")
	private Date createDateMax;

	@CriteriaMin("modifyDate")
	private Date modifyDateMin;

	@CriteriaMax("modifyDate")
	private Date modifyDateMax;

	@CriteriaIn("id")
	private Set<Long> ids;

	@CriteriaIn(value = "id", negate = true)
	private Set<Long> excludeIds;

	@CriteriaIn("primaryFaction")
	private Set<Faction> primaryFactions;

	@CriteriaIn("secondaryFaction")
	private Set<Faction> secondaryFactions;

	@CriteriaIn("warlord.techName")
	private Set<String> warlordTechNames;

	private Long crstBitmap;
	private String crstMatchMode;
	private Boolean crstSkipCoreSetOnly;

	private boolean loadMembers;
	private boolean loadLinks;
	private boolean loadComments;
	private boolean loadSnapshots;

	public DeckQuery() {
		super(new Deck());
	}

	public DeckQuery(Deck example) {
		super(example);
	}

	public DeckQuery withMembers() {
		loadMembers = true;
		return this;
	}

	public DeckQuery withLinks() {
		loadLinks = true;
		return this;
	}

	public DeckQuery withComments() {
		loadComments = true;
		return this;
	}

	public DeckQuery withSnapshots() {
		loadSnapshots = true;
		return this;
	}

	public void expandCreateDateToFullDay() {
		if (createDateMin != null) {
			createDateMin = DateUtils.truncate(createDateMin, Calendar.DAY_OF_MONTH);
		}
		if (createDateMax != null) {
			createDateMax = DateUtils.ceiling(createDateMax, Calendar.DAY_OF_MONTH);
		}
	}
	
	public void expandModifyDateToFullDay() {
		if (modifyDateMin != null) {
			modifyDateMin = DateUtils.truncate(modifyDateMin, Calendar.DAY_OF_MONTH);
		}
		if (modifyDateMax != null) {
			modifyDateMax = DateUtils.ceiling(modifyDateMax, Calendar.DAY_OF_MONTH);
		}
	}
}
