$(function() {

	var PublicDeckView = conquest.deck.PageView.extend({
		events: {
			'click .pub-deck-view a': 'viewLinkClickHandler',
			'click .pub-deck-view i.favourite': 'markFavouriteClickHandler',
			'click .pub-deck-view i.superb': 'markSuperbClickHandler'
		},
		config: new Backbone.Model({
			layout: 'list',
			filter: new Backbone.Model()
		}),
		markClickHandler: function(url) {
			if (conquest.static.user.username) {
				var view = this;
				$.post(url, function(data) {
					view.deck.set({
						userDeckInterest : data.user,
						totalDeckInterest : data.total
					});
					var $icons = $('.deck-icons');
					$icons.find('span.superb').text(data.total.superb);
					$icons.find('span.favourite ').text(data.total.favourite);
					if (data.user.superb === 1) {
						$icons.find('i.superb').removeClass('db-icon-star-empty').addClass('db-icon-star');
					} else {
						$icons.find('i.superb').removeClass('db-icon-star').addClass('db-icon-star-empty');
					}
					if (data.user.favourite === 1) {
						$icons.find('i.favourite').removeClass('db-icon-heart-empty').addClass('db-icon-heart');
					} else {
						$icons.find('i.favourite').removeClass('db-icon-heart').addClass('db-icon-heart-empty');
					}
				});
			}
		},
		markFavouriteClickHandler: function(event) {
			var $target = $(event.target);
			var deckId = $target.parents('.deck').data('deck-id');
			var value = $target.hasClass('db-icon-heart-empty') ? 1 : 0;
			this.markClickHandler('/deck/public/' + deckId + '/favourite/' + value);
		},
		markSuperbClickHandler: function(event) {
			var $target = $(event.target);
			var deckId = $target.parents('.deck').data('deck-id');
			var value = $target.hasClass('db-icon-star-empty') ? 1 : 0;
			this.markClickHandler('/deck/public/' + deckId + '/superb/' + value);
		},
		updateStats: function() {
			var stats = this.deck.computeStats();
			stats.cost.name = 'card.cost.sh';
			stats.shield.name = 'card.shieldIcons.sh';
			stats.command.name = 'card.commandIcons.sh';
			stats.attack.name = 'card.attack.sh';
			stats.hitPoints.name = 'card.hp.sh';

			var template = Handlebars.templates['deck-stats-table']({
				stats: stats
			});
			this.$el.find('.deck-stats-container').html(template);
			this.$el.find('.deck-stats-container [data-toggle="tooltip"]').tooltip({
				container: 'body',
				trigger: 'hover click'
			});
		},
		render: function(options) {
			var view = this;

			var renderPublishedDecksList = function() {
				var template = Handlebars.templates['deck-published-decks-list']({
					decks: view.deck.get('snapshots').toJSON()
				}); 
				view.$el.find('#deckPublishedDecksBlock').html(template);
				view.$el.find('#deckPublishedDecksBlock [data-toggle="tooltip"]').tooltip({
					container: 'body'
				});
			}

			var renderInternal = function() {
				var warlordId = view.deck.get('warlord').id;
				var warlord = conquest.dict.findCard(warlordId);
				
				conquest.ui.adjustWrapperStyle();
				
				var filter = {
					factions: conquest.deck.getValidDeckFactions(warlordId),
					cardTypes: conquest.deck.getValidDeckCardTypes(warlordId)
				};
				var template = Handlebars.templates['pub-deck-view']({
					deck: view.deck.toJSON(),
					filter: filter
				});
				view.$el.html(template);
				var actionsTemplate = Handlebars.templates['deck-actions']({
					actions: {						
						publicdecklist: {},
						publicdecksave: {
							showText: true
						},
						publicdeckexport: {
							id: view.deck.get('id')
						}
					},
					faction: warlord.faction
				});
				view.$el.find('.actions-container').append(actionsTemplate);

				view.deckDescriptionView = new conquest.deck.DeckDescriptionView();
				view.deckDescriptionView.render(view.deck);
				view.deckCommentsView = new conquest.deck.DeckCommentsView();
				view.updateStats();
				view.renderMessages();

				renderPublishedDecksList();
				view.deckCommentsView.render(view.deck, view);

				view.$el.find('a[data-image-base]').popover({
					html: true,
					trigger: 'hover',
					content: function() {
						return conquest.ui.writeCardImgElem($(this).data('image-base'), {
							class: 'card-md'
						});
					}
				});

				var deckId = view.deck.get('id');
				var deckTechName = view.deck.get('techName');

				var filter = function() {
					var factions = $('.btn-group.btn-group-filter.filter-faction > .btn.active').map(function() {
						return $(this).data('faction');
					}).get();
					if (factions.length == 0) {
						factions = undefined;
					}
					var types = $('.btn-group.btn-group-filter.filter-type > .btn.active').map(function() {
						return $(this).data('type');
					}).get();
					if (types.length == 0) {
						types = undefined;
					}

					var cardName = undefined;
					var cardTrait = undefined;
					var cardKeyword = undefined;
					var text = undefined;

					if (view.searchbar) {
						var suggestion = view.searchbar.suggestion;
						var dataset = view.searchbar.dataset;
						text = view.searchbar.text;
						if (suggestion && dataset) {
							if (dataset == 'cards') {
								cardName = suggestion.name;
							} else if (dataset == 'traits') {
								cardTrait = suggestion.description;
							} else if (dataset == 'keywords') {
								cardKeyword = suggestion.description;
							}
						}
					}

					var filteredMembers = view.deck.get('members').filter(function(member) {
						var card = member.get('card');
						var cardSelection = member.get('quantity') === 0 ? 'not-selected' : 'selected';
						var matches = (!factions || factions.indexOf(card.faction) > -1) && (!types || types.indexOf(card.type) > -1);
						if (cardName) {
							matches = matches && card.name == cardName;
						} else if (cardTrait) {
							matches = matches && card.trait && card.trait.indexOf(cardTrait) > -1;
						} else if (cardKeyword) {
							matches = matches && card.keyword && card.keyword.indexOf(cardKeyword) > -1;
						} else if (text) {
							text = text.toLowerCase();
							matches = matches && (card.name.toLowerCase().indexOf(text) > -1 || card.trait && card.trait.toLowerCase().indexOf(text) > -1 || card.keyword && card.keyword.toLowerCase().indexOf(text) > -1);
						}
						return matches;
					});

					view.deck.get('filteredMembers').reset(filteredMembers);
				};

				view.config.get('filter').set({
					sets: _.pluck(_.where(conquest.dict.sets, {
						released: true
					}), 'techName')
				});

				view.membersListView = new conquest.deck.MembersListView({
					el: '.members-container'
				});
				view.membersListView.listenTo(view.deck.get('filteredMembers'), 'reset', function(filteredMembers) {
					this.render(filteredMembers, {
						layout: view.config.get('layout'),
						readOnly: true
					});
				});
				view.groupsView = new conquest.deck.MemberGroupsView({
					el: '.mg-container'
				});
				view.listenTo(view.config, 'change:layout', function(config) {
					view.membersListView.render(view.deck.get('filteredMembers'), {
						layout: config.get('layout'),
						readOnly: true
					});
				});
				view.listenTo(view.config, 'change:filter', function(config) {
					filter();
				});

				$('.btn-group.select-many > .btn').click(function(event) {
					var $this = $(this);
					if (event.ctrlKey) {
						$this.addClass('active').siblings().removeClass('active');
					} else {
						$this.toggleClass('active');
					}
					filter();
				});

				$('.btn-group.btn-group-layout > .btn').click(function() {
					var $this = $(this);
					$this.addClass('active').siblings().removeClass('active');
					view.config.set({
						layout: $this.data('layout')
					});
				});

				var layout = view.config.get('layout');
				$('.btn-group.btn-group-layout > .btn[data-layout="' + layout + '"]').addClass('active');

				//
				// save deck copy
				//
				$('a.deck-save-copy').click(function() {
					conquest.deck.showDeckSaveCopyModal(view.deck);
				});


				//
				// export deck
				//
				conquest.deck.prepareExportModalDialog(view.deck);

				//
				// tooltips
				//				
				view.$el.find('.members-list-filter-container[data-toggle="tooltip"]').tooltip({
					container: 'body'
				});

				view.$el.find('[data-toggle="tooltip"]').tooltip({
					container: 'body',
					trigger: 'hover'
				});

				//
				// draw
				//				
				var $buttons = view.$el.find('.btn-group-draw .btn');
				$buttons.click(function() {
					var $drawContainer = $('.draw-container');

					var draw = function(quantity) {
						if (_.isUndefined(view.shuffledCards)) {
							view.shuffledCards = conquest.util.membersShuffle(view.deck.get('members'));
							view.shuffledCardsIndex = 0;
							$drawContainer.empty();
						}

						var drawn = 0;
						while (view.shuffledCardsIndex < view.shuffledCards.length && drawn < quantity) {
							var imageBase = view.shuffledCards[view.shuffledCardsIndex].imageBase;
							var attrs = {
								class: 'card-xs'
							};
							$('<a />').data('image-base', imageBase).append(conquest.ui.writeCardImgElem(imageBase, attrs)).popover({
								html: true,
								trigger: 'hover',
								content: function() {
									return conquest.ui.writeCardImgElem($(this).data('image-base'), {
										class: 'card-md'
									});
								}
							}).appendTo($drawContainer);
							view.shuffledCardsIndex += 1;
							drawn += 1;
						}
					};

					var quantity = undefined;
					var $button = $(this);
					if ($buttons.index($button) == 0) {
						view.shuffledCards = undefined;
						quantity = view.deck.get('warlord').startingHandSize;
					} else if ($buttons.index($button) == 1) {
						view.shuffledCards = undefined;
						quantity = view.deck.get('members').reduce(function(total, member) {
							return total + member.get('quantity');
						}, 0);
					} else {
						quantity = parseInt($button.text());
					}

					draw(quantity);
				});

				//
				// search
				//

				// constructs the suggestion engine
				var cards = new Bloodhound({
					datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
					queryTokenizer: Bloodhound.tokenizers.whitespace,
					local: $.map(view.deck.get('members').toJSON(), function(member) {
						return {
							name: member.card.name,
							card: member.card
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

				var $typeahead = $('#search').typeahead({
					hint: true,
					highlight: true,
					minLength: 1
				}, {
					name: 'cards',
					displayKey: 'name',
					source: cards.ttAdapter(),
					templates: {
						suggestion: Handlebars.compile('{{name}}&nbsp;<span class="tt-no-highlight">{{card.setName}} | {{card.factionDisplay}} | {{card.typeDisplay}} | {{card.trait}}</span>'),
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

				$typeahead.on('typeahead:selected', function($event, suggestion, dataset) {
					console.log('selected' + $event);
					view.searchbar = {
						suggestion: suggestion,
						dataset: dataset
					};
				}).on('typeahead:autocompleted', function($event, suggestion, dataset) {
					console.log('autocompleted' + $event);
					view.searchbar = {
						suggestion: suggestion,
						dataset: dataset
					};
				}).on('typeahead:closed', function($event) {
					console.log('closed' + $event);
					view.searchbar.text = $('#search').typeahead('val');
				}).on('typeahead:opened', function($event) {
					console.log('opened' + $event);
					view.searchbar = {};
				}).on('keyup', function($event) {
					if ($event.keyCode == 13) {
						$('#search').typeahead('close');
						filter();
					}
				});

				view.groupsView.render(view.deck.get('members'), {
					readOnly: true
				});
				filter();

				$('.twitter.popup').click(function(event) {
					var width = 575,
						height = 400,
						left = ($(window).width() - width) / 2,
						top = ($(window).height() - height) / 2,
						url = 'http://twitter.com/share',
						opts = 'status=1' +
						',width=' + width +
						',height=' + height +
						',top=' + top +
						',left=' + left;

					window.open(url, 'twitter', opts);

					return false;
				});

				// $('.facebook.popup').click(function(event) {
				// 	// FB.ui({
				// 	//   method: 'share',
				// 	//   href: document.URL,
				// 	// }, function(response){});

				// 	FB.ui({
				// 	  method: 'feed',
				// 	  link: 'https://developers.facebook.com/docs/',
				// 	  caption: 'An example caption',
				// 	}, function(response){});
				// });
			};

			if (options.deck) {
				view.deck = options.deck;
				view.deck.set({
					snapshots: new conquest.model.PublicDecks()
				});
				view.deck.get('snapshots').fetch({
					data: {
						snapshotBaseId: view.deck.get('snapshotBaseId')
					},
					success: function(decks, response, options) {
						renderPublishedDecksList();
					}
				});
				view.deck.get('comments').fetch({
					success: function(comments, response, options) {
						view.deckCommentsView.render(view.deck, view);
					}
				});
				renderInternal();
			} else if (options.deckId) {
				view.deck = new conquest.model.PublicDeck({
					id: options.deckId
				});
				view.deck.fetch({
					success: function(deck, response, options) {
						renderInternal();
					},
					error: function(deck, response, options) {
						view.messages = conquest.deck.buildErrorMessage({
							error: response.responseJSON,
							message: 'core.deck.load.error'
						})
						view.renderMessages({
							hideDelay: -1
						});
					}
				});
			}
		}
	});

	var PublicDeckListView = conquest.deck.PageView.extend({
		events: {
			'click #publicDeckListView a': 'viewLinkClickHandler'
		},
		decks: new conquest.model.PublicDecks(),
		filter: {},
		filterAdvanced: false,
		render: function(queryString) {
			var view = this;

			var queryDeckList = function(pageNumber) {
				view.filter = view.deckListFilterView.buildFilterFromUI();

				var data = _.clone(view.filter);
				data.pageNumber = _.isNumber(pageNumber) ? pageNumber : 1;
				data.pageSize = 20;
				view.decks.fetch({
					data: data,
					success: function() {
						view.deckListDataView.render(view.decks, {
							pageClickHandler: queryDeckList
						});
					}
				});
			};

			view.unbindMenuLinkClickHandler();
			conquest.ui.adjustWrapperStyle({
				backgroundColor: '#f2f2f2'
			});
			
			var template = Handlebars.templates['pub-deck-list-view']();
			view.$el.html(template);
			view.renderMessages();

			var sortItems = [];
			_.each([
				['publishDate', 'core.publishDate'],
				['username', 'core.username'],
				['name', 'core.name'],
				['warlord', 'core.warlord'],
				['cardsQuantity', 'core.cardsQuantity'],
				['armyCardsQuantity', 'core.cardsQuantity.army'],
				['attachmentCardsQuantity', 'core.cardsQuantity.attachment'],
				['eventCardsQuantity', 'core.cardsQuantity.event'],
				['supportCardsQuantity', 'core.cardsQuantity.support']
			], function(arr) {
				sortItems.push({
					value: arr[0],
					label: conquest.dict.messages[arr[1]]
				})
			});
			view.deckListFilterView = new conquest.deck.DeckListFilterView({
				config: {
					showPublishDate: true,
					showModifyDate: true,
					showUsername: true,
					showTournamentFilter: true,
					sortItems: sortItems
				}
			});
			view.deckListFilterView.state.on('change:advanced', function(state) {
				view.filterAdvanced = state.get('advanced');
			});
			view.deckListFilterView.render({
				filter: view.filter,
				advanced: view.filterAdvanced,
				searchClickHandler: queryDeckList
			});
			view.deckListDataView = new conquest.deck.DeckListDataView();
			if (view.decks.length > 0) {
				view.deckListDataView.render(view.decks, {
					pageClickHandler: queryDeckList,
					pageNumber: view.pageNumber
				});
			} else {
				queryDeckList();
			}
		}
	});

	var Router = Backbone.Router.extend({
		routes: {
			':deckIdWithName': 'viewPublicDeck',
			'(?:queryString)': 'viewPublicDeckList',
		}
	});

	var publicDeckView = new PublicDeckView();
	var publicDeckListView = new PublicDeckListView();

	conquest.router = new Router();
	conquest.router.on('route:viewPublicDeck', function(deckIdWithName) {
		if (deckIdWithName) {
			var deckId = /^\w+/.exec(deckIdWithName)[0];
			if (/^\d+$/.test(deckId)) {
				deckId = parseInt(deckId);
			}

			publicDeckView.render({
				deckId: deckId,
				deck: publicDeckListView.decks.findWhere({
					id: deckId
				})
			});
			$('html,body').scrollTop(0);
			ga('set', 'page', conquest.static.root + deckId);
			ga('send', 'pageview');
		}
	}).on('route:viewPublicDeckList', function(queryString) {
		publicDeckListView.render(queryString);
		$('html,body').scrollTop(0);
		ga('set', 'page', conquest.static.root);
		ga('send', 'pageview');
	});
	
	conquest.static.root = '/' + conquest.static.language + '/public/deck/';

	Backbone.history.start({
		pushState: true,
		root: conquest.static.root
	});
});