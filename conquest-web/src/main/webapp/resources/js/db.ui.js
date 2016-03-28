var db = db || {};

//
//ui
//
db.ui = db.ui || {};
(function(_ui) {
	
	/**
	 * @memberOf _ui
	 */
	_ui.toCardUrl = function(input) {
		return '/' + db.static.language + '/card/' + _ui.toCardRelativeUrl(input);
	};

	_ui.toCardRelativeUrl = function(input) {
		var card;
		if (_.isNumber(input)) {
			card = db.dict.findCard(input);
		} else {
			card = input;
		}

		return s.pad(card.setNumber, 2, '0') + '-' + card.setTechName + '/'
				+ s.pad(card.number, 3, '0') + '-' + card.techName;
	};

	_ui.toPublicDeckUrl = function(options) {
		return '/' + db.static.language + '/public/deck/' + options.id + '-'
				+ db.util.toTechName(options.name);
	};

	_ui.toUserDeckUrl = function(options) {
		var url = '/' + db.static.language + '/deck/edit/' + options.id;
		if (options.name) {
			url += '-' + db.util.toTechName(options.name);
		}
		return url;
	};
	
	_ui.toFactionImageBase = function(techName) {
		return db.static.imagePath + '/faction/' + techName;
	};

	_ui.toFactionImageMd = function(techName) {
		return _ui.toFactionImageBase(techName) + '-b-md.png';
	};

	_ui.toFactionImageLg = function(techName) {
		return _ui.toFactionImageBase(techName) + '-b.png';
	};

	_ui.toCardImage = function(imageBase) {
		return db.static.imagePath + '/card/' + imageBase + '.jpg';
	};
	
	_ui.toSearchLinkFaction = function(card, options) {
		return '<a href="/' + db.static.language 
				+ '/card/search?faction='  + card.faction + '">' + card.factionDisplay + '</a>';
	};

	_ui.toSearchLinkType = function(card, options) {
		return '<a href="/' + db.static.language 
				+ '/card/search?type='  + card.type + '">' + card.typeDisplay + '</a>';
	};

	_ui.toSearchLinkSetName = function(crst, options) {
		return '<a href="/' + db.static.language 
				+ '/card/search?set='  + crst.techName + '">' + crst.name + '</a>';
	};

	_ui.toSearchLinkTraits = function(card, options) {
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
	
	_ui.toSearchLinkTrait = function(trait, options) {
		return '<a href="/' + db.static.language + '/card/search?trait=' + trait + '">' + trait + '</a>';
	};
	
//	_ui.toSearchLinkKeyword = function(card, options) {
//		return '<a href="/' + db.static.language 
//				+ '/card/search?faction='  + card.faction + '">' + card.factionDisplay + '</a>';
//	};
	
	_ui.toHtmlText = function(input) {
		if (_.isUndefined(input)) {
			return input;
		}
		// faction
		var output = input.replace(/\[(?!Resource)(?!Card)([A-Z_\- ]{3,})\]/gi, function(g0, g1) {
			return '<i class="db-icon db-icon-' + g1.toLowerCase().replace(/[_\- ]+/, '-') + '"></i>';
		});
		// trait
		output = output.replace(/\[t\]([A-Z0-9\-_]+)\[\/t\]/gi, function(g0, g1) {
			return '<i><strong>' + _ui.toSearchLinkTrait(g1) + '</strong></i>';
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
	
	_ui.toPlainText = function(input) {
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
	
	_ui.colors = {
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

	_ui.writeAttr = function(name, value) {
		return name + '="' + value + '"';
	};

	_ui.writeAttrs = function(attrs) {
		var result = '';
		if (!_.isUndefined(attrs)) {
			for ( var key in attrs) {
				result = result + ' ' + _ui.writeAttr(key, attrs[key]);
			}
		}
		return result.trim();
	};

	_ui.writeFactionImgElem = function(techName) {
		return '<img src="' + _ui.toFactionImageMd(techName) + '" />';
	};

	_ui.writeCardImgElem = function(imageBase, attrs) {
		return '<img ' + _ui.writeAttrs($.extend({
			src : _ui.toCardImage(imageBase)
		}, attrs)) + ' />';
	};

	_ui.parsePlainTextDeck = function(text, options) {

	};

	_ui.buildCardsTypeahead = function(filter, options) {
		//
		// create suggestion engine
		//

		options = options || {};

		var sourceCards = db.dict.getCards();
		if (options.playerDeckOnly) {
			sourceCards = db.dict.getPlayerDeckCards();
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
	
	_ui.adjustNavbarColors = function(faction) {
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
	
	_ui.adjustWrapperStyle = function(css) {
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
	
})(db.ui);