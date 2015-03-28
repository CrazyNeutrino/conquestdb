$(function() {

	var showDeckPublishModal = function(deck, options) {

		var publish = function($modal, name, description) {
			var attributes = {
				name: name,
				description: description,
				type: 'snapshot',
				snapshotBaseId: deck.get('id'),
				snapshotPublic: true
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
			}
		});
	};

	var showDeckEditSnapshotModal = function(snapshot, modalOptions) {

		var editSnapshot = function($modal, name, description) {
			var attributes = {
				name: name,
				description: description
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
			}
		});
	};

	var ViewBase = Backbone.View.extend({
		el: '.content',
		viewLinkClickHandler: function(event) {
			var root = conquest.static.root;
			var href = $(event.currentTarget).attr('href');
			if (href && href.indexOf(root) == 0 && !event.ctrlKey && !event.shiftKey) {
				event.preventDefault();
				conquest.router.navigate(href.replace(conquest.static.root, ''), {
					trigger: true
				});
			}
		},
		renderMessages: function(options) {
			conquest.deck.renderMessages({
				$target: this.$el,
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

			var template = Handlebars.templates['user-deck-list-view.hbs']();
			view.$el.html(template);
			view.renderMessages();
			var actionsTemplate = Handlebars.templates['deck-actions.hbs']({
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

			var template = Handlebars.templates['user-deck-import-view.hbs']();
			var actionsTemplate = Handlebars.templates['deck-actions.hbs']({
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
					var vdms = conquest.getValidDeckMembers(warlordId);
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
					view.groupsView.render(deck.get('members'));
				}

				if (errors.length == 0) {
					view.$el.find('#editDeckButton').removeClass('disabled').click(function() {
						// userDeckEditView.deck = deck;
						// userDeckEditView.render({});
						var userDeckEditView = new UserDeckEditView();
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
						Handlebars.templates['commons-ul.hbs']({
							listTitle: conquest.dict.messages['core.errors'] + ':',
							listItems: errors,
							listContainerStyle: 'alert alert-danger'
						})
					);
				}
				if (warnings.length > 0) {
					$container.append(
						Handlebars.templates['commons-ul.hbs']({
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

			var warlords = _.where(conquest.dict.cards, {
				type: 'warlord'
			});
			warlords = _.sortBy(warlords, function(warlord) {
				return warlord.factionDisplay + '#' + warlord.name;
			});
			var template = Handlebars.templates['user-deck-create-view.hbs']({
				warlords: warlords
			});
			this.$el.html(template);
			this.$el.find('.actions-container').append(
				Handlebars.templates['deck-actions.hbs']({
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
					var imgElem = conquest.util.writeCardImgElem($this.data('card-image-base'), attrs);
					var $container = view.$el.find('.card-container').empty().append(imgElem);
					// _.each(conquest.dict.findSignSquadCards(91), function(card) {
					// 	var attrs = {class: 'card-sm', style: 'margin: 0px 10px 10px 0px;'};
					// 	var imgElem = conquest.util.writeCardImgElem(card.imageBase, attrs);
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
		// config: new Backbone.Model({
		// 	layout: 'list',
		// 	filter: new Backbone.Model()
		// }),		
		viewLinkClickHandler: function(event) {
			var root = conquest.static.root;
			var href = $(event.currentTarget).attr('href');
			if (href && href.indexOf(root) == 0 && !event.ctrlKey && !event.shiftKey) {
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

			var template = Handlebars.templates['deck-stats-table.hbs']({
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

			filter.setTechName = this.config.get('filter').get('sets');

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
				if (filter.layout && filter.layout.indexOf($this.data('layout')) > -1) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group-filter.filter-faction .btn').each(function() {
				var $this = $(this);
				if (filter.faction && filter.faction.indexOf($this.data('faction')) > -1) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group-filter.filter-type .btn').each(function() {
				var $this = $(this);
				if (filter.type && filter.type.indexOf($this.data('type')) > -1) {
					$this.addClass('active');
				}
			});
			this.$el.find('.btn-group-filter.filter-selection .btn').each(function() {
				var $this = $(this);
				if (filter.selection && filter.selection.indexOf($this.data('selection')) > -1) {
					$this.addClass('active');
				}
			});

			// this.$el.find('#filterContent li[data-node-type="set"] > input[type="checkbox"]').each(function() {
			// 	var $this = $(this);
			// 	$this.prop('checked', filter.setTechName && filter.setTechName.indexOf($this.val()) > -1);
			// });
			
			this.config.get('filter').set({
				sets: filter.setTechName
			});
		},
		render: function(options) {
			var view = this;

			options = options || {};

			var renderPrivateLinksList = function() {
				var template = Handlebars.templates['deck-private-link-list.hbs']({
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
				var template = Handlebars.templates['deck-published-decks-list.hbs']({
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
				var allowedCardTypes = ['army', 'attachment', 'support', 'event'];
				var filter = {
					factions: conquest.getValidDeckFactions(view.deck.get('warlord').faction),
					cardTypes: _.filter(conquest.dict.cardTypes, function(cardType) {
						return allowedCardTypes.indexOf(cardType.techName) >= 0;
					})
				};

				var template = Handlebars.templates['user-deck-edit-view.hbs']({
					deck: view.deck.toJSON(),
					filter: filter
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
						return conquest.util.writeCardImgElem($(this).data('image-base'), {
							class: 'card-md'
						});
					}
				});

				var deckId = view.deck.get('id');
				var deckTechName = view.deck.get('techName');
				view.$el.find('.actions-container').append(Handlebars.templates['deck-actions.hbs']({
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
						decksave: {},
						deckdelete: _.isNumber(deckId) ? {} : undefined,
						decklist: {},
					}
				}));

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
					var selection = $('.btn-group.btn-group-filter.filter-selection > .btn.active').map(function() {
						return $(this).data('selection');
					}).get();
					if (selection.length == 0) {
						selection = undefined;
					}
					var sets = view.config.get('filter').get('sets');
					if (sets.length == 0) {
						sets = undefined;
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
						var matches = (!factions || factions.indexOf(card.faction) > -1) && (!types || types.indexOf(card.type) > -1) && (!sets || sets.indexOf(card.setTechName) > -1) && (!selection || selection.indexOf(cardSelection) > -1);
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

				if (!view.config.get('filter').get('sets')) {
					var warlordSetId = view.deck.get('warlord').setId;
					var sets = _.pluck(_.filter(conquest.dict.sets, function(set) {
						return set.released === true || set.id == warlordSetId;
					}), 'techName');
					view.config.get('filter').set({
						sets: sets
					});
				}

				view.membersListView = new conquest.deck.MemberListView({
					el: '.members-list-container',
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
							view.groupsView.render(member.collection);
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
				view.listenTo(view.deck, 'change:configCsQuantity',
					function(deck) {
						deck.adjustQuantities();
						view.membersListView.render(view.deck.get('filteredMembers'), {
							layout: view.config.get('layout'),
							readOnly: false
						});
						view.groupsView.render(view.deck.get('members'));
						view.updateStats();
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
					trigger: 'hover click'
				});

				//
				// config popover
				//				
				var $configTrigger = view.$el.find('#configTrigger').popover({
					html: true,
					trigger: 'click focus',
					placement: 'bottom',
					animation: false,
					title: conquest.dict.messages['core.settings'],
					content: Handlebars.templates['deck-config.hbs']({})
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
				// filter popover
				//
				var filterContent = Handlebars.templates['deck-filter.hbs']({
					tree: conquest.dict.buildCardSetTree(),
				});
				var $filterTrigger = view.$el.find('#filterTrigger').popover({
					html: true,
					trigger: 'click focus',
					placement: 'bottom',
					animation: false,
					title: conquest.dict.messages['core.filters'],
					content: filterContent
				});

				$filterTrigger.on('shown.bs.popover', function() {
					var sets = view.config.get('filter').get('sets');
					var cycles = view.config.get('filter').get('cycles');
					var $filterContent = view.$el.find('#filterContent');
					var $sets = $filterContent.find('li:not(:has(ul)) input[type="checkbox"]');
					var $cycles = $filterContent.find('li:has(ul) > input[type="checkbox"]');
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
					$filterContent.find('#filterApply').click(function() {
						$filterTrigger.popover('hide');
						var sets = [];
						$sets.filter(':checked').each(function() {
							sets.push($(this).val());
						});
						var cycles = [];
						$cycles.filter(':checked').each(function() {
							cycles.push($(this).val());
						});
						view.config.get('filter').set({
							sets: sets
						});
						view.config.get('filter').set({
							cycles: cycles
						});
						view.config.trigger('change:filter', view.config);
					});
					$filterContent.find('#filterCancel').click(function() {
						$filterTrigger.popover('hide');
					});
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
							$('<a />').data('image-base', imageBase).append(conquest.util.writeCardImgElem(imageBase, attrs)).popover({
								html: true,
								trigger: 'hover',
								content: function() {
									return conquest.util.writeCardImgElem($(this).data('image-base'), {
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

				//
				// sliders
				//
				// $('.slider').slider({});
				$('.slider').each(function() {
					var $this = $(this);
					$this.slider({
						range: true,
						min: $this.data('slider-min'),
						max: $this.data('slider-max'),
						// values: [ $this.data('slider-min'), $this.data('slider-max') ]
						values: [1, 3]
					});
				});

				view.groupsView.render(view.deck.get('members'));

				filter();
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
					members: conquest.getValidDeckMembers(options.warlordId),
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

	conquest.router = new Router();
	conquest.router.on('route:createNewDeck', function() {
		var userDeckCreateView = new UserDeckCreateView();

		userDeckCreateView.render();
		ga('set', 'page', conquest.static.root + 'new');
		ga('send', 'pageview');
	}).on('route:editNewDeck', function(id) {
		var userDeckEditView = new UserDeckEditView();

		var warlordId = parseInt(id);
		userDeckEditView.render({
			warlordId: warlordId
		});

		var url = warlordId;
		var warlord = conquest.dict.findCard(warlordId);
		if (warlord) {
			url += '-' + warlord.techName;
		}
		ga('set', 'page', conquest.static.root + 'new/' + url);
		ga('send', 'pageview');
	}).on('route:editDeck', function(deckIdWithName) {
		var userDeckEditView = new UserDeckEditView();

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
			ga('set', 'page', conquest.static.root + 'edit/' + parseInt(deckId));
			ga('send', 'pageview');
		}
	}).on('route:viewDecks', function() {
		userDeckListView.render();
		ga('set', 'page', conquest.static.root);
		ga('send', 'pageview');
	}).on('route:importDeck', function() {
		var userDeckImportView = new UserDeckImportView();

		userDeckImportView.render();
		ga('set', 'page', conquest.static.root + 'import');
		ga('send', 'pageview');
	});

	conquest.static.root = '/' + conquest.static.language + '/deck/';

	Backbone.history.start({
		pushState: true,
		root: conquest.static.root
	});
});