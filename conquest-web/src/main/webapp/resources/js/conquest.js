var conquest = conquest || {};

conquest.static = conquest.static || {};
conquest.static.timezone = jstz.determine().name();
conquest.static.format = {
	en: {
		timestamp: "dddd, MMMM Do YYYY, h:mm:ss a"
	},
	pl: {
		timestamp: "dddd, Do MMMM YYYY, HH:mm:ss"
	},
	de: {
		timestamp: "dddd, Do MMMM YYYY, HH:mm:ss"
	}
};

//
// dict
//
conquest.dict = conquest.dict || {};
(function(_dict) {

	var IDX_CARD_BY_ID = "card#id";
	var IDX_CARD_BY_NAME = "card#name";
	var IDX_CARD_BY_SET_NO_CARD_NO = "card#setNumber#cardNumber";
	var IDX_SET_BY_ID = "set#id";
	var IDX_FACTION_BY_TECH_NAME = "faction#techName";
	var IDX_CARD_TYPE_BY_TECH_NAME = "cardType#techName";
	var indexes = {};

	var GRP_CARD_BY_WARLORD_ID = "ss#warlordId";
	var groups = {};

	_dict.initialize = function() {
		indexes[IDX_SET_BY_ID] = _.indexBy(_dict.sets, function(set) {
			return set.id;
		});
		indexes[IDX_CARD_BY_ID] = _.indexBy(_dict.cards, function(card) {
			return card.id;
		});
		indexes[IDX_CARD_BY_NAME] = _.indexBy(_dict.cards, function(card) {
			return card.name;
		});
		indexes[IDX_FACTION_BY_TECH_NAME] = _.indexBy(_dict.factions, function(faction) {
			return faction.techName;
		});
		indexes[IDX_CARD_TYPE_BY_TECH_NAME] = _.indexBy(_dict.cardTypes, function(cardType) {
			return cardType.techName;
		});
		indexes[IDX_CARD_BY_SET_NO_CARD_NO] = _.indexBy(_dict.cards, function(card) {
			return _dict.findSet(card.setId).number + '#' + card.number;
		});

		groups[GRP_CARD_BY_WARLORD_ID] = _.groupBy(_dict.cards, function(card) {
			return card.warlordId;
		});
		delete groups[GRP_CARD_BY_WARLORD_ID][undefined];
		_.each(Object.keys(groups[GRP_CARD_BY_WARLORD_ID]), function(key) {
			groups[GRP_CARD_BY_WARLORD_ID][key] = _.sortBy(groups[GRP_CARD_BY_WARLORD_ID][key], function(card) {
				return card.number;
			});
		});

		_.each(_dict.cards, function(card) {
			var set = _dict.findSet(card.setId);
			card.setName = set.name;
			card.setTechName = set.techName;
			card.setNumber = set.number;
		});
	};

	_dict.findSet = function(id) {
		return indexes[IDX_SET_BY_ID][id];
	};

	_dict.findCard = function(id) {
		return indexes[IDX_CARD_BY_ID][id];
	};

	_dict.findCardByName = function(name) {
		return indexes[IDX_CARD_BY_NAME][name];
	};

	_dict.findCardType = function(techName) {
		return indexes[IDX_CARD_TYPE_BY_TECH_NAME][techName];
	};

	_dict.getCardTypes = function() {
		return _.clone(indexes[IDX_CARD_BY_SET_NO_CARD_NO]);
	};

	_dict.findFaction = function(techName) {
		return indexes[IDX_FACTION_BY_TECH_NAME][techName];
	};

	_dict.getFactions = function() {
		return _.clone(indexes[IDX_FACTION_BY_TECH_NAME]);
	};

	_dict.findCardByNumber = function(setNumber, cardNumber) {
		return indexes[IDX_CARD_BY_SET_NO_CARD_NO][setNumber + '#' + cardNumber];
	};

	_dict.findSignSquadCards = function(warlordId) {
		return groups[GRP_CARD_BY_WARLORD_ID][warlordId];
	};

	_dict.buildCardSetTree = function() {
		var tree = {
			nodes: []
		};
		var cycleNode = undefined;

		_.each(_.sortBy(_dict.sets, 'sequence'), function(set) {
			var nodes;
			if (set.cycleTechName) {
				if (_.isUndefined(cycleNode) || cycleNode.techName !== set.cycleTechName) {
					cycleNode = {
						type: 'cycle',
						name: set.cycleName,
						techName: set.cycleTechName,
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
				name: set.name,
				techName: set.techName
			});
		});
		return tree;
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

})(conquest.dict);

//
// model
//
conquest.model = conquest.model || {};
(function(_model) {

	_model.Card = Backbone.Model.extend({
		urlRoot: '/card',
	});

	_model.Cards = Backbone.Collection.extend({
		url: '/card',
		model: _model.Card
	});

	_model.DeckMember = Backbone.Model.extend({
		parse: function(response) {
			response.card = _.clone(conquest.dict.findCard(parseInt(response.cardId)));
			response.fixedQuantity = response.card.type === 'warlord' || _.isNumber(response.card.warlordId);
			response.fixedMaxQuantity = response.card.type === 'warlord' || response.card.type === 'synapse' || _.isNumber(response.card.warlordId);
			return response;
		}
	});

	_model.DeckMembers = Backbone.Collection.extend({
		model: _model.DeckMember,
		computeTotalQuantity: function() {
			var total = 0;
			this.each(function(member) {
				total += member.get('quantity');
			});
			return total;
		},
		computeTotalCost: function() {
			var total = 0;
			this.each(function(member) {
				total += member.get('quantity') * member.get('card').cost;
			});
			return total;
		},
		computeStats: function() {
			var stats = {};
			var keys = ['cost', 'shield', 'command', 'attack', 'hitPoints'];

			_.each(keys, function(key) {
				stats[key] = {
					sum: 0,
					quantity: 0,
					quantityX: 0
				};
			});

			this.each(function(member) {
				var quantity = member.get('quantity');
				if (quantity > 0) {
					var card = member.get('card');
					_.each(keys, function(key) {
						if (!_.isUndefined(card[key])) {
							if (card[key] === -1) {
								stats[key].quantityX += quantity;
							} else {
								stats[key].sum += card[key] * quantity;
								stats[key].quantity += quantity;
							}
						}
					});
				}
			});

			_.each(keys, function(key) {
				if (stats[key].quantity > 0) {
					stats[key].average = Math.round(stats[key].sum / stats[key].quantity * 100) / 100;
				}
			});

			return stats;
		},
		adjustQuantities: function(csQuantity) {
			this.each(function(member) {
				if (member.get('fixedMaxQuantity') === false) {
					var availableQuantity = Math.min(3, member.get('card').quantity * csQuantity);
					member.set({
						availableQuantity: availableQuantity
					});
					member.set({
						quantity: Math.min(member.get('quantity'), availableQuantity)
					}, {
						batchChange: true
					});
				}
			});
		}
	});

	_model.DeckHistoryItem = Backbone.Model;

	_model.DeckHistory = Backbone.Collection.extend({
		model: _model.DeckHistoryItem
	});

	_model.DeckLink = Backbone.Model.extend({
		initialize: function(attributes, options) {
			if (options) {
				this.owner = options.owner;
			}
		},
		urlRoot: function() {
			return _.result(this.owner, 'url', '') + '/link';
		},
	});

	_model.DeckLinks = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.owner = options.owner;
		},
		url: function() {
			return _.result(this.owner, 'url', '') + '/link';
		},
		model: function(attributes, options) {
			return new _model.DeckLink(attributes, options);
		}
	});

	_model.DeckComment = Backbone.Model.extend({
		initialize: function(attributes, options) {
			if (options) {
				this.owner = options.owner;
			}
		},
		urlRoot: function() {
			return _.result(this.owner, 'url', '') + '/comment';
		},
		validate: function(attributes, options) {
			var value = $.trim(attributes.value);
			if (value.length == 0) {
				return 'error.deck.comment.empty';
			}
		}
	});

	_model.DeckComments = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.owner = options.owner;
		},
		url: function() {
			return _.result(this.owner, 'url', '') + '/comment';
		},
		model: function(attributes, options) {
			return new _model.DeckComment(attributes, options);
		}
	});

	_model.Deck = Backbone.Model.extend({
		history: new _model.DeckHistory(),
		initialize: function(attributes) {
			attributes.type = attributes.type || 'base';
		},
		parse: function(response) {			
			response.warlord = _.clone(conquest.dict.findCard(parseInt(response.warlordId)));
			response.createDateMillis = moment.tz(response.createDate, conquest.static.timezone).valueOf();
			response.modifyDateMillis = moment.tz(response.modifyDate, conquest.static.timezone).valueOf();
			response.members = new _model.DeckMembers(response.members, {
				parse: true,
				comparator: conquest.util.buildMembersDefaultComparator(response.warlord.faction)
			});
			response.links = new _model.DeckLinks(response.links, {
				parse: true,
				owner: this
			});
			response.links.on('add', function(link) {
				link.owner = this.owner;
			}).on('remove', function(link) {
				link.owner = undefined;
			});
			response.comments = new _model.DeckComments(response.comments, {
				parse: true,
				owner: this
			});
			response.comments.on('add', function(comment) {
				comment.owner = this.owner;
			}).on('remove', function(comment) {
				comment.owner = undefined;
			});
			response.members.each(function(member) {
				var cardQuantity = member.get('card').quantity;
				var availableQuantity;
				if (member.get('fixedMaxQuantity') === true) {
					availableQuantity = cardQuantity;
				} else {
					if (_.isUndefined(response.configCsQuantity)) {
						response.configCsQuantity = 3;
					}
					availableQuantity = Math.min(3, cardQuantity * response.configCsQuantity);
				}
				member.set({
					availableQuantity: availableQuantity
				});
			});
			response.filteredMembers = new _model.DeckMembers();
			response.warlord = _.clone(conquest.dict.findCard(parseInt(response.warlordId)));

			return response;
		},
		toJSON: function() {
			var json = _model.Deck.__super__.toJSON.apply(this, arguments);
			if (json.members instanceof Backbone.Collection) {
				json.members = json.members.toJSON();
			}
			if (json.links instanceof Backbone.Collection) {
				json.links = json.links.toJSON();
			}
			if (json.snapshots instanceof Backbone.Collection) {
				json.snapshots = json.snapshots.toJSON();
			}
			// if (json.relatedSnapshots instanceof Backbone.Collection) {
			// 	json.relatedSnapshots = json.relatedSnapshots.toJSON();
			// }
			if (json.comments instanceof Backbone.Collection) {
				json.comments = json.comments.toJSON();
			}
			if (json.warlord instanceof Backbone.Model) {
				json.warlord = json.warlord.toJSON();
			}
			return json;
		},
		validate: function(attributes, options) {
			var name = $.trim(attributes.name);
			if (name.length == 0) {
				return 'error.deck.name.empty';
			}
			// if (attributes.type == 'base') {
			// 	var other = conquest.getDeck(name);
			// 	var id = attributes.id;
			// 	if (other && (_.isUndefined(id) || other.get('id') !== id)) {
			// 		return 'error.deck.name.duplicate';
			// 	}
			// }
		},
		computeTotalQuantity: function() {
			var total = 0;
			if (this.get('members') instanceof Backbone.Collection) {
				total = this.get('members').computeTotalQuantity();
			}
			return total;
		},
		computeTotalCost: function() {
			var total = 0;
			if (this.get('members') instanceof Backbone.Collection) {
				total = this.get('members').computeTotalCost();
			}
			return total;
		},
		computeStats: function() {
			var stats = {};
			if (this.get('members') instanceof Backbone.Collection) {
				stats = this.get('members').computeStats();
			}
			return stats;
		},
		adjustQuantities: function() {
			if (this.get('members') instanceof Backbone.Collection) {
				this.get('members').adjustQuantities(this.get('configCsQuantity'));
			}
		},
		getBackupJson: function() {
			var json = this.toJSON();
			delete json.techName;
			delete json.filteredMembers;
			delete json.createDate;
			delete json.modifyDate;
			delete json.warlord;
			delete json.snapshots;
			// delete json.relatedSnapshots;
			delete json.links;
			delete json.comments;
			var members = json.members;
			json.members = [];
			_.each(members, function(member) {
				if (member.quantity && member.quantity > 0) {
					delete member.availableQuantity;
					delete member.fixedQuantity;
					delete member.fixedMaxQuantity;
					delete member.card;
					json.members.push(member);
				}
			});
			return json;
		}
	});

	_model.Decks = Backbone.Collection.extend({
		initialize: function() {
			this.config = new Backbone.Model();
		},
		parse: function(response) {
			var decks;			
			if (_.isArray(response)) {
				decks = response;				
			} else {
				this.config.set({
					total: response.total,
					pageNumber: response.pageNumber,
					pageSize: response.pageSize
				});
				decks = response.decks;
			}
			return decks;
		}
	});

	_model.PublicDeck = _model.Deck.extend({
		urlRoot: '/deck/public',
		parse: function(response) {
			var r = _model.PrivateDeck.__super__.parse.apply(this, [response]);
			if (_.isEmpty(r.snapshots)) {
				r.snapshots = new _model.PublicDecks();
			} else {
				r.snapshots = new _model.PublicDecks(r.snapshots, {
					parse: true,
					comparator: function(model) {
						return model.get('createDateMillis') * -1;
					}
				});
			}
			return r;
		}
	});

	_model.PublicDecks = _model.Decks.extend({
		url: '/deck/public',
		model: _model.PublicDeck		
	});

	_model.PrivateDeck = _model.Deck.extend({
		urlRoot: '/deck',
		sync: function(method, source, options) {
			console.info('sync: ' + method);
			var target = source;
			if (method === 'create' || method === 'update') {
				var sourceJson = source.toJSON();
				
				delete sourceJson.warlord;
				delete sourceJson.createDate;
				delete sourceJson.modifyDate;
				delete sourceJson.createDateMillis;
				delete sourceJson.modifyDateMillis;
				delete sourceJson.snapshots;
				delete sourceJson.relatedSnapshots;
				delete sourceJson.links;
				delete sourceJson.comments;
				delete sourceJson.filteredMembers;
				
				if (_.isArray(sourceJson.members)) {
					_.each(sourceJson.members, function(member) {
						delete member.card;
						delete member.fixedQuantity;
						delete member.fixedMaxQuantity;
						delete member.availableQuantity;
					});
				}
				target = new _model.PrivateDeck(sourceJson);
			}

			_model.PrivateDeck.__super__.sync.apply(this, [method, target, options]);
		},
		parse: function(response) {			
			var r = _model.PrivateDeck.__super__.parse.apply(this, [response]);
			if (_.isEmpty(r.snapshots)) {
				r.snapshots = new _model.PrivateDecks();
			} else {
				r.snapshots = new _model.PrivateDecks(r.snapshots, {
					parse: true,
					comparator: function(model) {
						return model.get('createDateMillis') * -1;
					}
				});
			}
			return r;
		}
	});

	_model.PrivateDecks = _model.Decks.extend({
		url: '/deck',
		model: _model.PrivateDeck
	});
	
})(conquest.model);

