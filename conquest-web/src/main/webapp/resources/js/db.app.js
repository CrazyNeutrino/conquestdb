var db = db || {};

db.static = db.static || {};
db.static.timezone = jstz.determine().name();
db.static.format = {
	en : {
		timestamp : "dddd, MMMM Do YYYY, h:mm:ss a"
	},
	pl : {
		timestamp : "dddd, Do MMMM YYYY, HH:mm:ss"
	},
	de : {
		timestamp : "dddd, Do MMMM YYYY, HH:mm:ss"
	}
};

//
// dict
//
db.dict = db.dict || {};
(function(_dict) {

	var IDX_CARD_SET_BY_ID = "cardSet#id";
	var IDX_CARD_SET_BY_TECH_NAME = "cardSet#techName";
	var IDX_CARD_TYPE_BY_TECH_NAME = "cardType#techName";
	var IDX_FACTION_BY_TECH_NAME = "faction#techName";
	var IDX_CARD_BY_ID = "card#id";
	var IDX_CARD_BY_TECH_NAME = "card#techName";
	var IDX_CARD_BY_NAME = "card#name";
	var IDX_CARD_BY_SET_NO_CARD_NO = "card#setNumber#cardNumber";
	var indexes = {};

	var GRP_CARD_BY_WARLORD_ID = "ss#warlordId";
	var groups = {};
	
	var deckCardTypes = [];
	var deckCards = [];
	
	_dict.reservedWords = {
		de: [],
		en: ['Combat Reaction', 'Combat Action', 'Deploy Action', 'Action', 'Forced Interrupt', 'Interrupt', 'Forced Reaction', 'Reaction', 'Battle'],
		pl: ['Akcja Wystawiania', 'Akcja', 'Akcja Walki', 'Wymuszone Przerwanie', 'Przerwanie', 'Wymuszona Reakcja', 'Reakcja', 'Bitwa']
	};

	/**
	 * @memberOf _dict
	 */
	_dict.initialize = function() {
		indexes[IDX_CARD_SET_BY_ID] = _.indexBy(_dict.cardSets, function(cardSet) {
			return cardSet.id;
		});
		indexes[IDX_CARD_SET_BY_TECH_NAME] = _.indexBy(_dict.cardSets, function(cardSet) {
			return cardSet.techName;
		});
		indexes[IDX_CARD_TYPE_BY_TECH_NAME] = _.indexBy(_dict.cardTypes, function(cardType) {
			return cardType.techName;
		});
		indexes[IDX_FACTION_BY_TECH_NAME] = _.indexBy(_dict.factions, function(faction) {
			return faction.techName;
		});
		indexes[IDX_CARD_BY_ID] = _.indexBy(_dict.cards, function(card) {
			return card.id;
		});
		indexes[IDX_CARD_BY_TECH_NAME] = _.indexBy(_dict.cards, function(card) {
			return card.techName;
		});
		indexes[IDX_CARD_BY_NAME] = _.indexBy(_dict.cards, function(card) {
			return card.name;
		});
		indexes[IDX_CARD_BY_SET_NO_CARD_NO] = _.indexBy(_dict.cards, function(card) {
			return _dict.findCardSet(card.crstId).number + '#' + card.number;
		});

		groups[GRP_CARD_BY_WARLORD_ID] = _.groupBy(_dict.cards, function(card) {
			return card.warlordId;
		});
		delete groups[GRP_CARD_BY_WARLORD_ID][undefined];
		_.each(Object.keys(groups[GRP_CARD_BY_WARLORD_ID]), function(key) {
			groups[GRP_CARD_BY_WARLORD_ID][key] = _.sortBy(groups[GRP_CARD_BY_WARLORD_ID][key],
					function(card) {
						return card.number;
					});
		});
		
		var deckCardTypesTN = [ 'army', 'attachment', 'event', 'support', 'synapse' ];

		_.each(_dict.cards, function(card) {
			var crst = _dict.findCardSet(card.crstId);
			card.setName = crst.name;
			card.setTechName = crst.techName;
			card.setNumber = crst.number;
			card.cycleTechName = crst.cycleTechName;

			if (card.text) {
				card.htmlText = db.util.toHtmlText(card.text);
				card.text = db.util.toPlainText(card.text);
			}
			
			if (_.contains(deckCardTypesTN, card.type)) {
				deckCards.push(card);
			}
		});
		
		deckCardTypes = _.filter(_dict.cardTypes, function(cardType) {
			return _.contains(deckCardTypesTN, cardType);
		});
	};
	
	_dict.findCardSet = function(idOrTechName) {
		var crst;
		if (_.isNumber(idOrTechName)) {
			crst = indexes[IDX_CARD_SET_BY_ID][parseInt(idOrTechName)];
		} else {
			crst = indexes[IDX_CARD_SET_BY_TECH_NAME][idOrTechName];
		}
		return _.clone(crst);
	};

	_dict.findCardType = function(techName) {
		return _.clone(indexes[IDX_CARD_TYPE_BY_TECH_NAME][techName]);
	};

	_dict.findFaction = function(techName) {
		return _.clone(indexes[IDX_FACTION_BY_TECH_NAME][techName]);
	};

	_dict.findCard = function(idOrTechName) {
		var card;
		if (_.isNumber(idOrTechName)) {
			card = indexes[IDX_CARD_BY_ID][parseInt(idOrTechName)];
		} else {
			card = indexes[IDX_CARD_BY_TECH_NAME][idOrTechName];
		}
		return _.clone(card);
	};

	_dict.findCardByName = function(name) {
		return _.clone(indexes[IDX_CARD_BY_NAME][name]);
	};
	
	_dict.findCardByNumber = function(setNumber, cardNumber) {
		return _.clone(indexes[IDX_CARD_BY_SET_NO_CARD_NO][setNumber + '#' + cardNumber]);
	};

	_dict.findSignSquadCards = function(warlordId) {
		return groups[GRP_CARD_BY_WARLORD_ID][warlordId];
	};

	_dict.getCards = function() {
		return _dict.cards;
	};
	
	_dict.getDeckCards = function() {
		return deckCards;
	};
	
	_dict.getCardTypes = function() {
		return _dict.cardTypes;
	};
	
	_dict.getDeckCardTypes = function() {
		return deckCardTypes;
	};

	_dict.getFactions = function() {
		return _dict.factions;
	};

	_dict.buildCardSetTree = function() {
		var tree = {
			nodes: []
		};
		var cycleNode = undefined;

		_.each(_.sortBy(_dict.cardSets, 'sequence'), function(cardSet) {
			var nodes;
			if (cardSet.cycleTechName) {
				if (_.isUndefined(cycleNode) || cycleNode.techName !== cardSet.cycleTechName) {
					cycleNode = {
						type: 'cycle',
						name: cardSet.cycleName,
						techName: cardSet.cycleTechName,
						nodes: []
					};
					tree.nodes.push(cycleNode);
				}
				nodes = cycleNode.nodes;
			} else {
				nodes = tree.nodes;
			}

			nodes.push({
				type: 'set',
				name: cardSet.name,
				techName: cardSet.techName
			});
		});
		return tree;
	};

	_dict.buildCardSetTrees = function() {
		var trees = [];
		var tree;
		_.each(_dict.buildCardSetTree().nodes, function(node) {
			if (node.type == 'set') {
				tree = {
					nodes: [ node ]
				};
				trees.push(tree);
			} else if (node.type == 'cycle') {
				if (tree) {
					tree.nodes.push(node);
					tree = undefined;
				} else {
					trees.push({
						nodes: [ node ]
					});
				}
			}
		});
		return trees;
	};
	
	_dict.buildWarlordTree = function() {
		var tree = {
			nodes: []
		};

		_.each(_.sortBy(_.where(_dict.cards, {
			type: 'warlord'
		}), function(warlord) {
			return warlord.factionDisplay + '#' + warlord.name;
		}), function(warlord) {
			tree.nodes.push({
				type: 'warlord',
				name: warlord.name,
				techName: warlord.techName
			});
		});
		return tree;
	};

})(db.dict);



