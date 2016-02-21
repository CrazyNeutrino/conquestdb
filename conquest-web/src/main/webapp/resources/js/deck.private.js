$(function() {

	var showDeckPublishModal = function(deck, options) {

		var publish = function($modal, name, description) {
			var attributes = {
				name: name,
				description: description,
				type: 'snapshot',
				snapshotBaseId: deck.get('id'),
				snapshotPublic: true,
				tournamentType: $modal.find('.btn-group.tournament-type > .btn.active').data('tournament-type'),
				tournamentPlace: $modal.find('.btn-group.tournament-place > .btn.active').data('tournament-place'),
			};

			var json = deck.getBackupJson();
			delete json.id;
			delete json.name;
			delete json.description;

			var snapshot = new conquest.model.PrivateDeck(json, {
				parse: true
			});

			snapshot.listenToOnce(snapshot, 'invalid', function(snapshot) {
				conquest.deck.renderMessages({
					$target: $modal.find('.modal-body'),
					messages: conquest.deck.buildErrorMessage({
						message: snapshot.validationError
					})
				});
			});

			snapshot.save(attributes, {
				success: function(snapshot, response, options) {
					conquest.deck.renderMessages({
						$target: $modal.find('.modal-body'),
						messages: conquest.deck.buildSuccessMessage({
							message: 'ok.deck.oper.publish'
						})
					});
					deck.get('snapshots').unshift(snapshot);
				},
				error: function(snapshot, response, options) {
					conquest.deck.renderMessages({
						$target: $modal.find('.modal-body'),
						messages: conquest.deck.buildErrorMessage({
							error: response.responseJSON,
							message: 'error.deck.oper.publish'
						})
					});
				}
			});
		};

		conquest.deck.showDeckDescriptionModal(deck, {
			title: 'core.publishDeck',
			button: {
				id: 'deckPublishButton',
				glyphiconClass: 'glyphicon-share',
				btnClass: 'btn-success',
				title: 'core.publish',
				clickHandler: publish
			},
			publish: {}
		});
	};

	var showDeckEditSnapshotModal = function(snapshot, modalOptions) {

		var editSnapshot = function($modal, name, description) {
			var attributes = {
				name: name,
				description: description,
				tournamentType: $modal.find('.btn-group.tournament-type > .btn.active').data('tournament-type'),
				tournamentPlace: $modal.find('.btn-group.tournament-place > .btn.active').data('tournament-place')
			};

			snapshot.listenToOnce(snapshot, 'invalid', function(snapshot) {
				conquest.deck.renderMessages({
					$target: $modal.find('.modal-body'),
					messages: conquest.deck.buildErrorMessage({
						message: snapshot.validationError
					})
				});
			});

			snapshot.save(attributes, {
				success: function(snapshot, response, options) {
					conquest.deck.renderMessages({
						$target: $modal.find('.modal-body'),
						messages: conquest.deck.buildSuccessMessage({
							message: 'ok.deck.oper.modify'
						})
					});
					if (modalOptions.success) {
						modalOptions.success();
					}
				},
				error: function(snapshot, response, options) {
					conquest.deck.renderMessages({
						$target: $modal.find('.modal-body'),
						messages: conquest.deck.buildErrorMessage({
							error: response.responseJSON,
							message: 'error.deck.oper.modify'
						})
					});
				}
			});
		};

		conquest.deck.showDeckDescriptionModal(snapshot, {
			title: 'core.editPublishedVersion',
			button: {
				id: 'deckEditSnapshotButton',
				glyphiconClass: 'glyphicon-pencil',
				btnClass: 'btn-success',
				title: 'core.edit',
				clickHandler: editSnapshot
			},
			publish: {}
		});
	};

	var ViewBase = Backbone.View.extend({
		el: '.content',
		viewLinkClickHandler: function(event) {
			var root = conquest.static.root;
			var href = $(event.currentTarget).attr('href');
			if (href && href.indexOf(root) == 0 && !event.ctrlKey && !event.shiftKey) {
				$(event.currentTarget).tooltip('hide');
				event.preventDefault();
				conquest.router.navigate(href.replace(conquest.static.root, ''), {
					trigger: true
				});
			}
		},
		renderMessages: function(options) {
			conquest.deck.renderMessages({
				$target: this.$el.find('.content-band .container .content'),
				messages: this.messages
			});
			delete this.messages;
		},
		nonViewLinkClickHandler: function(event) {
			var data = event.data;
			if (data && data.deck) {
				if (data.deck.history.length > 0) {
					event.preventDefault();

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
					conquest.deck.showMessageModalDialog(options);
				}
			}
		},
		bindMenuLinkClickHandler: function() {
			$('.navbar a').on('click', {
				deck: this.deck
			}, this.nonViewLinkClickHandler);
		},
		unbindMenuLinkClickHandler: function() {
			$('.navbar a').off('click');
		}
	});

	var UserDeckListView = ViewBase.extend({
		events: {
			'click .user-deck-list-view a': 'viewLinkClickHandler'
		},
		decks: new conquest.model.PrivateDecks(),
		filter: {},
		filterAdvanced: false,
		render: function() {
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
			
			var template = Handlebars.templates['user-deck-list-view']();
			view.$el.html(template);
			view.renderMessages();
			var actionsTemplate = Handlebars.templates['deck-actions']({
				actions: {
					decknew: {
						showText: true
					},
					deckimport: {
						showText: true
					},
					deckexportall: {
						showText: true
					}
				}
			});
			view.$el.find('.actions-container').append(actionsTemplate);

			var sortItems = [];
			_.each([
				['createDate', 'core.createDate'],
				['modifyDate', 'core.modifyDate'],
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
					showCreateDate: true,
					showModifyDate: true,
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

	var UserDeckImportView = ViewBase.extend({
		events: {
			'click .user-deck-import-view a': 'viewLinkClickHandler'
		},
		render: function(id) {
			var view = this;

			var template = Handlebars.templates['user-deck-import-view']();
			var actionsTemplate = Handlebars.templates['deck-actions']({
				actions: {
					decknew: {
						showText: true
					},
					decklist: {
						showText: true
					}
				}
			});
			view.$el.html(template);
			view.$el.find('.actions-container').append(actionsTemplate);
			conquest.ui.adjustWrapperStyle();

			view.groupsView = new conquest.deck.MemberGroupsView({
				el: '.mg-container'
			});

			$('#parseDeckButton').click(function() {
				var cleanName = function(name) {
					return s(name.toLowerCase()).clean().slugify().value();
				};
				var index = _.indexBy(conquest.dict.cards, function(card) {
					return cleanName(card.name);
				});
				var indexEn = _.indexBy(conquest.dict.cards, function(card) {
					return cleanName(card.nameEn);
				});
				var pattern = /(?:([1-4])x?)?([^\(\)]+)(?:\((.+)\))?/;

				var warnings = [];
				var errors = [];
				var warlordId = undefined;
				var members = [];

				var lines = s.lines($('textarea').val());

				_.each(lines, function(line) {
					if (s.isBlank(line)) {
						return;
					}
					var startsWithTypeName = _.some(conquest.dict.cardTypes, function(cardType) {
						var tmp = s(line).trim().toLowerCase();
						return tmp.startsWith(cardType.name.toLowerCase()) || tmp.startsWith(cardType.nameEn.toLowerCase());
					});
					if (startsWithTypeName) {
						return;
					}

					var tokens = pattern.exec(s.trim(line.toLowerCase()));
					if (tokens != null) {
						var cn = cleanName(tokens[2]);
						var card = index[cn] || indexEn[cn];
						if (_.isUndefined(card)) {
							warnings.push(conquest.dict.messages['core.skipped'] + ': ' + line);
							return;
						}

						if (card.type === 'warlord') {
							warlordId = card.id;
						} else {
							members.push({
								cardId: card.id,
								quantity: parseInt(tokens[1])
							});
						}
					} else {
						warnings.push(conquest.dict.messages['core.skipped'] + ': ' + line);
					}
				});

				if (_.isUndefined(warlordId)) {
					errors.push(conquest.dict.messages['error.deck.warlord.notFound']);
				} else {
					var vdms = conquest.deck.getValidDeckMembers(warlordId);
					var vdmsIndex = _.indexBy(vdms, function(vdm) {
						return vdm.cardId;
					});
					_.each(members, function(member) {
						var vdm = vdmsIndex[member.cardId];
						if (_.isUndefined(vdm)) {
							errors.push(conquest.dict.messages['error.deck.invalidCard'] + ': ' + conquest.dict.findCard(member.cardId).name);
						} else {
							var card = conquest.dict.findCard(member.cardId);
							if (_.isNumber(card.warlordId)) {
								vdm.quantity = card.quantity;
							} else if (_.isNumber(member.quantity)) {
								vdm.quantity = Math.max(1, Math.min(3, member.quantity));
							} else {
								vdm.quantity = 1;
							}
						}
					});
				}

				var deck = undefined;
				if (_.isUndefined(warlordId)) {
					view.$el.find('.mg-container').empty();
				} else {
					deck = new conquest.model.PrivateDeck({
						type: 'base',
						warlordId: warlordId,
						members: vdms,
						configCsQuantity: 3						
					}, {
						parse: true
					});
					view.groupsView.render(deck.get('members'), {
						readOnly: false
					});
				}

				if (errors.length == 0) {
					view.$el.find('#editDeckButton').removeClass('disabled').click(function() {
						userDeckEditView.render({
							deck: deck
						});
						var warlord = conquest.dict.findCard(deck.get('warlordId'));
						conquest.router.navigate('new/' + warlord.id + '-' + warlord.techName);
					});
				} else {
					view.$el.find('#editDeckButton').addClass('disabled').off('click');
				}

				var $container = view.$el.find('.problems-container').empty();
				if (errors.length > 0) {
					$container.append(
						Handlebars.templates['commons-ul']({
							listTitle: conquest.dict.messages['core.errors'] + ':',
							listItems: errors,
							listContainerStyle: 'alert alert-danger'
						})
					);
				}
				if (warnings.length > 0) {
					$container.append(
						Handlebars.templates['commons-ul']({
							listTitle: conquest.dict.messages['core.warnings'] + ':',
							listItems: warnings,
							listContainerStyle: 'alert alert-warning'
						})
					);
				}
			});
		}
	});

	var UserDeckCreateView = ViewBase.extend({
		events: {
			'click .user-deck-create-view a': 'viewLinkClickHandler'
		},
		render: function() {
			this.unbindMenuLinkClickHandler();
			conquest.ui.adjustWrapperStyle();

			var warlords = _.where(conquest.dict.cards, {
				type: 'warlord'
			});
			warlords = _.sortBy(warlords, function(warlord) {
				return warlord.factionDisplay + '#' + warlord.name;
			});
			var template = Handlebars.templates['user-deck-create-view']({
				warlords: warlords
			});
			this.$el.html(template);
			this.$el.find('.actions-container').append(
				Handlebars.templates['deck-actions']({
					actions: {
						decklist: {
							showText: true
						},
						deckimport: {
							showText: true
						}
					}
				}));

			var view = this;
			$('tbody tr').mouseenter(
				function() {
					var $this = $(this).addClass('highlight');
					var attrs = {
						class: 'card-lg'
					};
					var imgElem = conquest.ui.writeCardImgElem($this.data('card-image-base'), attrs);
					var $container = view.$el.find('.card-container').empty().append(imgElem);
					// _.each(conquest.dict.findSignSquadCards(91), function(card) {
					// 	var attrs = {class: 'card-sm', style: 'margin: 0px 10px 10px 0px;'};
					// 	var imgElem = conquest.ui.writeCardImgElem(card.imageBase, attrs);
					// 	$container.append(imgElem);
					// });
				}).mouseleave(function() {
				$(this).removeClass('highlight');
				view.$el.find('.card-container').empty();
			});
		}
	});

	var UserDeckEditView = ViewBase.extend({
		events: {
			'click .user-deck-edit-view a': 'viewLinkClickHandler'
		},
		initialize: function() {
			this.config = new Backbone.Model({
				layout: 'list',
				filter: new Backbone.Model()
			});			
		},	
		viewLinkClickHandler: function(event) {
			var root = conquest.static.root;
			var href = $(event.currentTarget).attr('href');
			if (href && href.indexOf(root) == 0 && !event.ctrlKey && !event.shiftKey) {
				$(event.currentTarget).tooltip('hide');
				event.preventDefault();

				var navigateHandler = function() {
					conquest.router.navigate(href.replace(conquest.static.root, ''), {
						trigger: true
					});
				};

				if (this.deck.history.length > 0) {
					var options = {
						titleKey: 'core.deck.aboutToLeave.title',
						messageKey: 'core.deck.aboutToLeave.message',
						buttonYes: {
							labelKey: 'core.yes.long' + Math.floor(Math.random() * 2),
							class: 'btn-danger',
							handler: navigateHandler
						},
						buttonNo: {}
					};
					conquest.deck.showMessageModalDialog(options);
				} else {
					navigateHandler();
				}
			}
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
		buildFilterFromUI: function() {
			var filter = {};
			filter.layout = this.$el.find('.btn-group-layout .btn.active').map(function() {
				return $(this).data('layout');
			}).get();
			filter.faction = this.$el.find('.btn-group-filter.filter-faction .btn.active').map(function() {
				return $(this).data('faction');
			}).get();
			filter.type = this.$el.find('.btn-group-filter.filter-type .btn.active').map(function() {
				return $(this).data('type');
			}).get();
			filter.selection = this.$el.find('.btn-group-filter.filter-selection .btn.active').map(function() {
				return $(this).data('selection');
			}).get();
			filter.sorting = this.$el.find('.sort-control').map(function() {
				return $(this).val();
			});

			filter = _.extend(filter, _.pick(this.config.get('filter').toJSON(), 'cost', 'shield', 'command', 'attack', 'hitPoints', 'setTechName', 'name', 'trait', 'keyword'));

			_.each(Object.keys(filter), function(key) {
				var value = filter[key];
				if (_.isString(value)) {
					value = $.trim(value);
				}
				if ((_.isObject(value) || _.isString(value)) && _.isEmpty(value)) {
					delete filter[key];
				}
			});

			return filter;
		},
		applyFilterToUI: function(filter) {
			this.$el.find('.btn-group-layout .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.layout, $this.data('layout'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group-filter.filter-faction .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.faction, $this.data('faction'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group-filter.filter-type .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.type, $this.data('type'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group-filter.filter-selection .btn').each(function() {
				var $this = $(this);
				if (_.contains(filter.selection, $this.data('selection'))) {
					$this.addClass('active');
				}
			});
			this.$el.find('.sort-control').each(function(index) {
				if (filter.sorting && filter.sorting.length > index) {
					$(this).val(filter.sorting[index]);
				}
			});
		
			this.config.get('filter').set(_.pick(filter, 'cost', 'shield', 'command', 'attack', 'hitPoints', 'setTechName', 'name', 'trait', 'keyword'));
		},
		render: function(options) {
			var view = this;

			options = options || {};

			var renderPrivateLinksList = function() {
				var template = Handlebars.templates['deck-private-link-list']({
					deck: view.deck.toJSON()
				});
				view.$el.find('#deckPrivateLinkBlock').html(template);

				//
				// delete private link
				//
				view.$el.find('#deckPrivateLinkList .btn').click(function() {
					var linkId = parseInt($(this).closest('tr').data('id'));
					var deleteHandler = function() {
						view.deck.get('links').findWhere({
							id: linkId
						}).destroy({
							wait: true,
							success: function(link, response, options) {
								view.messages = [{
									kind: 'success',
									title: 'core.ok',
									message: 'ok.deck.oper.deleteLink'
								}];
								view.renderMessages();
							},
							error: function(link, response, options) {
								view.messages = conquest.deck.buildErrorMessage({
									error: response.responseJSON,
									message: 'error.deck.oper.deleteLink'
								});
								view.renderMessages();
							}
						});
					};

					var options = {
						titleKey: 'core.deck.aboutToDeleteLink.title',
						messageKey: 'core.deck.aboutToDeleteLink.message',
						buttonYes: {
							labelKey: 'core.yes.long' + Math.floor(Math.random() * 2),
							class: 'btn-danger',
							handler: deleteHandler
						},
						buttonNo: {}
					};

					conquest.deck.showMessageModalDialog(options);
				});
			};

			var renderPublishedDecksList = function() {
				var template = Handlebars.templates['deck-published-decks-list']({
					decks: view.deck.get('snapshots').toJSON(),
					editable: true
				});
				view.$el.find('#deckPublishedDecksBlock').html(template);
				view.$el.find('#deckPublishedDecksBlock [data-toggle="tooltip"]').tooltip({
					container: 'body'
				});

				//
				// edit published deck
				//
				view.$el.find('.deck-oper-edit').click(function() {
					showDeckEditSnapshotModal(view.deck.get('snapshots').findWhere({
						id: parseInt($(this).closest('tr').data('id'))
					}), {
						success: renderPublishedDecksList
					});
				});

				//
				// delete published deck
				//				
				view.$el.find('.deck-oper-delete').click(function() {
					var deckId = parseInt($(this).closest('tr').data('id'));
					var deleteHandler = function() {
						view.deck.get('snapshots').findWhere({
							id: deckId
						}).destroy({
							wait: true,
							success: function(snapshot, response, options) {
								view.messages = conquest.deck.buildSuccessMessage({
									message: 'ok.deck.oper.delete'
								});
								view.renderMessages();
							},
							error: function(snapshot, response, options) {
								view.messages = conquest.deck.buildErrorMessage({
									error: response.responseJSON,
									message: 'error.deck.oper.delete'
								});
								view.renderMessages();
							}
						});
					};

					var options = {
						titleKey: 'core.deck.aboutToDelete.title',
						messageKey: 'core.deck.aboutToDelete.message',
						buttonYes: {
							labelKey: 'core.yes.long' + Math.floor(Math.random() * 2),
							class: 'btn-danger',
							handler: deleteHandler
						},
						buttonNo: {}
					};

					conquest.deck.showMessageModalDialog(options);
				});
			};

			var renderInternal = function() {
				var warlordId = view.deck.get('warlord').id;
				var warlord = conquest.dict.findCard(warlordId);
				
				conquest.ui.adjustWrapperStyle();
				
				var filter = {
					factions: conquest.deck.getValidDeckFactions(warlordId),
					cardTypes: conquest.deck.getValidDeckCardTypes(warlordId)
				};
		
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
				], function(arr) {
					sortItems.push({
						value: arr[0],
						label: conquest.dict.messages[arr[1]]
					})
				});

				var template = Handlebars.templates['user-deck-edit-view']({
					deck: view.deck.toJSON(),
					filter: filter,
					sortItems: sortItems
				});
				var f = view.buildFilterFromUI();
				view.$el.html(template);
				view.applyFilterToUI(f);

				view.deckDescriptionView = new conquest.deck.DeckDescriptionView();
				view.deckDescriptionView.render(view.deck);

				renderPrivateLinksList();
				renderPublishedDecksList();
				view.updateStats();
				view.renderMessages();

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
				view.$el.find('.actions-container').append(Handlebars.templates['deck-actions']({
					actions: {
						decknew: {},
						deckimport: {},
						deckexport: _.isNumber(deckId) ? {
							id: deckId
						} : undefined,
						deckview: _.isNumber(deckId) ? {
							id: deckId,
							techName: deckTechName
						} : undefined,
						decksave: {
							showText: true
						},
						deckdelete: _.isNumber(deckId) ? {} : undefined,
						decklist: {},
					},
					faction: warlord.faction
				}));

				var buildSortKeys = function() {
					var sortKeys = [];
					$('.sort-control').each(function() {
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
				}; // end:buildSortKeys

				var buildMembersComparator = function() {
					var sortKeys = buildSortKeys();
					var hasNonDefaultSortKeys = _.some(sortKeys, function(sortKey) {
						return sortKey && sortKey != 'default';
					});
					if (hasNonDefaultSortKeys) {
						return conquest.util.buildMembersComparator(sortKeys);
					} else {
						return conquest.util.buildMembersDefaultComparator(view.deck.get('warlord').faction);
					}
				}; // end:buildMembersComparator

				var filterMembers = function() {
					var cardsFilter = new conquest.card.CardsFilter();
					var cardsFilterAttrs = {
						faction: $('.btn-group.btn-group-filter.filter-faction > .btn.active').map(function() {
							return $(this).data('faction');
						}).get(),
						type: $('.btn-group.btn-group-filter.filter-type > .btn.active').map(function() {
							return $(this).data('type');
						}).get()
					};

					var membersFilter = view.config.get('filter');
					var attrNames = ['cost', 'shield', 'command', 'attack', 'hitPoints', 'techName', 'trait', 'keyword', 'setTechName', 'text'];
					_.each(attrNames, function(attrName) {
						cardsFilterAttrs[attrName] = membersFilter.get(attrName);
					});
					cardsFilter.set(cardsFilterAttrs);					

					var cards = _.pluck(view.deck.get('members').toJSON(), 'card');
					var ids = _.pluck(cardsFilter.filter(cards), 'id');

					var quantities = $('.btn-group.btn-group-filter.filter-selection > .btn.active').map(function() {
						var selection = $(this).data('selection');
						if (selection === 'not-selected') {
							return 0;
						} else if (selection === 'selected') {
							return [1, 2, 3, 4];
						}
					}).get();
					quantities = quantities.length == 0 ? undefined : _.flatten(quantities);
					var filteredMembers = view.deck.get('members').filter(function(member) {
						return (!quantities || _.contains(quantities, member.get('quantity'))) && _.contains(ids, member.get('card').id);
					});

					view.deck.get('filteredMembers').comparator = buildMembersComparator();
					view.deck.get('filteredMembers').reset(filteredMembers);

				}; // end:filterMembers

				if (!view.config.get('filter').get('setTechName')) {
					var warlordSetId = view.deck.get('warlord').setId;
					var sets = _.pluck(_.filter(conquest.dict.sets, function(set) {
						return set.released === true || set.id == warlordSetId;
					}), 'techName');
					view.config.get('filter').set({
						setTechName: sets
					});
				}

				view.membersListView = new conquest.deck.MembersListView({
					el: '.members-container',
				});
				view.membersListView.listenTo(view.deck.get('filteredMembers'), 'reset', function(filteredMembers) {
					this.render(filteredMembers, {
						layout: view.config.get('layout'),
						readOnly: false
					});
				});

				view.groupsView = new conquest.deck.MemberGroupsView({
					el: '.mg-container'
				});
				view.deck.get('members').each(function(member) {
					view.listenTo(member, 'change:quantity', function(member, quantity, options) {
						view.deck.history.add({
							member: member,
							quantity: quantity
						});
						if (options.batchChange !== true) {
							view.groupsView.render(member.collection, {
								readOnly: false
							});
							var $members = view.membersListView.$el.find('.members-list-item, .members-grid-item');
							var $buttons = $members.filter('[data-card-id="' + member.get('cardId') + '"]').find('.btn-group-qty .btn');
							$buttons.filter('[data-quantity="' + member.get('quantity') + '"]').addClass('active').siblings().removeClass('active');
							view.updateStats();
						}
					});
				});
				view.listenTo(view.deck, 'invalid', function(deck) {
					view.messages = [{
						kind: 'danger',
						title: 'core.error',
						message: deck.validationError
					}];
					view.renderMessages();
				});
				view.listenTo(view.config, 'change:layout', function(config) {
					view.membersListView.render(view.deck.get('filteredMembers'), {
						layout: config.get('layout'),
						readOnly: false
					});
				});
				view.listenTo(view.deck, 'change:configCsQuantity', function(deck) {
					deck.adjustQuantities();
					view.membersListView.render(view.deck.get('filteredMembers'), {
						layout: view.config.get('layout'),
						readOnly: false
					});
					view.groupsView.render(view.deck.get('members'), {
						readOnly: false
					});
					view.updateStats();
				});

				view.listenTo(view.config.get('filter'), 'change', function(fltr) {
					filterMembers();
				});
				view.listenTo(view.config, 'change:filter', function(config) {
					filterMembers();
				});

				$('.btn-group.select-many > .btn').click(function(event) {
					var $this = $(this);
					if (event.ctrlKey) {
						$this.addClass('active').siblings().removeClass('active');
					} else {
						$this.toggleClass('active');
					}
					filterMembers();
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
				// sorting change
				//
				$('.sort-control').change(function() {					
					view.deck.get('filteredMembers').comparator = buildMembersComparator();
					view.deck.get('filteredMembers').sort();
					view.deck.get('filteredMembers').trigger('reset', view.deck.get('filteredMembers'));
				});

				//
				// save deck
				//
				$('.btn.deck-save, a.deck-save').click(function() {
					var attributes = {
						name: view.deckDescriptionView.$el.find('#deckName').val().trim(),
						description: view.deckDescriptionView.$el.find('#deckDescription').val().trim()
					};
					var deckIdBeforeSave = view.deck.get('id');
					view.deck.save(attributes, {
						success: function(deck, response, options) {
							conquest.router.navigate('edit/' + deck.get('id') + '-' + deck.get('techName'));
							if (_.isUndefined(deckIdBeforeSave)) {
								ga('set', 'page', conquest.static.root + 'edit/' + parseInt(deck.get('id')));
							}
							ga('send', 'pageview');
							view.deck = deck;
							view.deck.history.reset();
							// view.filter = view.buildFilterFromUI();
							view.messages = conquest.deck.buildSuccessMessage({
								message: 'ok.deck.oper.save'
							});							
							view.render();
						},
						error: function(deck, response, options) {
							view.messages = conquest.deck.buildErrorMessage({
								error: response.responseJSON,
								message: 'error.deck.oper.save'
							});
							view.renderMessages();
						}
					});
				});

				//
				// save deck copy
				//
				$('a.deck-save-copy').click(function() {
					conquest.deck.showDeckSaveCopyModal(view.deck);
				});

				//
				// delete deck
				//
				$('#deckDelete').click(function() {
					var deleteHandler = function() {
						view.deck.destroy({
							wait: true,
							success: function(deck, response, options) {
								conquest.router.navigate('');
								ga('set', 'page', conquest.static.root);
								ga('send', 'pageview');
								userDeckListView.messages = conquest.deck.buildSuccessMessage({
									message: 'ok.deck.oper.delete'
								});
								delete view.deck;
								userDeckListView.render();
							},
							error: function(deck, response, options) {
								view.messages = conquest.deck.buildErrorMessage({
									error: response.responseJSON,
									message: 'error.deck.oper.delete'
								});
								view.renderMessages();
							}							
						});
					};

					var options = {
						titleKey: 'core.deck.aboutToDelete.title',
						messageKey: 'core.deck.aboutToDelete.message',
						buttonYes: {
							labelKey: 'core.yes.long' + Math.floor(Math.random() * 2),
							class: 'btn-danger',
							handler: deleteHandler
						},
						buttonNo: {}
					};

					conquest.deck.showMessageModalDialog(options);
				});

				//
				// publish deck
				//
				view.$el.find('#deckPublishButton').click(function() {
					showDeckPublishModal(view.deck);
				});
				view.listenTo(view.deck.get('snapshots'), 'add remove', renderPublishedDecksList);

				//
				// create private link
				//
				view.$el.find('#createLinkButton').click(function() {
					var attributes = new conquest.model.DeckLink({
						deckId: view.deck.get('id'),
						name: $('#createLinkInput').val()
					});
					var deckLink = new conquest.model.DeckLink();
					deckLink.owner = view.deck.get('links').owner;
					deckLink.save(attributes, {						
						success: function(deckLink, response, options) {
							view.deck.get('links').unshift(deckLink);
							view.messages = conquest.deck.buildSuccessMessage({
								message: 'ok.deck.oper.saveLink'
							});
							view.renderMessages();
						},
						error: function(deckLink, response, options) {							
							view.messages = conquest.deck.buildErrorMessage({
								error: response.responseJSON,
								message: 'error.deck.oper.saveLink'
							});
							view.renderMessages();
						}
					});
				});
				view.listenTo(view.deck.get('links'), 'add remove', renderPrivateLinksList);

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
				// config popover
				//				
				var $configTrigger = view.$el.find('#configTrigger').popover({
					html: true,
					trigger: 'click focus',
					placement: 'bottom',
					animation: false,
					content: Handlebars.templates['deck-config']({})
				});

				$configTrigger.on('shown.bs.popover', function() {
					var $configContent = view.$el.find('#configContent');
					var $configCsQuantityRadios = $configContent.find('input[name="csQuantity"]');
					$configCsQuantityRadios.filter('[value="' + view.deck.get('configCsQuantity') + '"]').prop('checked', true);
					$configContent.find('#configApply').click(function() {
						$configTrigger.popover('hide');
						view.deck.set({
							configCsQuantity: parseInt($configCsQuantityRadios.filter(':checked').val())
						});
					});
					$configContent.find('#configCancel').click(function() {
						$configTrigger.popover('hide');
					});
				});

				//
				// filter: sets
				// 
				new conquest.card.CardSetFilterPopoverView({
					filter: view.config.get('filter'),
					$trigger: view.$el.find('#cardSetfilterTrigger')
				}).render();

				//
				// filter: stats
				// 
				new conquest.card.CardStatFilterPopoverView({
					filter: view.config.get('filter'),
					$trigger: view.$el.find('#cardStatfilterTrigger')
				}).render();



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

				var setSearchbarFilter = function(options) {
					if (options) {
						var filter = view.config.get('filter');

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
							if (!(filter.has('techName') || filter.has('trait') || filter.has('keyword') || filter.has('text'))) {
								obj['text'] = text;
							}
						} else {
							obj['techName'] = undefined;
							obj['trait'] = undefined;
							obj['keyword'] = undefined;
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
						text: $('#search').typeahead('val')
					});
				}).on('typeahead:opened', function($event) {
					console.log('opened' + $event);
					setSearchbarFilter({});
				}).on('keyup', function($event) {
					if ($event.keyCode == 13) {
						$typeahead.typeahead('close');
						// view.filter.trigger('change', view.filter);
						filterMembers();
					}
				});

				view.groupsView.render(view.deck.get('members'), {
					readOnly: false
				});

				filterMembers();
			};

			if (options.deck) {
				view.deck = options.deck;
				// view.deck.set({
				// 	snapshots: new conquest.model.PrivateDecks()
				// });
				view.deck.get('snapshots').fetch({
					data: {
						snapshotBaseId: view.deck.get('id')
					},
					success: function(decks, response, options) {
						renderPublishedDecksList();
					}
				});
				view.deck.get('links').fetch({
					success: function(links, response, options) {
						renderPrivateLinksList();
					}
				});
								
				renderInternal();
			} else if (options.deckId) {
				view.deck = new conquest.model.PrivateDeck({
					id: options.deckId
				});
				view.deck.fetch({
					success: function(deck, response, options) {
						renderInternal();
					},
					error: function(deck, response, options) {
						view.messages = conquest.deck.buildErrorMessage({
							error: response.responseJSON,
							message: 'error.deck.oper.loadDeck'
						});
						view.renderMessages();
					}
				});
			} else if (_.isNumber(options.warlordId)) {
				view.deck = new conquest.model.PrivateDeck({
					type: 'base',
					warlordId: options.warlordId,
					members: conquest.deck.getValidDeckMembers(options.warlordId),
					configCsQuantity: 3
				}, {
					parse: true
				});
				renderInternal();
			} else {
				renderInternal();
			}

			this.bindMenuLinkClickHandler();
		}
	});

	var Router = Backbone.Router.extend({
		routes: {
			'new': 'createNewDeck',
			'new/:id': 'editNewDeck',
			'edit/:id': 'editDeck',
			'import': 'importDeck',
			'': 'viewDecks',
		}
	});

	var userDeckListView = new UserDeckListView();
	var userDeckCreateView = new UserDeckCreateView();
	var userDeckImportView = new UserDeckImportView();
	var userDeckEditView = new UserDeckEditView();

	conquest.router = new Router();
	conquest.router.on('route:createNewDeck', function() {		
		userDeckCreateView.render();
		ga('set', 'page', conquest.static.root + 'new');
		ga('send', 'pageview');
	}).on('route:editNewDeck', function(id) {
		var warlordId = parseInt(id);
		userDeckEditView.render({
			warlordId: warlordId
		});
		$('html,body').scrollTop(0);

		var url = warlordId;
		var warlord = conquest.dict.findCard(warlordId);
		if (warlord) {
			url += '-' + warlord.techName;
		}
		ga('set', 'page', conquest.static.root + 'new/' + url);
		ga('send', 'pageview');
	}).on('route:editDeck', function(deckIdWithName) {
		if (deckIdWithName) {
			var deckId = /^\w+/.exec(deckIdWithName)[0];
			if (/^\d+$/.test(deckId)) {
				deckId = parseInt(deckId);
			}

			userDeckEditView.render({
				deckId: deckId,
				deck: userDeckListView.decks.findWhere({
					id: deckId
				})
			});
			$('html,body').scrollTop(0);
			ga('set', 'page', conquest.static.root + 'edit/' + parseInt(deckId));
			ga('send', 'pageview');
		}
	}).on('route:viewDecks', function() {
		userDeckListView.render();
		$('html,body').scrollTop(0);
		ga('set', 'page', conquest.static.root);
		ga('send', 'pageview');
	}).on('route:importDeck', function() {
		userDeckImportView.render();
		$('html,body').scrollTop(0);
		ga('set', 'page', conquest.static.root + 'import');
		ga('send', 'pageview');
	});

	conquest.static.root = '/' + conquest.static.language + '/deck/';

	Backbone.history.start({
		pushState: true,
		root: conquest.static.root
	});
});