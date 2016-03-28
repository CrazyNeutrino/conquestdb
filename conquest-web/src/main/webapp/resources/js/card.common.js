var db = db || {};
db.card = db.card || {};

(function(_card) {
	
	/**
	 * @memberOf _card
	 */
	_card.openCardSetFilterModal = function(filter, options) {
		options = options || {};
		
		var $modal = $('#cardSetFilterModal');
		if ($modal.length > 0) {
			$modal.data('bs.modal', null);
		}
		
		var view = new _card.CardSetFilterView(filter, {
			excludeNightmare: options.excludeNightmare 
		});
		$modal = $(Handlebars.templates['card-set-filter-modal']());
		$modal.find('.card-set-filter-view-ctr').empty().append(view.render().el);

		if (options.applyFilterHandler) {
			$modal.find('#applyFilter').click(function() {
				$modal.modal('hide');
				options.applyFilterHandler(view.buildFilterFromUI());
			});
		}

		$modal.modal();
	};

	_card.CardsFilter = Backbone.NestedModel.extend({
		/**
		 * @memberOf CardsFilter
		 */
		initialize: function(attributes, options) {
			_.bindAll(this, 'filter', 'isEmpty');
		},
		
		filter: function(cards) {
			var taffy = TAFFY(cards);
			var andQuery = {};
			var orQuery = [];

			_.each(db.filter.fds, function(fd) {
				var value = this.get(fd.key);
				if (fd.type == db.filter.FD_TYPE_SET) {					
					if (value && value.length > 0) {
						andQuery[fd.key] = value;
					}
				} else if (fd.type == db.filter.FD_TYPE_RANGE_STAT) {
					var range = value;
					if (range && (range.length == 2 || range.length == 3 && range[2] != true)) {
						andQuery[fd.key] = {
							gte: range[0],
							lte: range[1]
						};
					}
				} else if (fd.type == db.filter.FD_TYPE_SIMPLE) {
					if (value) {
						var obj = {};
						obj[fd.oper] = value;
						andQuery[fd.key] = obj;
					}
				} else if (fd.type == db.filter.FD_TYPE_CUSTOM) {
					if (fd.key == 'anytext' && _.isObject(value)) {
						var anytext = value;
						if (anytext.value) {
							var keys = ['name', 'traits', 'text'];
							var pickedKeys = _.chain(anytext).pick(function(value, key, object) {
								return value == true && _.contains(keys, key);
							}).keys().value();
							if (pickedKeys.length == 0) {
								pickedKeys = keys;
							}
							_.each(pickedKeys, function(key) {
								var obj = {};
								obj[key] = {
									likenocase: anytext.value
								};
								orQuery.push(obj);
							});
						}
					}
				}
			}, this);

			if (orQuery && orQuery.length > 0) {
				return taffy(andQuery, orQuery).get();
			} else {
				return taffy(andQuery).get();
			}
		},
		
		isEmpty: function() {
			return _.isEmpty(this.toJSON());
		},
	});
	
	//
	// card set filter view
	//
	_card.CardSetFilterView = db.view.View.extend({
		className: 'card-set-filter-view',
		
		events: {
			'click li[data-node-type="cycle"] > input[type="checkbox"]': 'onCycleCheckboxClick',
			'click li[data-node-type="cycle"] li[data-node-type="set"] > input[type="checkbox"]': 'onSetInCycleCheckboxClick',
			'click .btn-group.sets-group .btn': 'onSetsGroupClick'
		},
		
		initialize: function(filter, options) {
			this.filter = filter;
			this.excludeNightmare = (options || {}).excludeNightmare;
		},
		
		onCycleCheckboxClick: function(e) {
			var $cycle = $(e.currentTarget);
			if ($cycle.prop('checked') == true) {
				$cycle.siblings().filter('ul').find('input[type="checkbox"]').prop('checked', false);
			}
//			$cycle.siblings().filter('ul').find('input[type="checkbox"]').prop('checked', $cycle.prop('checked'));
		},
		
		onSetInCycleCheckboxClick: function(e) {
			var $set = $(e.currentTarget);
//			var everyChecked = _.every($set.closest('ul').find('input').map(function() {
//				return $(this).prop('checked'); 
//			}), function(checked) {
//				return checked; 
//			});
			$set.closest('ul').siblings().filter('input').prop('checked', everyChecked);
		},
		
		onSetsGroupClick: function(e) {
			var $target = $(e.currentTarget);
			$target.addClass('active').siblings().removeClass('active');
			$('.sets-group-' + $target.data('sets-group')).removeClass('hidden').siblings().addClass('hidden');
		},
		
		applyFilterToUI: function(filter) {
			var sets = filter.sets;
			var cycles = filter.cycles;
			this.$el.find('li:not(:has(ul)) input[type="checkbox"]').each(function() {
				var $this = $(this);
				$this.prop('checked', sets && sets.indexOf($this.val()) > -1);
			});
			this.$el.find('li:has(ul) > input[type="checkbox"]').each(function() {
				var $this = $(this);
				$this.prop('checked', cycles && cycles.indexOf($this.val()) > -1);
			});
		},
		
		buildFilterFromUI: function() {
			var sets = this.$el.find('li:not(:has(ul)) input[type="checkbox"]').filter(':checked').map(function() {
				return $(this).val();
			}).get()
			var cycles = this.$el.find('li:has(ul) > input[type="checkbox"]').filter(':checked').map(function() {
				return $(this).val();
			}).get();
			return {
				sets: sets,
				cycles: cycles
			}
		},
		
		/**
		 * @memberOf CardSetsFilterView
		 */
		render: function() {
			var trees = db.dict.buildCardSetTrees();
			var template = Handlebars.templates['card-set-filter-view']({
				trees: trees
			});
			this.$el.html(template);
			this.applyFilterToUI(this.filter);
			
			return this;
		}
	});
	
})(db.card);