//
// filter
//
db.filter = db.filter || {};

(function(_filter) {
	
	_filter.CARD_ATTRS = [ 'cost', 'shield', 'command', 'attack', 'hitPoints', 'setTechName', 
	                       'cycleTechName', 'name', 'trait', 'keyword', 'faction', 'type', 'anytext'];

	_filter.FD_TYPE_SET = 'set';
	_filter.FD_TYPE_SIMPLE = 'simple';
	_filter.FD_TYPE_RANGE = 'range';
	_filter.FD_TYPE_RANGE_STAT = 'range-stat';

	_filter.fds = [ {
		key : 'setTechName',
		queryStringKey : 'set',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'setTechName',
		queryStringKey : 'setTechName',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'cycleTechName',
		queryStringKey : 'cycle',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'cycleTechName',
		queryStringKey : 'cycleTechName',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'type',
		queryStringKey : 'type',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'faction',
		queryStringKey : 'faction',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'primaryFaction',
		queryStringKey : 'primaryFaction',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'secondaryFaction',
		queryStringKey : 'secondaryFaction',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'quantity',
		queryStringKey : 'quantity',
		type : _filter.FD_TYPE_SET,
		parseInteger : true
	}, {
		key : 'techName',
		queryStringKey : 'name',
		type : _filter.FD_TYPE_SIMPLE,
		oper : 'isnocase'
	}, {
		key : 'trait',
		queryStringKey : 'trait',
		type : _filter.FD_TYPE_SIMPLE,
		oper : 'likenocase'
	}, {
		key : 'keyword',
		queryStringKey : 'keyword',
		type : _filter.FD_TYPE_SIMPLE,
		oper : 'likenocase'
	}, {
		key : 'text',
		queryStringKey : 'text',
		type : _filter.FD_TYPE_SIMPLE,
		oper : 'likenocase'
	}, {
		key : 'cost',
		queryStringKey : 'cost',
		type : _filter.FD_TYPE_RANGE_STAT
	}, {
		key : 'shield',
		queryStringKey : 'shield',
		type : _filter.FD_TYPE_RANGE_STAT
	}, {
		key : 'command',
		queryStringKey : 'command',
		type : _filter.FD_TYPE_RANGE_STAT
	}, {
		key : 'attack',
		queryStringKey : 'attack',
		type : _filter.FD_TYPE_RANGE_STAT
	}, {
		key : 'hitPoints',
		queryStringKey : 'hp',
		type : _filter.FD_TYPE_RANGE_STAT
	}, {
		key : 'warlordTechName',
		queryStringKey : 'warlord',
		type : _filter.FD_TYPE_SET
	}, {
		key : 'createDateMin',
		queryStringKey : 'createDateMin',
		type : _filter.FD_TYPE_SIMPLE
	}, {
		key : 'createDateMax',
		queryStringKey : 'createDateMax',
		type : _filter.FD_TYPE_SIMPLE
	}, {
		key : 'modifyDateMin',
		queryStringKey : 'modifyDateMin',
		type : _filter.FD_TYPE_SIMPLE
	}, {
		key : 'modifyDateMax',
		queryStringKey : 'modifyDateMax',
		type : _filter.FD_TYPE_SIMPLE
	}, {
		key : 'publishDateMin',
		queryStringKey : 'publishDateMin',
		type : _filter.FD_TYPE_SIMPLE
	}, {
		key : 'publishDateMax',
		queryStringKey : 'publishDateMax',
		type : _filter.FD_TYPE_SIMPLE
	}, {
		key : 'username',
		queryStringKey : 'username',
		type : _filter.FD_TYPE_SIMPLE,
		oper : 'isnocase'
	} ];

	/**
	 * @memberOf _filter
	 */
	_filter.filterToObject = function(filter) {
		var obj = {};
		_.each(_filter.fds, function(fd) {
			var value = filter[fd.key];
			if (value) {
				if (fd.type == _filter.FD_TYPE_SET && _.isArray(value) && !_.isEmpty(value)) {
					obj[fd.queryStringKey] = value;
				} else if (fd.type == _filter.FD_TYPE_SIMPLE && !_.isEmpty(value)) {
					obj[fd.queryStringKey] = value;
				} else if (fd.type == _filter.FD_TYPE_RANGE && _.isArray(value)
						&& !_.isEmpty(value)) {
					var hasNonEmptyValue = _.some(value, function(v) {
						return !_.isUndefined(v) && v !== '';
					});
					if (hasNonEmptyValue) {
						obj[fd.queryStringKey] = value;
					}
				} else if (fd.type == _filter.FD_TYPE_RANGE_STAT && _.isArray(value)
						&& !_.isEmpty(value)) {
					if (value[2] === false) {
						obj[fd.queryStringKey] = value;
					}
				}
			}
		});

		return obj;
	};
	
	_filter.objectToFilter = function(obj) {
		var filter = {};
		if (obj) {
			_.each(_filter.fds, function(fd) {
				var value = obj[fd.queryStringKey];
				if (value) {
					if (fd.type === _filter.FD_TYPE_SET) {
						var stringValues = value;
						if (stringValues.length > 0) {
							var values = [];
							if (fd.parseInteger === true) {
								_.each(stringValues, function(stringValue) {
									values.push(parseInt(stringValue));
								});
							} else {
								values = stringValues;
							}
							filter[fd.key] = values;
						}
					} else if (fd.type === _filter.FD_TYPE_SIMPLE) {
						filter[fd.key] = value;
					} else if (fd.type === _filter.FD_TYPE_RANGE) {
						filter[fd.key] = value;
					} else if (fd.type === _filter.FD_TYPE_RANGE_STAT) {
						filter[fd.key] = [ parseInt(value[0]), parseInt(value[1]),
								value[2] == 'true' ];
					}
				}
			});
		}

		_.each(Object.keys(filter), function(key) {
			if (_.isString(filter[key])) {
				filter[key] = $.trim(filter[key]);
			}
			if (_.isEmpty(filter[key])) {
				delete filter[key];
			}
		});
		return filter;
	};

})(db.filter);

