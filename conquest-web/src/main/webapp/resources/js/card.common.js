var conquest = conquest || {};
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
				} else if (fd.type === conquest.filter.FD_TYPE_SIMPLE/* && fd.key != 'anyText'*/) {
					if (value) {
						var obj = {};
						obj[fd.oper] = value;
						query[fd.key] = obj;
					}
				}
			});

			/* var anyText = this.get('anyText');
			if (anyText && !(query.techName || query.keyword || query.trait)) {
				query2 = [];
				_.each(['name', 'keyword', 'trait', 'text'], function(key) {
					var obj = {};
					obj[key] = { 
						likenocase: anyText
					};
					query2.push(obj);
				});				
			} */

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

			var filterContent = Handlebars.templates['card-set-filter-popover-view']({
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

			var filterContent = Handlebars.templates['card-stat-filter-popover-view']({});
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