//
// filter
//
conquest.filter = conquest.filter || {};

(function(_filter) {

	_filter.FD_TYPE_SET = 'set';
	_filter.FD_TYPE_SIMPLE = 'simple';
	_filter.FD_TYPE_RANGE = 'range';
	_filter.FD_TYPE_RANGE_STAT = 'range-stat';

	_filter.fds = [{
		key: 'setTechName',
		queryStringKey: 'set',
		type: _filter.FD_TYPE_SET
	}, {
		key: 'type',
		queryStringKey: 'type',
		type: _filter.FD_TYPE_SET
	}, {
		key: 'faction',
		queryStringKey: 'faction',
		type: _filter.FD_TYPE_SET
	}, {
		key: 'primaryFaction',
		queryStringKey: 'primaryFaction',
		type: _filter.FD_TYPE_SET
	}, {
		key: 'secondaryFaction',
		queryStringKey: 'secondaryFaction',
		type: _filter.FD_TYPE_SET
	}, {
		key: 'quantity',
		queryStringKey: 'quantity',
		type: _filter.FD_TYPE_SET,
		parseInteger: true
	}, {
		key: 'techName',
		queryStringKey: 'name',
		type: _filter.FD_TYPE_SIMPLE,
		oper: 'isnocase'
	}, {
		key: 'trait',
		queryStringKey: 'trait',
		type: _filter.FD_TYPE_SIMPLE,
		oper: 'likenocase'
	}, {
		key: 'keyword',
		queryStringKey: 'keyword',
		type: _filter.FD_TYPE_SIMPLE,
		oper: 'likenocase'
	}, {
		key: 'text',
		queryStringKey: 'text',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'cost',
		queryStringKey: 'cost',
		type: _filter.FD_TYPE_RANGE_STAT
	}, {
		key: 'shield',
		queryStringKey: 'shield',
		type: _filter.FD_TYPE_RANGE_STAT
	}, {
		key: 'command',
		queryStringKey: 'command',
		type: _filter.FD_TYPE_RANGE_STAT
	}, {
		key: 'attack',
		queryStringKey: 'attack',
		type: _filter.FD_TYPE_RANGE_STAT
	}, {
		key: 'hitPoints',
		queryStringKey: 'hp',
		type: _filter.FD_TYPE_RANGE_STAT
	}, {
		key: 'warlordTechName',
		queryStringKey: 'warlord',
		type: _filter.FD_TYPE_SET
	}, {
		key: 'createDateMin',
		queryStringKey: 'createDateMin',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'createDateMax',
		queryStringKey: 'createDateMax',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'modifyDateMin',
		queryStringKey: 'modifyDateMin',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'modifyDateMax',
		queryStringKey: 'modifyDateMax',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'publishDateMin',
		queryStringKey: 'publishDateMin',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'publishDateMax',
		queryStringKey: 'publishDateMax',
		type: _filter.FD_TYPE_SIMPLE
	}, {
		key: 'username',
		queryStringKey: 'username',
		type: _filter.FD_TYPE_SIMPLE,
		oper: 'isnocase'
	}];

	_filter.filterToQueryString = function(filter) {
		var parts = [];
		_.each(_filter.fds, function(fd) {
			var value = filter[fd.key];
			if (value) {
				if (fd.type == _filter.FD_TYPE_SET && _.isArray(value) && !_.isEmpty(value)) {
					parts.push(fd.queryStringKey + '=' + value.join());
				} else if (fd.type == _filter.FD_TYPE_SIMPLE && !_.isEmpty(value)) {
					parts.push(fd.queryStringKey + '=' + value);
				} else if (fd.type == _filter.FD_TYPE_RANGE && _.isArray(value) && !_.isEmpty(value)) {
					var hasNonEmptyValue = _.some(value, function(v) {
						return !_.isUndefined(v) && v !== '';
					});
					if (hasNonEmptyValue) {
						parts.push(fd.queryStringKey + '=' + value.join());
					}
				} else if (fd.type == _filter.FD_TYPE_RANGE_STAT && _.isArray(value) && !_.isEmpty(value)) {
					if (value[2] === false) {
						parts.push(fd.queryStringKey + '=' + value.join());	
					}
				}
			}
		});

		var queryString = undefined;
		if (parts.length > 0) {
			queryString = parts.join('&');
		}
		return queryString;
	};

	_filter.queryStringToFilter = function(queryString) {
		var filter = {};
		if (queryString) {
			var map = {};
			_.each(queryString.split('&'), function(part) {
				var keyValue = part.split('=');
				map[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
			});
			_.each(_filter.fds, function(fd) {
				var value = map[fd.queryStringKey];
				if (value) {
					if (fd.type === _filter.FD_TYPE_SET) {
						var stringValues = value.split(',');
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
						filter[fd.key] = value.split(',');
					} else if (fd.type === _filter.FD_TYPE_RANGE_STAT) {
						var values = value.split(',')
						filter[fd.key] = [ parseInt(values[0]), parseInt(values[1]), values[2] == 'true' ];
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

})(conquest.filter);

//
// util
//
conquest.util = conquest.util || {};
(function(_util) {
	
	_util.toJSON = function(data) {
		var json;
		if (_.isArray(data)) {
			json = [];
			_.each(data, function(inputItem) {
				json.push(inputItem.toJSON());
			});
		} else {
			json = data.toJSON();
		}
		return json;
	};

	_util.membersGroupBy = function(data, groupKey, sortKey, groupFactory) {
		var members;
		if (data instanceof Backbone.Collection) {
			members = data.models;
		} else {
			members = data;
		}

		members = members.filter(function(member) {
			return member.get('quantity') > 0;
		});

		if (sortKey) {
			members = this.membersSortBy(members, sortKey);
		}

		var membersHash = _.groupBy(members, function(member) {
			if (groupKey == 'memberQuantity') {
				return member.get('quantity');
			} else {
				return member.get('card')[groupKey];
			}
		});

		var defaultGroupFactory = function(key, members) {
			var title = key;
			if (groupKey == 'memberQuantity') {
				title = key + 'x';
			} else if (groupKey == 'cost' && key == -1) {
				title = 'X';				
			}
			return {
				title: title,
				members: _util.toJSON(members),
				quantity: _.reduce(members, function(totalQuantity, member) {
					return totalQuantity + member.get('quantity');
				}, 0)

			};
		};
		
		var groups = [];
		_.each(Object.keys(membersHash), function(key) {
			groups.push((groupFactory || defaultGroupFactory)(key, membersHash[key]));
		});
		groups = groups.sort(function(one, two) {
			return one.title.localeCompare(two.title);
		});

		return groups;
	};

	_util.membersSortBy = function(input, key) {
		var members;
		if (input instanceof Backbone.Collection) {
			members = input.models;
		} else {
			members = input;
		}

		var keys;
		if (_.isArray(key)) {
			keys = key;
		} else {
			keys = [ key ];
		}
		keys.push('name');

		var stringKeys = ['name', 'type', 'typeDisplay', 'faction', 'factionDisplay'];
		var numberKeys = ['memberQuantity', 'quantity', 'cost', 'shield', 'comamnd', 'attack', 'hitPoints'];

		var sorter = function(one, two) {
			var result = 0;
			$.each(keys, function(index, key) {
				var property;
				var descending;
				if (_.isObject(key)) {
					property = key.property;
					descending = key.descending;
				} else {
					property = key;
					descending = false;
				}
				var oneValue;
				var twoValue;
				if (property == 'memberQuantity') {
					oneValue = one.get('quantity');
					twoValue = two.get('quantity');
				} else {
					oneValue = one.get('card')[property];
					twoValue = two.get('card')[property];
				}

				if (stringKeys.indexOf(property) > -1) {
					result = oneValue.localeCompare(twoValue);
				} else if (numberKeys.indexOf(property) > -1) {					
					result = (oneValue == twoValue ? 0 : (oneValue < twoValue ? -1 : 1));
				}

				if (result != 0) {
					if (descending === true) {
						result *= -1;
					}
					return false;
				}
			});

			return result;
		};

		return members.sort(sorter);
	};

	_util.membersShuffle = function(members) {
		var arr = [];
		_.each(members.toJSON(), function(member) {
			_.times(member.quantity, function(index) {
				arr.push(member.card);
			});
		});
		return _.shuffle(arr);
	};

	_util.buildMembersComparator = function(keys, faction) {
		return _util.buildCardsComparator(keys, {
			resolver: function(member) {
				return member.get('card');
			}
		});
	};

	_util.buildMembersDefaultComparator = function(faction) {
		return function(one, two) {
			var result = 0;
			var cardOne = one.get('card');
			var cardTwo = two.get('card');

			$.each(['warlord', 'synapse'], function(index, type) {
				if (cardOne.type == type && cardTwo.type != type) {
					result = -1;
					return false;
				} else if (cardTwo.type == type && cardOne.type != type) {
					result = 1;
					return false;
				} else {
					result = 0;
				}
			});

			if (cardOne.type == 'warlord') {
				result = -1;
			} else if (cardTwo.type == 'warlord') {
				result = 1;
			} else {
				result = 0;
			}

			if (result == 0) {
			if (cardOne.type == 'synapse') {
				result = -1;
			} else if (cardTwo.type == 'synapse') {
				result = 1;
			} else {
				result = 0;
			}
		}

			if (result == 0) {
				if (_.isNumber(cardOne.warlordId) && _.isUndefined(cardTwo.warlordId)) {
					result = -1;
				} else if (_.isNumber(cardTwo.warlordId) && _.isUndefined(cardOne.warlordId)) {
					result = 1;
				} else {
					result = 0;
				};
			}
			
			if (result == 0) {
				if (cardOne.faction == faction && cardTwo.faction != faction) {
					result = -1;
				} else if (cardTwo.faction == faction && cardOne.faction != faction) {
					result = 1;
				} else {
					result = cardOne.factionDisplay.localeCompare(cardTwo.factionDisplay);
				}
			}

			if (result === 0) {
				result = cardOne.name.localeCompare(cardTwo.name);
			}
			return result;
		};
	};

	_util.buildCardsComparator = function(keys, options) {
		var options = options || {};

		var validKeys = [];
		_.each(keys, function(key) {
			if (key && key !== 'none' && key !== 'default') {
				validKeys.push(key);
			}
		});
		validKeys.push('setNumber');
		validKeys.push('number');

		var stringKeys = ['name', 'type', 'typeDisplay', 'faction', 'factionDisplay', 'setName'];
		var numberKeys = ['memberQuantity', 'quantity', 'cost', 'shield', 'command', 'attack', 'hitPoints', 'setNumber', 'number'];

		return function(one, two) {				
			var result = 0;
			$.each(validKeys, function(index, key) {
				var property;
				var descending;
				if (_.isObject(key)) {
					property = key.property;
					descending = key.descending;
				} else {
					property = key;
					descending = false;
				}
				var oneValue;
				var twoValue;
				if (property == 'memberQuantity') {
					oneValue = one.get('quantity');
					twoValue = two.get('quantity');
				} else {
					oneValue = (options.resolver ? options.resolver(one) : one)[property];
					twoValue = (options.resolver ? options.resolver(two) : two)[property];
				}

				if (_.isUndefined(oneValue) && _.isUndefined(twoValue)) {
					result = 0;
				} else if (_.isUndefined(oneValue)) {
					result = -1;
				} else if (_.isUndefined(twoValue)) {
					result = 1;
				} else if (stringKeys.indexOf(property) > -1) {
					result = oneValue.localeCompare(twoValue);
				} else if (numberKeys.indexOf(property) > -1) {					
					result = (oneValue == twoValue ? 0 : (oneValue < twoValue ? -1 : 1));
				}

				if (result != 0) {
					if (descending === true) {
						result *= -1;
					}
					return false;
				}
			});

			return result;
		};
	};

	_util.toCardUrl = function(input) {
		return '/' + conquest.static.language + '/card/' + _util.toCardRelativeUrl(input);
	};

	_util.toCardRelativeUrl = function(input) {
		var card;
		if (_.isNumber(input)) {
			card = conquest.dict.findCard(input);
		} else {
			card = input;
		}
		
		return s.pad(card.setNumber, 2, '0') + '-' + card.setTechName  
				+ '/' + s.pad(card.number, 3, '0') + '-' + card.techName;
	};

	_util.toPublicDeckUrl = function(options) {
		return '/' + conquest.static.language + '/public/deck/' + options.id + '-' + _util.toTechName(options.name);
	};
	
	_util.toUserDeckUrl = function(options) {
		var url = '/' + conquest.static.language + '/deck/edit/' + options.id;
		if (options.name) {
			url += '-' + _util.toTechName(options.name);
		}
		return url;
	};

	_util.createTypeahead = function(options) {
		// constructs the suggestion engine
		var cards = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: $.map(conquest.dict.cards, function(card) {
				return {
					name: card.name,
					card: card
				};
			})
		});

		var traits = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: conquest.dict.traits
		});

		var keywords = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: conquest.dict.keywords
		});

		cards.initialize();
		traits.initialize();
		keywords.initialize();

		var $typeahead = $(options.selector).typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
			name: 'cards',
			displayKey: 'name',
			source: cards.ttAdapter(),
			templates: {
				suggestion: Handlebars
					.compile('{{name}}&nbsp;<span class="tt-no-highlight">{{card.setName}} | {{card.factionDisplay}} | {{card.typeDisplay}} | {{card.trait}}</span>'),
				header: '<div class="tt-multi-header">' + conquest.dict.messages['core.card'] + '</div>'
			}
		}, {
			name: 'traits',
			displayKey: 'description',
			source: traits.ttAdapter(),
			templates: {
				header: '<div class="tt-multi-header">' + conquest.dict.messages['core.trait'] + '</div>'
			}
		}, {
			name: 'keywords',
			displayKey: 'description',
			source: keywords.ttAdapter(),
			templates: {
				header: '<div class="tt-multi-header">' + conquest.dict.messages['core.keyword'] + '</div>'
			}
		});

		return $typeahead;
	};

	_util.toTechName = function(input) {
//		return input.toLowerCase().replace(/[\']/g, '').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\ +/g, '-');
		return s(input).toLowerCase().slugify().value();
	};

	_util.toFactionImageBase = function(techName) {
		return conquest.static.imagePath + '/faction/' + techName;
	};

	_util.toFactionImageMd = function(techName) {
		return _util.toFactionImageBase(techName) + '-b-md.png';
	};

	_util.toFactionImageLg = function(techName) {
		return _util.toFactionImageBase(techName) + '-b.png';
	};

	_util.toCardImage = function(imageBase) {
		return conquest.static.imagePath + '/card/' + imageBase + '.jpg';
	};

	_util.writeAttr = function(name, value) {
		return name + '="' + value + '"';
	};

	_util.writeAttrs = function(attrs) {
		var result = '';
		if (!_.isUndefined(attrs)) {
			for (var key in attrs) {
				result = result + ' ' + _util.writeAttr(key, attrs[key]);
			}
		}
		return result.trim();
	};

	_util.writeFactionImgElem = function(techName) {
		return '<img src="' + _util.toFactionImageMd(techName) + '" />';
	};

	_util.writeCardImgElem = function(imageBase, attrs) {
		return '<img ' + _util.writeAttrs($.extend({
			src: _util.toCardImage(imageBase)
		}, attrs)) + ' />';
	};

	_util.parsePlainTextDeck = function(text, options) {

	};

})(conquest.util);