//
// util
//
//db.util = db.util || {};
//(function(_util) {
//
//	_util.toJSON = function(data) {
//		var json;
//		if (_.isArray(data)) {
//			json = [];
//			_.each(data, function(inputItem) {
//				json.push(inputItem.toJSON());
//			});
//		} else {
//			json = data.toJSON();
//		}
//		return json;
//	};
//
//	_util.membersGroupBy = function(data, groupKey, sortKey, groupFactory) {
//		var members;
//		if (data instanceof Backbone.Collection) {
//			members = data.models;
//		} else {
//			members = data;
//		}
//
//		members = members.filter(function(member) {
//			return member.get('quantity') > 0;
//		});
//
//		if (sortKey) {
//			members = this.membersSortBy(members, sortKey);
//		}
//
//		var membersHash = _.groupBy(members, function(member) {
//			if (groupKey == 'memberQuantity') {
//				return member.get('quantity');
//			} else {
//				return member.get('card')[groupKey];
//			}
//		});
//
//		var defaultGroupFactory = function(key, members) {
//			var title = key;
//			if (groupKey == 'memberQuantity') {
//				title = key + 'x';
//			} else if (groupKey == 'cost' && key == -1) {
//				title = 'X';
//			}
//			return {
//				title : title,
//				members : _util.toJSON(members),
//				quantity : _.reduce(members, function(totalQuantity, member) {
//					return totalQuantity + member.get('quantity');
//				}, 0)
//
//			};
//		};
//
//		var groups = [];
//		_.each(Object.keys(membersHash), function(key) {
//			groups.push((groupFactory || defaultGroupFactory)(key, membersHash[key]));
//		});
//		groups = groups.sort(function(one, two) {
//			return one.title.localeCompare(two.title);
//		});
//
//		return groups;
//	};
//
//	_util.membersSortBy = function(input, key) {
//		var members;
//		if (input instanceof Backbone.Collection) {
//			members = input.models;
//		} else {
//			members = input;
//		}
//
//		var keys;
//		if (_.isArray(key)) {
//			keys = key;
//		} else {
//			keys = [ key ];
//		}
//		keys.push('name');
//
//		var stringKeys = [ 'name', 'type', 'typeDisplay', 'faction', 'factionDisplay' ];
//		var numberKeys = [ 'memberQuantity', 'quantity', 'cost', 'shield', 'comamnd', 'attack',
//				'hitPoints' ];
//
//		var sorter = function(one, two) {
//			var result = 0;
//			$.each(keys, function(index, key) {
//				var property;
//				var descending;
//				if (_.isObject(key)) {
//					property = key.property;
//					descending = key.descending;
//				} else {
//					property = key;
//					descending = false;
//				}
//				var oneValue;
//				var twoValue;
//				if (property == 'memberQuantity') {
//					oneValue = one.get('quantity');
//					twoValue = two.get('quantity');
//				} else {
//					oneValue = one.get('card')[property];
//					twoValue = two.get('card')[property];
//				}
//
//				if (stringKeys.indexOf(property) > -1) {
//					result = oneValue.localeCompare(twoValue);
//				} else if (numberKeys.indexOf(property) > -1) {
//					result = (oneValue == twoValue ? 0 : (oneValue < twoValue ? -1 : 1));
//				}
//
//				if (result != 0) {
//					if (descending === true) {
//						result *= -1;
//					}
//					return false;
//				}
//			});
//
//			return result;
//		};
//
//		return members.sort(sorter);
//	};
//
//	_util.membersShuffle = function(members) {
//		var arr = [];
//		_.each(members.toJSON(), function(member) {
//			_.times(member.quantity, function(index) {
//				arr.push(member.card);
//			});
//		});
//		return _.shuffle(arr);
//	};
//
//	_util.buildMembersComparator = function(keys, faction) {
//		return _util.buildCardsComparator(keys, {
//			resolver : function(member) {
//				return member.get('card');
//			}
//		});
//	};
//
//	_util.buildMembersDefaultComparator = function(faction) {
//		return function(one, two) {
//			var result = 0;
//			var cardOne = one.get('card');
//			var cardTwo = two.get('card');
//
//			$.each([ 'warlord', 'synapse' ], function(index, type) {
//				if (cardOne.type == type && cardTwo.type != type) {
//					result = -1;
//					return false;
//				} else if (cardTwo.type == type && cardOne.type != type) {
//					result = 1;
//					return false;
//				} else {
//					result = 0;
//				}
//			});
//
//			if (cardOne.type == 'warlord') {
//				result = -1;
//			} else if (cardTwo.type == 'warlord') {
//				result = 1;
//			} else {
//				result = 0;
//			}
//
//			if (result == 0) {
//				if (cardOne.type == 'synapse') {
//					result = -1;
//				} else if (cardTwo.type == 'synapse') {
//					result = 1;
//				} else {
//					result = 0;
//				}
//			}
//
//			if (result == 0) {
//				if (_.isNumber(cardOne.warlordId) && _.isUndefined(cardTwo.warlordId)) {
//					result = -1;
//				} else if (_.isNumber(cardTwo.warlordId) && _.isUndefined(cardOne.warlordId)) {
//					result = 1;
//				} else {
//					result = 0;
//				}
//				;
//			}
//
//			if (result == 0) {
//				if (cardOne.faction == faction && cardTwo.faction != faction) {
//					result = -1;
//				} else if (cardTwo.faction == faction && cardOne.faction != faction) {
//					result = 1;
//				} else {
//					result = cardOne.factionDisplay.localeCompare(cardTwo.factionDisplay);
//				}
//			}
//
//			if (result === 0) {
//				result = cardOne.name.localeCompare(cardTwo.name);
//			}
//			return result;
//		};
//	};
//
//	_util.buildCardsComparator = function(keys, options) {
//		var options = options || {};
//
//		var validKeys = [];
//		_.each(keys, function(key) {
//			if (key && key !== 'none' && key !== 'default') {
//				validKeys.push(key);
//			}
//		});
//		validKeys.push('setNumber');
//		validKeys.push('number');
//
//		var stringKeys = [ 'name', 'type', 'typeDisplay', 'faction', 'factionDisplay', 'setName' ];
//		var numberKeys = [ 'memberQuantity', 'quantity', 'cost', 'shield', 'command', 'attack',
//				'hitPoints', 'setNumber', 'number' ];
//
//		return function(one, two) {
//			var result = 0;
//			$.each(validKeys, function(index, key) {
//				var property;
//				var descending;
//				if (_.isObject(key)) {
//					property = key.property;
//					descending = key.descending;
//				} else {
//					property = key;
//					descending = false;
//				}
//				var oneValue;
//				var twoValue;
//				if (property == 'memberQuantity') {
//					oneValue = one.get('quantity');
//					twoValue = two.get('quantity');
//				} else {
//					oneValue = (options.resolver ? options.resolver(one) : one)[property];
//					twoValue = (options.resolver ? options.resolver(two) : two)[property];
//				}
//
//				if (_.isUndefined(oneValue) && _.isUndefined(twoValue)) {
//					result = 0;
//				} else if (_.isUndefined(oneValue)) {
//					result = -1;
//				} else if (_.isUndefined(twoValue)) {
//					result = 1;
//				} else if (stringKeys.indexOf(property) > -1) {
//					result = oneValue.localeCompare(twoValue);
//				} else if (numberKeys.indexOf(property) > -1) {
//					result = (oneValue == twoValue ? 0 : (oneValue < twoValue ? -1 : 1));
//				}
//
//				if (result != 0) {
//					if (descending === true) {
//						result *= -1;
//					}
//					return false;
//				}
//			});
//
//			return result;
//		};
//	};
//	
//	_util.toTechName = function(input) {
//		// return input.toLowerCase().replace(/[\']/g,
//		// '').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\ +/g, '-');
//		return s(input).toLowerCase().slugify().value();
//	};
//
//})(db.util);

