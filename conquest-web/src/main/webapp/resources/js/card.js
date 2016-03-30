var db = db || {};
db.card = db.card || {};

(function(_card) {

	/**
	 * @memberOf _card
	 */
	_card.dummy = function() {};

	_card.CardView = db.view.PageView.extend({
		className: 'card-view',
			
		/**
		 * @memberOf CardView
		 */
		initialize: function(options) {
			options = options || {};
			
			this.setNumber = options.setNumber;
			this.cardNumber = options.cardNumber;
			this.rebindMenuLinkClickHandler();
		},
		
		render: function() {
			var card = db.dict.findCardByNumber(this.setNumber, this.cardNumber);			
			this.$el.html(Handlebars.templates['card-view']({
				card: card,
				warlord: db.dict.findCard(card.warlordId),
				signSquadCards: _.filter(db.dict.findSignSquadCards(card.warlordId || card.id), function(signSquadCard) {
					return card.id !== signSquadCard.id;
				})
			}));
			
			return this;
		}
	});

	_card.CardSearchView = db.view.PageView.extend({
		className: 'card-search-view',
		
		events: function() {
			return _.extend({
				'click .select-many .btn':		'onSelectManyFilterClick',
				'click .filter-faction .btn':	'onFactionFilterClick',
				'click .filter-card-type .btn':	'onCardTypeFilterClick',
				'click .filter-quantity .btn':	'onQuantityFilterClick',
				'change .layout-control':		'onLayoutControlChange',
				'change .sort-control':			'onSortControlChange',
				'click #cardSetFilterTrigger':	'openCardSetFilterModal'
			}, db.view.View.prototype.events.call(this));
		},
		
		/**
		 * @memberOf CardSearchView
		 */
		initialize: function(options) {
			options = options || {};
			
			_.bindAll(this, 'render', 'filterCards', 'sortCards', 'applyStateToUI', 'applyStateToURL');
			
			var filterProps = {};
			var layout = 'grid-image-only';
			var page = 0;
			
			if (options.queryString) {
				filterProps = db.util.parseQueryString(options.queryString);
				layout = _.isString(filterProps.layout) ? filterProps.layout : layout;
				page = _.isString(filterProps.page) ? parseInt(filterProps.page) : page;
			} else if (options.setTechName) {
				filterProps.setTechName = options.setTechName;
			} else if (options.cycleTechName) {
				filterProps.cycleTechName = options.cycleTechName;
			}
			this.config = new Backbone.Model({
				layout: layout,
				page: page
			});
			this.cardsFilter = new db.card.CardsFilter(db.filter.objectToFilter(filterProps));
			this.cardsSorter = new Backbone.Model();
			this.filteredCards = new db.model.Cards();
			
			// Listen to card filter change event. Then filter cards and change URL, to
			// reflect current filter.
			this.listenTo(this.cardsFilter, 'change', function(cardsFilter) {
				this.filterCards();
				this.applyStateToURL();
			});
			// Listen to sorter change event. Then sort cards.
			this.listenTo(this.cardsSorter, 'change', this.sortCards)
			// Listen to config change event. Then change URL.
			this.listenTo(this.config, 'change', this.applyStateToURL);
			
			this.resultsView = new _card.CardSearchResultsView({
				filteredCards: this.filteredCards,
				config: this.config
			});
			
			this.rebindMenuLinkClickHandler();
		},
		
		render: function() {
			var template = Handlebars.templates['card-search-view']({
				filter: {
					factions: db.dict.factions,
					cardTypes: db.dict.cardTypes
				},
				sortItems: db.util.buildCardSortItems()
			});

			this.$el.html(template);
			this.$el.find('.card-search-results-view-ctr').empty().append(this.resultsView.render().el);
			this.renderMessages();
			
			this.applyStateToUI(this.cardsFilter.toJSON());
			this.makeTooltips();
			
			//
			// filter: stats
			//
			// TODO

			//
			// filter: name/trait/keyword/text search bar
			//
			var $typeahead = db.util.buildCardsTypeahead(this.cardsFilter, {
				selector: '#textFilter input'
			});

			this.filterCards();
			
			return this;
		},
		
		filterCards: function() {
			this.config.set({
				page: 0
			}, {
				silent: true
			});
			var filteredCards = this.cardsFilter.filter(db.dict.getCards());
			this.filteredCards.comparator = db.util.buildCardsComparator(this.cardsSorter.get('keys'));
			this.filteredCards.reset(filteredCards);
		},
		
		sortCards: function() {
			this.filteredCards.comparator = db.util.buildCardsComparator(this.cardsSorter.get('keys'));
			this.filteredCards.sort();
			this.filteredCards.trigger('reset', this.filteredCards);
		},
		
		applyStateToUI: function() {
			var filter = this.cardsFilter.toJSON();
			this.$el.find('.btn-group-layout .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.layout, $this.data('layout'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group.filter-faction .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.faction, $this.data('faction'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group.filter-card-type .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.type, $this.data('card-type'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group.filter-quantity .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.quantity, $this.data('quantity'))) {
					$this.addClass('active');
				}
			});
			
//			this.$el.find('.sort-control').each(function(index) {
//				if (filter.sorting && filter.sorting.length > index) {
//					$(this).val(filter.sorting[index]);
//				}
//			});
			
			this.$el.find('.layout-control').val(this.config.get('layout'));
		},
		
		applyStateToURL: function() {
			var obj = db.filter.filterToObject(this.cardsFilter.toJSON());
			obj.layout = this.config.get('layout');
			obj.page = this.config.get('page');
			var queryString = db.util.buildQueryString(obj);
			if (queryString && queryString.length > 0) {
				queryString = '?' + queryString;
			} else {
				queryString = '';
			}
			db.router.navigate('card/search' + queryString);
		},
		
		onSelectManyFilterClick: function(event) {
			var $target = $(event.currentTarget);
			if (event.ctrlKey) {
				$target.addClass('active').siblings().removeClass('active');
			} else {
				$target.toggleClass('active');
			}
		},
		
		onFactionFilterClick: function(e) {
			this.cardsFilter.set({
				faction: $(e.currentTarget).parent().children().filter('.active').map(function() {
					return $(this).data('faction');
				}).get()
			});
		},
		
		onCardTypeFilterClick: function(e) {
			this.cardsFilter.set({
				type: $(e.currentTarget).parent().children().filter('.active').map(function() {
					return $(this).data('card-type');
				}).get()
			});
		},
		
		onQuantityFilterClick: function(e) {
			this.cardsFilter.set({
				quantity: $(e.currentTarget).parent().children().filter('.active').map(function() {
					return $(this).data('quantity');
				}).get()
			});
		},
		
		onLayoutControlChange: function(e) {
			this.config.set({
				layout: $(e.currentTarget).val()
			});
		},
		
		onSortControlChange: function(e) {
			this.cardsSorter.set({
				keys: db.util.buildSortKeys($('.sort-control'))
			});
		},
		
		openCardSetFilterModal: function(e) {
			var view = this;
			_card.openCardSetFilterModal({
				sets: this.cardsFilter.get('setTechName'),
				cycles: this.cardsFilter.get('cycleTechName')
			}, {
				applyFilterHandler: function(filter) {
					view.cardsFilter.set({
						setTechName: filter.sets,
						cycleTechName: filter.cycles
					});
				}
			});
		}
	});
	
	_card.CardSearchResultsView = db.view.View.extend({
		className: 'card-search-results-view',
		
		/**
		 * @memberOf CardSearchResultsView
		 */
		initialize: function(options) {
			this.filteredCards = options.filteredCards;
			this.config = options.config;
			
			_.bindAll(this, 'render');
			
			this.listenTo(this.filteredCards, 'reset', this.render);
			this.listenTo(this.config, 'change:layout', this.render);
			this.listenTo(this.config, 'change:page', this.render);
		},
		
		render: function() {
			var layout = this.config.get('layout');
			var templateName = undefined;
			if (layout === 'grid-2') {
				templateName = 'card-search-results-grid-2';
			} else if (layout === 'grid-3') {
				templateName = 'card-search-results-grid-3';
			} else if (layout === 'grid-4') {
				templateName = 'card-search-results-grid-4';
			} else if (layout === 'grid-6') {
				templateName = 'card-search-results-grid-6';
			} else if (layout === 'grid-image-only') {
				templateName = 'card-search-results-grid-4';
			} else if (layout === 'grid-text-only') {
				templateName = 'card-search-results-grid-3-text';
			} else {
				// list layout is the default
				templateName = 'card-search-results-list';
			}
			
			var pg = db.util.buildPagination({
				total: this.filteredCards.size(),
				pageNumber: this.config.get('page'),
				pageSize: 60
			});
			
			var template = Handlebars.templates[templateName]({				
				results: {
					cards: this.filteredCards.toJSON().slice(pg.pageStartIndex, pg.pageEndIndex + 1)
				},
				pagination: pg
			});
			this.$el.html(template);
			
			var view = this;
			this.$el.find('.pagination-container a[data-page-number]').click(function(e) {
				view.config.set({
					page: parseInt($(this).data('page-number'))
				});
				e.preventDefault();
			});
			
			return this;
		}
	});
	
})(db.card);