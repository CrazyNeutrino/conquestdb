var db = db || {};

//
// util
//
db.util = db.util || {};
(function(_util) {

	/**
	 * @memberOf _util
	 */
	_util.toJSON = function(data) {
		var json;
		if (_.isArray(data)) {
			json = [];
			_.each(data, function(dataItem) {
				json.push(dataItem.toJSON());
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

		var stringKeys = [ 'name', 'type', 'typeDisplay', 'faction', 'factionDisplay' ];
		var numberKeys = [ 'memberQuantity', 'quantity', 'cost', 'shield', 'comamnd', 'attack',
				'hitPoints' ];

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
		var cards = [];
		_.each(_util.toJSON(members), function(member) {
			_.times(member.quantity, function(index) {
				cards.push(member.card);
			});
		});
		return _.shuffle(cards);
	};

	_util.buildCardResolver = function() {
		return function(input) {
			if (input instanceof db.model.Card) {
				return input.attributes;
			} else if (input instanceof db.model.DeckMember) {
				return input.get('card');
			} else if (input instanceof Backbone.Model) {
				return input.attributes;
			} else {
				return input;
			}
		};
	};

	_util.buildMembersComparator = function(keys) {
		return _util.buildCardsComparator(keys);
	};

	_util.buildMembersDefaultComparator = function(faction) {
		return function(one, two) {
			var result = 0;
			var cardOne = one.get('card');
			var cardTwo = two.get('card');

			$.each([ 'warlord', 'synapse' ], function(index, type) {
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
				}
				;
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
		var resolver = options.resolver || _util.buildCardResolver();

		var validKeys = [];
		_.each(keys, function(key) {
			if (key && key !== 'none' && key !== 'default') {
				validKeys.push(key);
			}
		});
		validKeys.push('setNumber');
		validKeys.push('number');

		var stringKeys = [ 'name', 'type', 'typeDisplay', 'faction', 'factionDisplay', 'setName' ];
		var numberKeys = [ 'memberQuantity', 'quantity', 'cost', 'shield', 'command', 'attack',
				'hitPoints', 'setNumber', 'number' ];

		return function(one, two) {
			var result = 0;
			_.find(validKeys, function(key) {
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
					oneValue = resolver(one)[property];
					twoValue = resolver(two)[property];
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
					return true;
				}
				return false;
			});

			return result;
		};
	};

	_util.buildSortKeys = function($input) {
		var sortKeys = [];

		$input.each(function() {
			var value = $(this).val();
			if (value) {
				if (value.indexOf(',') == -1) {
					sortKeys.push(value);
				} else {
					sortKeys.push({
						property: value.split(',')[0],
						descending: value.split(',')[1] == 'desc'
					});
				}
			}
		});
		return sortKeys;
	};

	_util.toTechName = function(input) {
		// return input.toLowerCase().replace(/[\']/g,
		// '').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\ +/g, '-');
		return s(input).toLowerCase().slugify().value();
	};

	_util.buildPagination = function(options) {
		options = options || {};
		
		if (_.isUndefined(options.total)) {
			throw "Total is undefined";
		}

		var p = {
			total: options.total,
			pageNumber: _.isNumber(options.pageNumber) ? options.pageNumber : 0,
			pageSize: _.isNumber(options.pageSize) ? options.pageSize : 40,
		};

		p.pages = new Array(Math.ceil(p.total / p.pageSize));
		p.firstPage = p.pages[0];
		p.lastPage = p.pages[p.pages.length - 1];
		p.singlePage = p.pages.length < 2;

		_.each(_.range(0, p.pages.length), function(number) {
			p.pages[number] = {
				number: number,
				label: "" + (number + 1),
				active: number == p.pageNumber
			};
		});
		p.prevPage = p.pageNumber > 0 ? {
			number: p.pageNumber - 1
		} : undefined;
		p.nextPage = p.pageNumber < p.pages.length - 1 ? {
			number: p.pageNumber + 1
		} : undefined;

		p.pageStartIndex = p.pageNumber * p.pageSize;
		p.pageEndIndex = Math.min(p.pageStartIndex + p.pageSize, p.total) - 1;

		return p;
	};

	_util.buildCardSortItems = function(options) {
		options = options || {};

		var sortItems = [];
		_.each([
				['name', 'card.name'],
				['number', 'card.number'],
				['factionDisplay', 'card.faction'],
				['typeDisplay', 'card.type'],
				['cost', 'card.cost.sh'],
				['shield', 'card.shieldIcons.sh'],
				['command', 'card.commandIcons.sh'],
				['attack', 'card.attack.sh'],
				['hitPoints', 'card.hp.sh'],
				['setName', 'core.setName'],
				['setNumber', 'core.setNumber']
			 ], function(item) {
			sortItems.push({
				value: item[0],
				label: db.dict.messages[item[1]]
			})
		});

		return sortItems;
	};
	
	_util.parseQueryString = function(queryString) {
		var obj = {};
		if (queryString) {
			_.each(queryString.split('&'), function(part) {
				var keyValue = part.split('=');
				var key = decodeURIComponent(keyValue[0]);
				var value = decodeURIComponent(keyValue[1]);
				if (_.contains(value, ',')) {
					value = value.split(',');
				}
				obj[key] = value;
			});
		}
		return obj;
	};
	
	_util.buildQueryString = function(obj) {
		var parts = [];
		if (obj) {
			_.chain(obj).pairs().each(function(pair) {
				parts.push(pair[0] + '=' + (_.isArray(pair[1]) ? pair[1].join() : pair[1]));
			});
		}
		
		var queryString = undefined;
		if (parts.length > 0) {
			queryString = parts.join('&');
		}
		return queryString;
	};
	
	_util.toCardUrl = function(input) {
		return '/' + db.static.language + '/card/' + _util.toCardRelativeUrl(input);
	};

	_util.toCardRelativeUrl = function(input) {
		var card;
		if (_.isNumber(input)) {
			card = db.dict.findCard(input);
		} else {
			card = input;
		}

		return s.pad(card.setNumber, 2, '0') + '-' + card.setTechName + '/'
				+ s.pad(card.number, 3, '0') + '-' + card.techName;
	};

	_util.toPublicDeckUrl = function(options) {
		return '/' + db.static.language + '/public/deck/' + options.id + '-'
				+ db.util.toTechName(options.name);
	};

	_util.toUserDeckUrl = function(options) {
		var url = '/' + db.static.language + '/deck/edit/' + options.id;
		if (options.name) {
			url += '-' + db.util.toTechName(options.name);
		}
		return url;
	};
	
	_util.toFactionImageBase = function(techName) {
		return db.static.imagePath + '/faction/' + techName;
	};

	_util.toFactionImageMd = function(techName) {
		return _util.toFactionImageBase(techName) + '-b-md.png';
	};

	_util.toFactionImageLg = function(techName) {
		return _util.toFactionImageBase(techName) + '-b.png';
	};

	_util.toCardImage = function(imageBase) {
		return db.static.imagePath + '/card/' + imageBase + '.jpg';
	};
	
	_util.toSearchLinkFaction = function(card, options) {
		return '<a href="/' + db.static.language 
				+ '/card/search?faction='  + card.faction + '">' + card.factionDisplay + '</a>';
	};

	_util.toSearchLinkType = function(card, options) {
		return '<a href="/' + db.static.language 
				+ '/card/search?type='  + card.type + '">' + card.typeDisplay + '</a>';
	};

	_util.toSearchLinkSetName = function(crst, options) {
		return '<a href="/' + db.static.language 
				+ '/card/search?set='  + crst.techName + '">' + crst.name + '</a>';
	};

	_util.toSearchLinkTraits = function(card, options) {
		var result = '';
		var traits = card.trait.split('. ');
		_.each(traits, function(trait, index) {
			trait = s.trim(trait.replace('.', ''));
			result += '<a href="/' + db.static.language + '/card/search?trait=' + trait + '">' + trait + '.</a>';
			if (index < traits.length - 1) {
				result += ' ';
			}
		});
		return result;
	};
	
	_util.toSearchLinkTrait = function(trait, options) {
		return '<a href="/' + db.static.language + '/card/search?trait=' + trait + '">' + trait + '</a>';
	};
	
//	_util.toSearchLinkKeyword = function(card, options) {
//		return '<a href="/' + db.static.language 
//				+ '/card/search?faction='  + card.faction + '">' + card.factionDisplay + '</a>';
//	};
	
	_util.toHtmlText = function(input) {
		if (_.isUndefined(input)) {
			return input;
		}
		// faction
		var output = input.replace(/\[(?!Resource)(?!Card)([A-Z_\- ]{3,})\]/gi, function(g0, g1) {
			return '<i class="db-icon db-icon-' + g1.toLowerCase().replace(/[_\- ]+/, '-') + '"></i>';
		});
		// trait
		output = output.replace(/\[t\]([A-Z0-9\-_]+)\[\/t\]/gi, function(g0, g1) {
			return '<i><strong>' + _util.toSearchLinkTrait(g1) + '</strong></i>';
		});
		// special words
		var words = db.dict.reservedWords[db.static.language];
		if (db.static.language !== 'en') {
			words = words.concat(db.dict.reservedWords['en']);
		}
		_.each(words, function(word) {
			var regexp = new RegExp('(' + word + ': )', 'g');
			output = output.replace(regexp, '<strong>$1</strong>');
		});
		// line breaks
		output = output.replace(/\n/g, '<br/>');
		// italics
		output = output.replace(/\[i\]([^\[]+)\[\/i\]/g, '<i>$1</i>')
		return output;
	};
	
	_util.toPlainText = function(input) {
		if (_.isUndefined(input)) {
			return input;
		}
		// trait
		output = input.replace(/\[t\]([A-Z0-9\-_]+)\[\/t\]/gi, '$1');
		// line breaks
		output = output.replace(/\n/g, ' ');
		// italics
		output = output.replace(/\[i\]([^\[]+)\[\/i\]/g, '$1')
		return output;
	};
	
	_util.colors = {
		factions: {
			'astra-militarum': {
				bg: '#3C3C3C',
				fg: '#FFF'
			},
			chaos: {
				bg: '#EA5400',
				fg: '#FFF'
			},
			'dark-eldar': {
				bg: '#AF4D9D',
				fg: '#000'
			},
			eldar: {
				bg: '#EADA67',
				fg: '#000'
			},
			ork: {
				bg: '#407424',
				fg: '#FFF'
			},
			'space-marines': {
				bg: '#095DAD',
				fg: '#FFF'
			},
			tau: {
				bg: '#4CD0DC'
			},
			tyranid: {
				bg: '#A32618',
				fg: '#FFF'
			},
			necron: {
				bg: '#57D8A9',
				fg: '#000'
			},
			neutral: {
				bg: '#BBB',
				fg: '#000'
			}
		},
		types: {
			army: {
				bg: '#ED2626'
			},
			attachment: {
				bg: '#419441'
			},
			event: {
				bg: '#F0AD36'
			},
			support: {
				bg: '#3B84CC'
			},
			synapse: {
				bg: '#B848A3'
			}
		}
	};

	_util.writeAttr = function(name, value) {
		return name + '="' + value + '"';
	};

	_util.writeAttrs = function(attrs) {
		var result = '';
		if (!_.isUndefined(attrs)) {
			for ( var key in attrs) {
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
			src : _util.toCardImage(imageBase)
		}, attrs)) + ' />';
	};

	_util.parsePlainTextDeck = function(text, options) {

	};

	_util.buildCardsTypeahead = function(filter, options) {
		//
		// create suggestion engine
		//

		options = options || {};

		var sourceCards = db.dict.getCards();
		if (options.playerDeckOnly) {
			sourceCards = db.dict.getDeckCards();
		}
		var cards = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: $.map(sourceCards, function(card) {
				return {
					name: card.name,
					card: card
				};
			})
		});

		var traits = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: db.dict.traits
		});

		var keywords = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: db.dict.keywords
		});

		cards.initialize();
		traits.initialize();
		keywords.initialize();

		//
		// build typeahed object
		//
		var $typeahead = $(options.selector).typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
			name: 'cards',
			displayKey: 'name',
			source: cards.ttAdapter(),
			templates: {
				suggestion: Handlebars.compile('{{name}}&nbsp;<span class="tt-no-highlight">'
						+ '{{card.setName}} | {{card.factionDisplay}} '
						+ '| {{card.typeDisplay}} | {{card.traits}}</span>'),
				header: '<div class="tt-multi-header">' + db.dict.messages['core.card'] + '</div>'
			}
		}, {
			name: 'traits',
			displayKey: 'description',
			source: traits.ttAdapter(),
			templates: {
				header: '<div class="tt-multi-header">' + db.dict.messages['core.trait'] + '</div>'
			}
		}, {
			name: 'keywords',
			displayKey: 'description',
			source: keywords.ttAdapter(),
			templates: {
				header: '<div class="tt-multi-header">' + db.dict.messages['core.keyword'] + '</div>'
			}
		});

		//
		// put values from filter object into input
		//
		var $input = $(options.selector);
		if (filter.has('traits')) {
			$input.val(filter.get('traits'))
		} else if (filter.has('keywords')) {
			$input.val(filter.get('keywords'))
		} else if (filter.has('techName')) {
			var card = db.dict.findCard(filter.get('techName'));
			if (card) {
				$input.val(card.name);
			}
		} else if (filter.has('text')) {
			$input.val(filter.get('text'))
		}

		var setSearchbarFilter = function(options) {
			if (options) {
				var suggestion = options.suggestion;
				var dataset = options.dataset;
				var text = options.text;

				var obj = {};
				if (suggestion && dataset) {
					if (dataset == 'cards') {
						obj['techName'] = suggestion.card.techName;
					} else if (dataset == 'traits') {
						obj['traits'] = suggestion.description;
					} else if (dataset == 'keywords') {
						obj['keywords'] = suggestion.description;
					}
				} else if (text) {
					if (!(filter.has('techName') || filter.has('traits') || filter.has('keywords') || filter
							.has('text'))) {
						obj['text'] = text;
					}
				} else {
					obj['techName'] = undefined;
					obj['traits'] = undefined;
					obj['keywords'] = undefined;
					obj['text'] = undefined;
				}

				filter.set(obj, {
					silent: true
				});
			}
		};

		$typeahead.on('typeahead:selected', function($event, suggestion, dataset) {
			console.log('selected' + $event);
			setSearchbarFilter({
				suggestion: suggestion,
				dataset: dataset
			});
		}).on('typeahead:autocompleted', function($event, suggestion, dataset) {
			console.log('autocompleted' + $event);
			setSearchbarFilter({
				suggestion: suggestion,
				dataset: dataset
			});
		}).on('typeahead:closed', function($event) {
			console.log('closed' + $event);
			setSearchbarFilter({
				text: $typeahead.typeahead('val')
			});
		}).on('typeahead:opened', function($event) {
			console.log('opened' + $event);
			setSearchbarFilter({});
		}).on('keyup', function($event) {
			if ($event.keyCode == 13) {
				$typeahead.typeahead('close');
				filter.trigger('change', filter);
			}
		});

		$('#textFilter .btn').click(function() {
			filter.trigger('change', filter);
		});

		return $typeahead;
	};
	
	_util.adjustNavbarColors = function(faction) {
//		var selector = '.navbar, .navbar .navbar-brand, .navbar .navbar-nav a';
//		var removeClasses = _.reduce(db.dict.factions, function(outcome, faction) {
//			return outcome + 'bg-' + faction.techName + ' ';
//		}, '');
//		$(selector).removeClass(removeClasses);
//		if (faction) {
//			$(selector).addClass('bg-' + faction);
//		}
//		$('#wrapper').css('backgroundColor', '#f2f2f2');
	};
	
	_util.adjustWrapperStyle = function(css) {
		css = css || {};
		if (css.backgroundColor) {
			$('#wrapper').css({
				backgroundColor: css.backgroundColor
			});
		} else {
			$('#wrapper').css({
				backgroundColor: ''
			});
		}
	};

})(db.util);