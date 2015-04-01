$(function() {

	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
		options.url = conquest.static.restPath + options.url + '?language=' + conquest.static.language;
	});

	var CardsFilter = Backbone.Model.extend({
		isNotEmpty: function() {
			return !_.isEmpty(this.toJSON());
		},
		filter: function(cards) {
			var filter = this;

			var db = TAFFY(conquest.dict.cards);
			var query = {};
			var query2;

			_.each(conquest.filter.fds, function(fd) {
				var value = filter.get(fd.key);
				if (fd.type === conquest.filter.FD_TYPE_SET) {					
					if (value && value.length > 0) {
						query[fd.key] = value;
					}
				} else if (fd.type === conquest.filter.FD_TYPE_RANGE) {
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

	var ViewBase = Backbone.View.extend({
		el: '.content',
		events: {
			'click a': 'linkClick'
		},
		linkClick: function(e) {
			var root = conquest.static.root;
			var href = $(e.currentTarget).attr('href');
			if (href.indexOf(root) == 0 && !event.ctrlKey && !event.shiftKey) {
				e.preventDefault();
				conquest.router.navigate(href.replace(conquest.static.root, ''), {
					trigger: true
				});
			}
		},
		renderMessages: function(options) {
			if (this.messages) {
				var $template = $(Handlebars.templates['global-messages.hbs']({
					messages: this.messages
				}));
				delete this.messages;
				this.$el.prepend($template);
				setTimeout(function() {
					$template.fadeOut("slow");
				}, 2000);
			}
		}
	});

	var CardView = ViewBase.extend({
		render: function(setNumber, cardNumber) {
			var card = conquest.dict.findCardByNumber(setNumber, cardNumber);			
			var template = Handlebars.templates['card-view.hbs']({
				card: card,
				warlord: conquest.dict.findCard(card.warlordId),
				signSquadCards: _.filter(conquest.dict.findSignSquadCards(card.warlordId || card.id), function(signSquadCard) {
					return card.id !== signSquadCard.id;
				})
			});
			this.$el.html(template);
			conquest.router.navigate(conquest.util.toCardRelativeUrl(card));
		}
	});

	var CardSearchResultsView = ViewBase.extend({
		el: '.card-search-results-container',
		render: function(cards, options) {
			var view = this;

			var layout = options.layout;
			var templateName = undefined;
			if (layout === 'grid-2') {
				templateName = 'card-search-results-grid-2.hbs';
			} else if (layout === 'grid-3') {
				templateName = 'card-search-results-grid-3.hbs';
			} else if (layout === 'grid-4') {
				templateName = 'card-search-results-grid-4.hbs';
			} else if (layout === 'grid-6') {
				templateName = 'card-search-results-grid-6.hbs';
			} else {
				// list layout is the default
				templateName = 'card-search-results-list.hbs';
			}

			var template = Handlebars.templates[templateName]({
				results: {
					cards: cards.toJSON()
				}
			});
			view.$el.html(template);
		}
	});

	var CardSearchView = ViewBase.extend({
		config: new Backbone.Model({
			layout: 'grid-4'
		}),
		filter: new CardsFilter(),
		filteredCards: new conquest.model.Cards(),
		render: function(queryString) {
			var view = this;

			if (queryString) {
				view.filter = new CardsFilter(conquest.filter.queryStringToFilter(queryString));
			}

			var template = Handlebars.templates['card-search-view.hbs']({
				tree: conquest.dict.buildCardSetTree(),
				filter: {
					factions: conquest.dict.factions,
					cardTypes: conquest.dict.cardTypes
				}
			});

			view.$el.html(template);
			view.renderMessages();
			view.cardSearchResultsView = new CardSearchResultsView();
			view.cardSearchResultsView.listenTo(view.filteredCards, 'reset', function(filteredCards) {
				this.render(filteredCards, {
					layout: view.config.get('layout')
				});
			});

			//
			// common click handler
			//
			view.$el.find('.btn-group.select-many > .btn').click(function(event) {
				var $this = $(this);
				if (event.ctrlKey) {
					$this.addClass('active').siblings().removeClass('active');
				} else {
					$this.toggleClass('active');
				}
			});

			//
			// tooltips
			//				
			view.$el.find('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			});

			// view.$el.find('.btn-group.btn-group-layout > .btn').click(function() {
			// 	$(this).addClass('active').siblings().removeClass('active');
			// 	view.config.set({
			// 		layout: $(this).data('layout')
			// 	});
			// });

			//
			// filter: sets
			//
			// var sets = view.filter.get('setTechName');
			// var cycles = view.filter.get('cycleTechName');
			// var $cardSetFilter = view.$el.find('#cardSetFilter');
			// var $sets = $cardSetFilter.find('li[data-node-type="set"] > input[type="checkbox"]');
			// var $cycles = $cardSetFilter.find('li[data-node-type="cycle"] > input[type="checkbox"]');

			// $sets.each(function() {
			// 	var $this = $(this);
			// 	$this.prop('checked', sets && sets.indexOf($this.val()) > -1);
			// 	$this.click(function() {
			// 		view.filter.set({
			// 			setTechName: $cardSetFilter.find('li[data-node-type="set"] > input[type="checkbox"]:checked').map(function() {
			// 				return $(this).val();
			// 			}).get()
			// 		});
			// 	});
			// });

			// $cycles.each(function() {
			// 	var $this = $(this);
			// 	$this.prop('checked', cycles && cycles.indexOf($this.val()) > -1);
			// 	$this.click(function() {
			// 		$this.siblings().filter('ul').find('li[data-node-type="set"] > input[type="checkbox"]').prop('checked', $this.prop('checked'));
			// 		view.filter.set({
			// 			setTechName: $cardSetFilter.find('li[data-node-type="set"] > input[type="checkbox"]:checked').map(function() {
			// 				return $(this).val();
			// 			}).get(),
			// 			cycleTechName: $cardSetFilter.find('li[data-node-type="cycle"] > input[type="checkbox"]:checked').map(function() {
			// 				return $(this).val();
			// 			}).get()
			// 		});
			// 	});
			// });
			var filter = new Backbone.Model();
			new _deck.CardSetFilterPopoverView({
				filter: filter
			}).render();

			//
			// filter: factions
			//
			var factions = view.filter.get('faction');
			var $factions = view.$el.find('#factionFilter > .btn');

			$factions.each(function() {
				var $this = $(this);
				if (factions && factions.indexOf($this.data('faction')) > -1) {
					$this.addClass('active');
				}
				$this.click(function(event) {
					view.filter.set({
						faction: $factions.filter('.active').map(function() {
							return $(this).data('faction');
						}).get()
					});
				});
			});

			//
			// filter: types
			//
			var types = view.filter.get('type');
			var $types = view.$el.find('#cardTypeFilter > .btn');

			$types.each(function() {
				var $this = $(this);
				if (types && types.indexOf($this.data('type')) > -1) {
					$this.addClass('active');
				}
				$this.click(function(event) {
					view.filter.set({
						type: $types.filter('.active').map(function() {
							return $(this).data('type');
						}).get()
					});
				});
			});

			//
			// filter: quantities
			//
			var quantities = view.filter.get('quantity');
			var $quantities = view.$el.find('#quantityFilter > .btn');

			$quantities.each(function() {
				var $this = $(this);
				if (quantities && quantities.indexOf($this.data('quantity')) > -1) {
					$this.addClass('active');
				}
				$this.click(function(event) {
					view.filter.set({
						quantity: $quantities.filter('.active').map(function() {
							return $(this).data('quantity');
						}).get()
					});
				});
			});

			//
			// filter: cost, shield, command, attack, hp
			//
			var setStatsFilter = function(options) {
				var filter = {};
				var values = [];
				values.push(options.values[0]);
				values.push(options.values[1]);
				values.push(options.disabled);
				filter[options.filterKey] = values;
				view.filter.set(filter);
			};

			$('.slider').slider({});
			$('.slider').each(function() {
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
					disabled = filterValues[2] === 'true';
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
						setStatsFilter({
							disabled: false,
							filterKey: filterKey,
							values: ui.values
						});
					}
				});
			});
			$('.stats-filter-group td:nth-child(1) input').click(function() {
				var $container = $(this).parent('td').next().toggleClass('disabled');
				var $slider = $container.find('.slider');
				var disabled = $container.hasClass('disabled');
				setStatsFilter({
					disabled: disabled,
					filterKey: $slider.data('filter-key'),
					values: $slider.slider('values')
				});
			});

			//
			// filter: name/trait/keyword search bar
			//
			var selector = '#textFilter input';
			var $typeahead = conquest.util.createTypeahead({
				selector: selector
			});

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
							obj['trait'] = suggestion.description;
						} else if (dataset == 'keywords') {
							obj['keyword'] = suggestion.description;
						}
					} else if (text) {
						if (!(view.filter.has('techName') || view.filter.has('trait') || view.filter.has('keyword'))) {
							obj['text'] = text;
						}
					} else {
						obj['techName'] = undefined;
						obj['trait'] = undefined;
						obj['keyword'] = undefined;
						obj['text'] = undefined;
					}

					view.filter.set(obj, {
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
					view.filter.trigger('change', view.filter);
				}
			});

			$('#textFilter .btn').click(function() {
				view.filter.trigger('change', view.filter);
			});

			//
			// listen to filter change event
			//
			view.filter.listenTo(view.filter, 'change', function(filter, options) {
				view.filteredCards.reset(filter.filter.call(filter));
				var queryString = conquest.filter.filterToQueryString(filter.toJSON());
				if (queryString && queryString.length > 0) {
					queryString = '?' + queryString;
				} else {
					queryString = '';
				}
				conquest.router.navigate('search' + queryString);
				// if (!options || options.ga !== false) {
				// 	ga('send', 'pageview');
				// }
			});

			if (view.filter.isNotEmpty()) {
				view.filter.trigger('change', view.filter, {
					ga: false
				});
			}
		}
	});

	var Router = Backbone.Router.extend({
		routes: {
			':setNumber/:cardNumber': 'viewCard',
			'search(?:queryString)': 'searchCards'
		}
	});

	conquest.router = new Router();
	conquest.router.on('route:viewCard', function(setNumber, cardNumber) {
		var cardView = new CardView();
		setNumber = parseInt(setNumber);
		cardNumber = parseInt(cardNumber);
		cardView.render(setNumber, cardNumber);

		var card = conquest.dict.findCardByNumber(setNumber, cardNumber);
		var url = conquest.util.toCardRelativeUrl(card);
		if (_.isUndefined(url)) {
			url = setNumber + '/' + cardNumber;
		}
		ga('set', 'page', conquest.static.root + url);
		ga('send', 'pageview');
	}).on('route:searchCards', function(queryString) {
		var cardSearchView = new CardSearchView();
		cardSearchView.render(queryString);
		ga('set', 'page', conquest.static.root + 'search');
		ga('send', 'pageview');
	});

	conquest.static.root = '/' + conquest.static.language + '/card/';

	Backbone.history.start({
		pushState: true,
		root: conquest.static.root
	});
});