//
//app
//
db.app = db.app || {};
(function(_app) {
	
	var currentView;
	var userDeckListView;
	var cardSearchView;

	/**
	 * @memberOf _app
	 */
	_app.gotoView = function(view, options) {
		options = options || {};
		
		if (currentView) {
			currentView.remove();
		}
		currentView = view;
		
		$('.content').empty().append(currentView.render().el);
		if (options.navigate == true) {
			db.router.navigate('deck');
		}
		
		$('html,body').scrollTop(0);
		ga('set', 'page', db.static.root + options.route);
		ga('send', 'pageview');
	};
	
	_app.gotoUserDeckListView = function(options) {
		options = options || {};
		
		if (userDeckListView && currentView instanceof db.deck.UserDeckEditView) {
			userDeckListView.delegateEvents();
		} else {
			userDeckListView = new db.deck.UserDeckListView();
		}
		userDeckListView.messages = options.messages;
		_app.gotoView(userDeckListView, {
			route: 'deck',
			navigate: options.navigate
		});
	};
	
	_app.gotoUserDeckEditView = function(options) {
		options = options || {};

		var deckOptions = {};
		if (options.deckIdWithName) {
			var deckId = /^\w+/.exec(options.deckIdWithName)[0];
			if (/^\d+$/.test(deckId)) {
				deckId = parseInt(deckId);
			}
			
			deckOptions = {
				deckId: deckId,
				deck: userDeckListView ? userDeckListView.decks.findWhere({
					id: deckId
				}) : undefined
			};
		}

		_app.gotoView(new db.deck.UserDeckEditView(deckOptions), {
			route: 'deck/edit/' + deckOptions.deckId
		});
	};
	
	_app.gotoUserDeckImportView = function() {
		_app.gotoView(new db.deck.UserDeckImportView(), {
			route: 'deck/import'
		});
	};
	
	_app.gotoCardSearchView = function(options) {
		options = options || {};
		
		_app.gotoView(new db.card.CardSearchView(options), {
			route: 'card/search'
		});
	};
	
	_app.gotoCardView = function(options) {	
		var setNumber = parseInt(options.setNumber);
		var cardNumber = parseInt(options.cardNumber);
		var card = db.dict.findCardByNumber(setNumber, cardNumber);
		var url = db.util.toCardRelativeUrl(card);
		if (_.isUndefined(url)) {
			url = setNumber + '/' + cardNumber;
		}
		_app.gotoView(new db.card.CardView({
			setNumber: setNumber,
			cardNumber: cardNumber
		}), {
			route: 'card/' + url
		});
	};
	
})(db.app);

