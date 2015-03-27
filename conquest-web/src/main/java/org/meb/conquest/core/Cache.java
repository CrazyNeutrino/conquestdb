package org.meb.conquest.core;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.collections4.map.MultiValueMap;
import org.apache.commons.lang.StringUtils;
import org.meb.conquest.db.model.loc.Card;
import org.meb.conquest.db.model.loc.CardSet;
import org.meb.conquest.db.model.loc.Domain;
import org.meb.conquest.db.query.Query;
import org.meb.conquest.db.util.Transformers;
import org.meb.conquest.service.CardService;
import org.meb.conquest.service.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SessionScoped
public class Cache implements Serializable {

	private static final long serialVersionUID = 1139722680017088742L;
	private static final Logger log = LoggerFactory.getLogger(Cache.class);

	private static final String CARD_LIST_KEY = Card.class.getCanonicalName() + "#list";
	@SuppressWarnings("unused")
	private static final String CARD_MAP_KEY = Card.class.getCanonicalName() + "#map";
	private static final String CARD_SET_LIST_KEY = CardSet.class.getCanonicalName() + "#list";
	private static final String DOMAIN_KEY = Domain.class.getCanonicalName();

	@Inject
	private CardService service;

	@Inject
	private RequestContext queryContext;

	private Map<String, Object> cache;

	public Cache() {
		cache = new HashMap<String, Object>();
	}

	public List<Card> loadCards() {
		Query<Card> query = new Query<>(new Card());
		query.getSorting().setSortingAsc("crstSequence");
		query.getSorting().setSortingAsc("number");
		return loadList(createLocalizedKey(CARD_LIST_KEY), query);
	}
	
	public List<CardSet> loadCardSets() {
		Query<CardSet> query = new Query<>(new CardSet());
		query.getSorting().setSortingAsc("sequence");
		return loadList(createLocalizedKey(CARD_SET_LIST_KEY), query);
	}

	@SuppressWarnings("unchecked")
	public List<Domain> loadDomains(String name) {
		Query<Domain> query = new Query<>(new Domain());
		query.getSorting().setSortingAsc("domain");
		query.getSorting().setSortingAsc("sequence");
		query.getSorting().setSortingAsc("description");

		String key = createDomainKey(null);

		List<Domain> domains = (List<Domain>) cache.get(key);
		if (domains == null) {
			synchronized (key) {
				domains = (List<Domain>) cache.get(key);
				if (domains == null) {
					log.debug("cache miss: {}", key);
					domains = service.find(query);
					cache.put(key, domains);
					log.debug("cache put: {}, size: {}", key, domains.size());

					MultiValueMap<String, Domain> map = new MultiValueMap<String, Domain>();
					MapUtils.populateMap(map, domains, Transformers.DOMA_NAME);
					for (String domainName : map.keySet()) {
						Collection<Domain> subDomains = map.getCollection(domainName);
						String subKey = createDomainKey(domainName);
						cache.put(subKey, subDomains);
						log.debug("cache put: {}, size: {}", subKey, subDomains.size());
					}
				}
			}
		}

		return (List<Domain>) cache.get(createDomainKey(name));
	}

	private String createDomainKey(String name) {
		String key = DOMAIN_KEY + "#";

		if (StringUtils.isNotBlank(name)) {
			key += name;
		} else {
			key += "all";
		}
		
		return createLocalizedKey(key);
	}
	
	private String createLocalizedKey(String key) {
		return queryContext.getUserLanguage() + "#" + key;
	}

	@SuppressWarnings("unchecked")
	private <T> List<T> loadList(String key, Query<T> query) {
		if (key == null) {
			throw new IllegalArgumentException("Key is null");
		}

		List<T> result = (List<T>) cache.get(key);
		if (result == null) {
			synchronized (key) {
				result = (List<T>) cache.get(key);
				if (result == null) {
					log.debug("cache miss: {}", key);
					result = service.find(query);
					cache.put(key, result);
					log.debug("cache put: {}, size: {}", key, result.size());
				}
			}
		} else {
			log.debug("cache hit: {}", key);
		}

		return result;
	}
}
