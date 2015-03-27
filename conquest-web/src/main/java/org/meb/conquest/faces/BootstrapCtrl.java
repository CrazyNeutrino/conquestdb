package org.meb.conquest.faces;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.JsonProcessingException;
import org.meb.conquest.auth.AuthToken;
import org.meb.conquest.core.Cache;
import org.meb.conquest.db.model.loc.Domain;
import org.meb.conquest.db.util.Transformers;
import org.meb.conquest.json.JsonModelUtils;
import org.meb.conquest.json.JsonUtils;
import org.meb.conquest.json.model.JsonDomain;
import org.meb.conquest.json.model.JsonFaction;
import org.meb.conquest.service.RequestContext;

@Named
@RequestScoped
public class BootstrapCtrl {

	@Inject
	private AuthToken authToken;

	@Inject
	private RequestContext queryContext;

	@Inject
	private LocaleCtrl localeCtrl;

	@Inject
	private Cache cache;

	public String getCardsData() throws JsonProcessingException, IOException {
		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(localeCtrl.getLanguage());
		return JsonModelUtils.cardsAsJson(cache.loadCards());
	}

	public String getCardSetsData() throws JsonProcessingException, IOException {
		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(localeCtrl.getLanguage());
		return JsonModelUtils.cardSetsAsJson(cache.loadCardSets());
	}

	public String getFactionsData() throws JsonProcessingException, IOException {
		List<Domain> factions = getDomainDataRaw("faction");
		List<Domain> factionsShort = getDomainDataRaw("faction-short");
		Map<String, Domain> map = new HashMap<>();
		MapUtils.populateMap(map, factionsShort, Transformers.DOMA_VALUE);

		List<JsonFaction> jsonFactions = new ArrayList<>();
		for (Domain faction : factions) {
			String techName = faction.getValue();
			String name = faction.getDescription();
			String shortName = null;
			if (map.containsKey(techName)) {
				shortName = map.get(techName).getDescription();
			}
			jsonFactions.add(new JsonFaction(techName, name, shortName));
		}
		return JsonUtils.write(jsonFactions);
	}

	public String getCardTypesData() throws JsonProcessingException, IOException {
		List<Domain> factions = getDomainDataRaw("card-type");

		List<JsonFaction> jsonFactions = new ArrayList<>();
		for (Domain faction : factions) {
			String techName = faction.getValue();
			String name = faction.getDescription();
			String nameEn = faction.getDescriptionEn();
			String shortName = name.substring(0, 2);
			jsonFactions.add(new JsonFaction(techName, name, nameEn, shortName));
		}
		return JsonUtils.write(jsonFactions);
	}

	public String getDomainCardTypeData() throws JsonProcessingException, IOException {
		return getDomainData("card-type");
	}

	public String getDomainCardTypeShortData() throws JsonProcessingException, IOException {
		return getDomainData("card-type", new Processor<Domain, JsonDomain>() {

			@Override
			public JsonDomain process(Domain domain) {
				JsonDomain jsonDomain = new JsonDomain();
				jsonDomain.setValue(domain.getValue());
				jsonDomain.setDescription(domain.getDescription().substring(0, 2));
				return jsonDomain;
			}

		});
	}

	public String getDomainTraitData() throws JsonProcessingException, IOException {
		return getDomainData("trait");
	}

	public String getDomainKeywordData() throws JsonProcessingException, IOException {
		return getDomainData("keyword");
	}

	private String getDomainData(String name) throws JsonProcessingException, IOException {
		return getDomainData(name, null);
	}

	private List<Domain> getDomainDataRaw(String name) {
		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(localeCtrl.getLanguage());
		return cache.loadDomains(name);
	}

	private String getDomainData(String name, Processor<Domain, JsonDomain> processor) throws JsonProcessingException,
			IOException {

		List<JsonDomain> jsonDomains = new ArrayList<>();
		List<Domain> domains = getDomainDataRaw(name);
		for (Domain domain : domains) {
			JsonDomain jsonDomain;
			if (processor == null) {
				jsonDomain = new JsonDomain();
				jsonDomain.setValue(domain.getValue());
				jsonDomain.setDescription(domain.getDescription());
			} else {
				jsonDomain = processor.process(domain);
			}
			jsonDomains.add(jsonDomain);
		}

		return JsonUtils.write(jsonDomains);
	}

	public String getMessagesData() throws JsonProcessingException, IOException {

		queryContext.setUserId(authToken.getUserId());
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		ResourceBundle bundle = ResourceBundle.getBundle("resources/clientMessages", localeCtrl.getLocale());
		return JsonUtils.write(bundle);
	}
	
	public String getUser() throws JsonProcessingException, IOException {
		HashMap<String, String> map = new HashMap<>();
		String username = authToken.getUsername();
		if (StringUtils.isNoneBlank(username)) {
			map.put("username", username);
		}
		return JsonUtils.write(map);
	}
}