//
// ???
//
(function(c) {

	c.getValidDeckFactions = function(factionTechName) {
		var validDeckFactions = [];
		var factions = c.dict.factions;
		var circleFactions = _.filter(factions, function(faction) {
			return faction.techName != 'neutral' && faction.techName != 'necron' && faction.techName != 'tyranid';
		});
		var faction = _.findWhere(factions, {
			techName: factionTechName
		});

		if (faction.techName == 'neutral') {
			// no op
		} else if (faction.techName == 'necrons') {
			// no op
		} else if (faction.techName == 'tyranid') {
			validDeckFactions.push(faction);
		} else {
			var index = circleFactions.indexOf(faction);
			validDeckFactions.push(faction);
			validDeckFactions.push(circleFactions[(index - 1 + circleFactions.length) % circleFactions.length]);
			validDeckFactions.push(circleFactions[(index + 1) % circleFactions.length]);
			validDeckFactions.push(_.findWhere(factions, {
				techName: 'neutral'
			}));
		}
		return validDeckFactions;
	};

	c.getValidDeckCards = function(deckWarlordId) {
		deckWarlordId = parseInt(deckWarlordId);

		var deckWarlord = c.dict.findCard(deckWarlordId);
		var deckFaction = deckWarlord.faction;
		var validDeckFactions = _.pluck(c.getValidDeckFactions(deckFaction), 'techName');
		var validDeckCards = _.filter(c.dict.cards, function(card) {
			// invalid faction
			var faction = card.faction;
			if (validDeckFactions.indexOf(faction) == -1) {
				return false;
			}
			// invalid type
			var type = card.type;
			if (type === 'token' || type === 'planet') {
				return false;
			}
			// invalid warlord
			if (type === 'warlord' /* && card.get('id') !== deckWarlordId*/ ) {
				return false;
			}
			// invalid signature squad
			var warlordId = card.warlordId;
			if (!_.isUndefined(warlordId) && warlordId !== deckWarlordId) {
				return false;
			}
			// loyal to another faction
			if (card.loyal === true && faction !== deckFaction) {
				return false;
			}
			return true;
		});
		return validDeckCards;
	};

	c.getValidDeckMembers = function(deckWarlordId) {
		var validDeckCards = c.getValidDeckCards(deckWarlordId);
		var validDeckMembers = [];
		_.each(validDeckCards, function(card) {
			var availableQuantity = (_.isUndefined(card.quantity) ? 3 : card.quantity);
			var quantity = (card.type === 'warlord' || _.isNumber(card.warlordId) ? availableQuantity : 0);
			var member = {
				cardId: card.id,
				quantity: quantity,
				availableQuantity: availableQuantity
			};
			validDeckMembers.push(member);
		});
		return validDeckMembers;
	};

})(conquest);

