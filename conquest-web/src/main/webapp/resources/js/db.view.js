var db = db || {};

//
// view
//
db.view = db.view || {};
(function(_view) {

	/**
	 * @memberOf _view
	 */
	_view.renderMessages = function(options) {
		if (options.messages) {

			var messages = [];
			if (_.isArray(options.messages)) {
				messages = options.messages;
			} else {
				messages.push(options.messages);
			}

			var $template = $(Handlebars.templates['global-messages']({
				messages: messages
			}));

			options.$target.prepend($template);

			var hasDangerKind = _.some(messages, function(message) {
				return message.kind == 'danger';
			});

			var hideDelay = options.hideDelay || (hasDangerKind ? 5000 : 2000);
			if (hideDelay > -1) {
				setTimeout(function() {
					$template.fadeOut("slow");
				}, hideDelay);
			}
		}
	};

	_view.showMessageModalDialog = function(options) {

		var $modal = $('#messageModal');
		if ($modal.length > 0) {
			$modal.data('bs.modal', null);
		}
		$modal = $(Handlebars.templates['deck-message-modal'](options));

		if (options.buttonYes && options.buttonYes.handler) {
			$modal.find('#messageButtonYes').click(options.buttonYes.handler);
		}
		if (options.buttonNo && options.buttonNo.handler) {
			$modal.find('#messageButtonNo').click(options.buttonNo.handler);
		}

		$modal.modal();
	};
	
	_view.View = Backbone.View.extend({
		
		events: function() {
			return {
				'click a': 'onViewLinkClick'
			};
		},
		
		/**
		 * @memberOf View
		 */
		makeCardsPopovers: function(options) {
			return this.$popovers = this.$el.find('a.toggle-popover[data-card-id]').popover({
				html: true,
				trigger: 'hover',
				placement: 'auto right',
				delay: {
					show: 500
				},
				template: '<div class="popover popover-card" role="tooltip">' + '<div class="arrow"></div>'
						+ '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div>' + '</div>',
				content: function() {
					return Handlebars.templates['card-text-content'](db.dict.findCard($(this).data('card-id')));
				}
			});
		},
		
		makeTooltips: function(options) {
			return this.$tooltips = this.$el.find('[data-toggle="tooltip"]').tooltip({
				container: 'body',
				trigger: 'hover',
				delay: {
					show: 500
				}
			});
		},
		
		destroyTooltips: function() {
			this.$el.find('[data-toggle="tooltip"]').tooltip('destroy');
		},
		
		onViewLinkClick: function(e) {
			var root = db.static.root;
			var href = $(e.currentTarget).attr('href');
			if (href && href.indexOf(root) == 0 && !e.ctrlKey && !e.shiftKey) {
				$(e.currentTarget).tooltip('hide');
				e.preventDefault();
				db.router.navigate(href.replace(db.static.root, ''), {
					trigger: true
				});
			}
		},

		onNonViewLinkClick: function(e) {
			var data = e.data;
			if (data && data.deck) {
				if (data.deck.history.length > 0) {
					e.preventDefault();

					var href = this.href;
					var options = {
						titleKey: 'core.deck.aboutToLeave.title',
						messageKey: 'core.deck.aboutToLeave.message',
						buttonYes: {
							labelKey: 'core.yes.long' + Math.floor(Math.random() * 2),
							class: 'btn-danger',
							handler: function() {
								window.location.href = href;

							}
						},
						buttonNo: {}
					};
					_view.showMessageModalDialog(options);
				}
			}
		}
	});
	
	_view.PageView = _view.View.extend({
		/**
		 * @memberOf PageView
		 */
		renderMessages: function(options) {
			options = options || {};
			
			_view.renderMessages({
				$target: options.$target || this.$el.find('.container'),
				messages: this.messages
			});
			delete this.messages;
		},
		
		bindMenuLinkClickHandler: function(options) {
			$('.navbar a').on('click', options, this.onViewLinkClick);
		},
		
		unbindMenuLinkClickHandler: function() {
			$('.navbar a').off('click');
		},
		
		rebindMenuLinkClickHandler: function(options) {
			this.unbindMenuLinkClickHandler();
			this.bindMenuLinkClickHandler(options);
		}
	});
	
	_view.CardSetSelectionView = Backbone.View.extend({
		
	});

})(db.view);