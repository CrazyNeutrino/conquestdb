var db = db || {};

//
// model
//
db.model = db.model || {};
(function(_model) {

	_model.Card = Backbone.Model.extend({
		urlRoot : '/card',
	});

	_model.Cards = Backbone.Collection.extend({
		url : '/card',
		model : _model.Card
	});

	_model.DeckMember = Backbone.Model.extend({
		parse : function(response) {
			response.card = _.clone(db.dict.findCard(parseInt(response.cardId)));
			response.fixedQuantity = response.card.type === 'warlord'
					|| _.isNumber(response.card.warlordId);
			response.fixedMaxQuantity = response.card.type === 'warlord'
					|| response.card.type === 'synapse' || _.isNumber(response.card.warlordId);
			return response;
		}
	});

	_model.DeckMembers = Backbone.Collection.extend({
		model : _model.DeckMember,
		computeTotalQuantity : function() {
			var total = 0;
			this.each(function(member) {
				total += member.get('quantity');
			});
			return total;
		},
		computeTotalCost : function() {
			var total = 0;
			this.each(function(member) {
				total += member.get('quantity') * member.get('card').cost;
			});
			return total;
		},
		computeStats : function() {
			var stats = {};
			var keys = [ 'cost', 'shield', 'command', 'attack', 'hitPoints' ];

			_.each(keys, function(key) {
				stats[key] = {
					sum : 0,
					quantity : 0,
					quantityX : 0
				};
			});

			this.each(function(member) {
				var quantity = member.get('quantity');
				if (quantity > 0) {
					var card = member.get('card');
					_.each(keys, function(key) {
						if (!_.isUndefined(card[key])) {
							if (card[key] === -1) {
								stats[key].quantityX += quantity;
							} else {
								stats[key].sum += card[key] * quantity;
								stats[key].quantity += quantity;
							}
						}
					});
				}
			});

			_.each(keys,
					function(key) {
						if (stats[key].quantity > 0) {
							stats[key].average = Math.round(stats[key].sum / stats[key].quantity
									* 100) / 100;
						}
					});

			return stats;
		},
		adjustQuantities : function(csQuantity) {
			this.each(function(member) {
				if (member.get('fixedMaxQuantity') === false) {
					var availableQuantity = Math.min(3, member.get('card').quantity * csQuantity);
					member.set({
						availableQuantity : availableQuantity
					});
					member.set({
						quantity : Math.min(member.get('quantity'), availableQuantity)
					}, {
						batchChange : true
					});
				}
			});
		}
	});

	_model.DeckHistoryItem = Backbone.Model;

	_model.DeckHistory = Backbone.Collection.extend({
		model : _model.DeckHistoryItem
	});

	_model.DeckLink = Backbone.Model.extend({
		initialize : function(attributes, options) {
			if (options) {
				this.owner = options.owner;
			}
		},
		urlRoot : function() {
			return _.result(this.owner, 'url', '') + '/link';
		},
	});

	_model.DeckLinks = Backbone.Collection.extend({
		initialize : function(models, options) {
			this.owner = options.owner;
		},
		url : function() {
			return _.result(this.owner, 'url', '') + '/link';
		},
		model : function(attributes, options) {
			return new _model.DeckLink(attributes, options);
		}
	});

	_model.DeckComment = Backbone.Model.extend({
		initialize : function(attributes, options) {
			if (options) {
				this.owner = options.owner;
			}
		},
		urlRoot : function() {
			return _.result(this.owner, 'url', '') + '/comment';
		},
		validate : function(attributes, options) {
			var value = $.trim(attributes.value);
			if (value.length == 0) {
				return 'error.deck.comment.empty';
			}
		}
	});

	_model.DeckComments = Backbone.Collection.extend({
		initialize : function(models, options) {
			this.owner = options.owner;
		},
		url : function() {
			return _.result(this.owner, 'url', '') + '/comment';
		},
		model : function(attributes, options) {
			return new _model.DeckComment(attributes, options);
		}
	});

	_model.Deck = Backbone.Model.extend({
		history : new _model.DeckHistory(),
		initialize : function(attributes) {
			attributes.type = attributes.type || 'base';
		},
		parse : function(response) {
			response.warlord = _.clone(db.dict.findCard(parseInt(response.warlordId)));
			response.createDateMillis = moment.tz(response.createDate, db.static.timezone)
					.valueOf();
			response.modifyDateMillis = moment.tz(response.modifyDate, db.static.timezone)
					.valueOf();
			response.members = new _model.DeckMembers(response.members, {
				parse : true,
				comparator : db.util.buildMembersDefaultComparator(response.warlord.faction)
			});
			response.links = new _model.DeckLinks(response.links, {
				parse : true,
				owner : this
			});
			response.links.on('add', function(link) {
				link.owner = this.owner;
			}).on('remove', function(link) {
				link.owner = undefined;
			});
			response.comments = new _model.DeckComments(response.comments, {
				parse : true,
				owner : this
			});
			response.comments.on('add', function(comment) {
				comment.owner = this.owner;
			}).on('remove', function(comment) {
				comment.owner = undefined;
			});
			response.members.each(function(member) {
				var cardQuantity = member.get('card').quantity;
				var availableQuantity;
				if (member.get('fixedMaxQuantity') === true) {
					availableQuantity = cardQuantity;
				} else {
					if (_.isUndefined(response.configCsQuantity)) {
						response.configCsQuantity = 3;
					}
					availableQuantity = Math.min(3, cardQuantity * response.configCsQuantity);
				}
				member.set({
					availableQuantity : availableQuantity
				});
			});
			response.filteredMembers = new _model.DeckMembers();
			response.warlord = _.clone(db.dict.findCard(parseInt(response.warlordId)));

			return response;
		},
		toJSON : function() {
			var json = _model.Deck.__super__.toJSON.apply(this, arguments);
			if (json.members instanceof Backbone.Collection) {
				json.members = json.members.toJSON();
			}
			if (json.links instanceof Backbone.Collection) {
				json.links = json.links.toJSON();
			}
			if (json.snapshots instanceof Backbone.Collection) {
				json.snapshots = json.snapshots.toJSON();
			}
			// if (json.relatedSnapshots instanceof Backbone.Collection) {
			// json.relatedSnapshots = json.relatedSnapshots.toJSON();
			// }
			if (json.comments instanceof Backbone.Collection) {
				json.comments = json.comments.toJSON();
			}
			if (json.warlord instanceof Backbone.Model) {
				json.warlord = json.warlord.toJSON();
			}
			return json;
		},
		validate : function(attributes, options) {
			var name = $.trim(attributes.name);
			if (name.length == 0) {
				return 'error.deck.name.empty';
			}
			// if (attributes.type == 'base') {
			// var other = db.getDeck(name);
			// var id = attributes.id;
			// if (other && (_.isUndefined(id) || other.get('id') !==
			// id)) {
			// return 'error.deck.name.duplicate';
			// }
			// }
		},
		computeTotalQuantity : function() {
			var total = 0;
			if (this.get('members') instanceof Backbone.Collection) {
				total = this.get('members').computeTotalQuantity();
			}
			return total;
		},
		computeTotalCost : function() {
			var total = 0;
			if (this.get('members') instanceof Backbone.Collection) {
				total = this.get('members').computeTotalCost();
			}
			return total;
		},
		computeStats : function() {
			var stats = {};
			if (this.get('members') instanceof Backbone.Collection) {
				stats = this.get('members').computeStats();
			}
			return stats;
		},
		adjustQuantities : function() {
			if (this.get('members') instanceof Backbone.Collection) {
				this.get('members').adjustQuantities(this.get('configCsQuantity'));
			}
		},
		getBackupJson : function() {
			var json = this.toJSON();
			delete json.techName;
			delete json.filteredMembers;
			delete json.createDate;
			delete json.modifyDate;
			delete json.warlord;
			delete json.snapshots;
			// delete json.relatedSnapshots;
			delete json.links;
			delete json.comments;
			var members = json.members;
			json.members = [];
			_.each(members, function(member) {
				if (member.quantity && member.quantity > 0) {
					delete member.availableQuantity;
					delete member.fixedQuantity;
					delete member.fixedMaxQuantity;
					delete member.card;
					json.members.push(member);
				}
			});
			return json;
		}
	});

	_model.Decks = Backbone.Collection.extend({
		initialize : function() {
			this.config = new Backbone.Model();
		},
		parse : function(response) {
			var decks;
			if (_.isArray(response)) {
				decks = response;
			} else {
				this.config.set({
					total : response.total,
					pageNumber : response.pageNumber,
					pageSize : response.pageSize
				});
				decks = response.decks;
			}
			return decks;
		}
	});

	_model.PublicDeck = _model.Deck.extend({
		urlRoot : '/deck/public',
		parse : function(response) {
			var r = _model.PrivateDeck.__super__.parse.apply(this, [ response ]);
			if (_.isEmpty(r.snapshots)) {
				r.snapshots = new _model.PublicDecks();
			} else {
				r.snapshots = new _model.PublicDecks(r.snapshots, {
					parse : true,
					comparator : function(model) {
						return model.get('createDateMillis') * -1;
					}
				});
			}
			return r;
		}
	});

	_model.PublicDecks = _model.Decks.extend({
		url : '/deck/public',
		model : _model.PublicDeck
	});

	_model.PrivateDeck = _model.Deck.extend({
		urlRoot : '/deck',
		sync : function(method, source, options) {
			console.info('sync: ' + method);
			var target = source;
			if (method === 'create' || method === 'update') {
				var sourceJson = source.toJSON();

				delete sourceJson.warlord;
				delete sourceJson.createDate;
				delete sourceJson.modifyDate;
				delete sourceJson.createDateMillis;
				delete sourceJson.modifyDateMillis;
				delete sourceJson.snapshots;
				delete sourceJson.relatedSnapshots;
				delete sourceJson.links;
				delete sourceJson.comments;
				delete sourceJson.filteredMembers;

				if (_.isArray(sourceJson.members)) {
					_.each(sourceJson.members, function(member) {
						delete member.card;
						delete member.fixedQuantity;
						delete member.fixedMaxQuantity;
						delete member.availableQuantity;
					});
				}
				target = new _model.PrivateDeck(sourceJson);
			}

			_model.PrivateDeck.__super__.sync.apply(this, [ method, target, options ]);
		},
		parse : function(response) {
			var r = _model.PrivateDeck.__super__.parse.apply(this, [ response ]);
			if (_.isEmpty(r.snapshots)) {
				r.snapshots = new _model.PrivateDecks();
			} else {
				r.snapshots = new _model.PrivateDecks(r.snapshots, {
					parse : true,
					comparator : function(model) {
						return model.get('createDateMillis') * -1;
					}
				});
			}
			return r;
		}
	});

	_model.PrivateDecks = _model.Decks.extend({
		url : '/deck',
		model : _model.PrivateDeck
	});

})(db.model);