$(function() {
	
	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
		options.url = db.static.restPath + options.url + '?language=' + db.static.language;
		if (options.data) {
			options.data = options.data.replace(/%5B%5D/g, '');
		}
	});

	var Router = Backbone.Router.extend({
		routes: {
			'deck': 'viewDecks',
			'deck/edit': 'editDeck',
			'deck/edit/:id': 'editDeck',
			'deck/import': 'importDeck',
			'card/:setNumber/:cardNumber': 'viewCard',
			'card/search(?:queryString)': 'searchCards',
			'set/:setTechName': 'searchCardsByCardSet',
			'cycle/:cycleTechName': 'searchCardsByCycle'
		}
	});

	db.router = new Router();
	db.router.on('route:viewDecks', function() {
		db.app.gotoUserDeckListView();
	}).on('route:editDeck', function(deckIdWithName) {
		db.app.gotoUserDeckEditView({
			deckIdWithName: deckIdWithName
		});
	}).on('route:importDeck', function() {
		db.app.gotoUserDeckImportView();
	}).on('route:searchCards', function(queryString) {
		db.app.gotoCardSearchView({
			queryString: queryString
		});
	}).on('route:searchCardsByCardSet', function(setTechName) {
		db.app.gotoCardSearchView({
			setTechName: setTechName
		});
	}).on('route:searchCardsByCycle', function(cycleTechName) {
		db.app.gotoCardSearchView({
			cycleTechName: cycleTechName
		});
	}).on('route:viewCard', function(setNumber, cardNumber) {
		db.app.gotoCardView({
			setNumber: setNumber,
			cardNumber: cardNumber
		});
	});

	// register partials
	Handlebars.registerPartial({
		'pagination': Handlebars.templates['pagination'],
		'card-text-content': Handlebars.templates['card-text-content'],
		'common-ul-tree': Handlebars.templates['common-ul-tree'],
		'deck-actions': Handlebars.templates['deck-actions']
	});

	db.static.root = '/' + db.static.language + '/';

	Backbone.history.start({
		pushState: true,
		root: db.static.root
	});
});