//
// card
// 
conquest.card = conquest.card || {};
(function(_card) {

	_card.CardsFilter = Backbone.Model.extend({
		isNotEmpty: function() {
			return !_.isEmpty(this.toJSON());
		},
		filter: function(cards) {
			var filter = this;

			var db = TAFFY(cards);
			var query = {};
			var query2;

			_.each(conquest.filter.fds, function(fd) {
				var value = filter.get(fd.key);
				if (fd.type === conquest.filter.FD_TYPE_SET) {					
					if (value && value.length > 0) {
						query[fd.key] = value;
					}
				} else if (fd.type === conquest.filter.FD_TYPE_RANGE_STAT) {
					if (value && (value.length == 2 || value.length === 3 && value[2] !== true)) {
						query[fd.key] = {
							gte: value[0],
							lte: value[1]
						};
					}
				} else if (fd.type === conquest.filter.FD_TYPE_SIMPLE && fd.key != 'text') {
					if (value) {
						var obj = {};
						obj[fd.oper] = value;
						query[fd.key] = obj;
					}
				}
			});

			var text = this.get('text');
			if (text && !(query.techName || query.keyword || query.trait)) {
				query2 = [];
				_.each(['name', 'keyword', 'trait'], function(key) {
					var obj = {};
					obj[key] = { 
						likenocase: text
					};
					query2.push(obj);
				});				
			}

			if (query2) {
				return db(query, query2).get();
			} else {
				return db(query).get();
			}
		}
	});

	//
	// card set filter popover
	//
	_card.CardSetFilterPopoverView = Backbone.View.extend({
		initialize: function(options) {
			this.filter = options.filter;
			this.$trigger = options.$trigger;
		},
		render: function() {
			var view = this;

			var filterContent = Handlebars.templates['card-set-filter-popover-view.hbs']({
				tree: conquest.dict.buildCardSetTree(),
			});
			view.$trigger.popover({
				html: true,
				trigger: 'click focus',
				placement: 'bottom',
				animation: true,
				content: filterContent
			});

			view.$trigger.on('shown.bs.popover', function() {
				var sets = view.filter.get('setTechName');
				var cycles = view.filter.get('cycleTechName');
				var $content = view.$trigger.parent().find('.filter-content');
				var $sets = $content.find('li:not(:has(ul)) input[type="checkbox"]');
				var $cycles = $content.find('li:has(ul) > input[type="checkbox"]');
				$sets.each(function() {
					var $this = $(this);
					$this.prop('checked', sets && sets.indexOf($this.val()) > -1);
				});
				$cycles.each(function() {
					var $this = $(this);
					$this.prop('checked', cycles && cycles.indexOf($this.val()) > -1);
					$this.click(function() {
						$this.siblings().filter('ul').find('input[type="checkbox"]').prop('checked', $this.prop('checked'));
					});
				});

				//
				// filter apply
				//
				$content.find('.filter-apply').click(function() {
					view.$trigger.popover('hide');
					var sets = [];
					$sets.filter(':checked').each(function() {
						sets.push($(this).val());
					});
					var cycles = [];
					$cycles.filter(':checked').each(function() {
						cycles.push($(this).val());
					});
					view.filter.set({
						setTechName: sets,
						cycleTechName: cycles
					});
				});
				//
				// filter cancel
				//
				$content.find('.filter-cancel').click(function() {
					view.$trigger.popover('hide');
				});
			});
		}
	});

	//
	// card stats filter popover
	//
	_card.CardStatFilterPopoverView = Backbone.View.extend({
		initialize: function(options) {
			this.filter = options.filter;
			this.$trigger = options.$trigger;
		},
		render: function() {
			var view = this;

			var filterContent = Handlebars.templates['card-stat-filter-popover-view.hbs']({});
			view.$trigger.popover({
				html: true,
				trigger: 'click focus',
				placement: 'bottom',
				animation: true,
				content: filterContent
			});

			view.$trigger.on('shown.bs.popover', function() {
				var $content = view.$trigger.parent().find('.filter-content');

				$content.find('.slider').slider({}).each(function() {
					var $this = $(this);
					var $labelMin = $this.siblings().find('.label-min');
					var $labelMax = $this.siblings().find('.label-max');

					var filterKey = $this.data('filter-key');
					var filterValues = view.filter.get(filterKey);
					var minInit = $this.data('slider-min');
					var maxInit = $this.data('slider-max');
					var disabled = true;
					if (filterValues) {
						minInit = filterValues[0] || minInit;
						maxInit = filterValues[1] || maxInit;
						disabled = filterValues[2] === true;
					}

					$labelMin.text(minInit);
					$labelMax.text(maxInit);

					if (disabled) {
						$this.parent('td').addClass('disabled');
					} else {
						$this.parent('td').removeClass('disabled');
					}
					$this.parent('td').prev().find('input').prop('checked', !disabled);

					$this.slider({
						range: true,
						min: $this.data('slider-min'),
						max: $this.data('slider-max'),
						values: [minInit, maxInit],
						slide: function(event, ui) {
							$labelMin.text(ui.values[0]);
							$labelMax.text(ui.values[1]);
						}
					});
				});

				$('.stats-filter-group td:nth-child(1) input').click(function() {
					$(this).parent('td').next().toggleClass('disabled');
				});

				//
				// filter apply
				//
				$content.find('.filter-apply').click(function() {
					view.$trigger.popover('hide');
					var filter = {};
					$content.find('.slider').each(function() {
						var $this = $(this);
						var values = $this.slider('values');
						values.push($this.parent().hasClass('disabled'));
						filter[$this.data('filter-key')] = values;	
					});
					view.filter.set(filter);
				});
				//
				// filter cancel
				//
				$content.find('.filter-cancel').click(function() {
					view.$trigger.popover('hide');
				});
			});
		}
	});

})(conquest.card);
