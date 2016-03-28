var db = db || {};

//
// deck
//
db.deck = db.deck || {};
(function(_deck) {
	
	_deck.isValidDeckCardType = function(cardType) {
		return _.indexOf([ 'army', 'attachment', 'event', 'support', 'synapse' ], cardType) >= 0;
	};
	
	_deck.getDeckHelper = function(options) {
		var warlord;
		if (options.warlord) {
			warlord = options.warlord;
		} else {
			warlord = db.dict.findCard(options.warlordId);
		}
	
		var deckHelper;
		if (warlord.techName == 'commander-starblaze') {
			deckHelper = new _deck.CommanderStarblazeDeckHelper(warlord);
		} else if (warlord.techName == 'gorzod') {
			deckHelper = new _deck.GorzodDeckHelper(warlord);
		} else if (warlord.faction == 'tyranid') {
			deckHelper = new _deck.TyranidDeckHelper(warlord);
		} else if (warlord.faction == 'necron') {
			deckHelper = new _deck.NecronDeckHelper(warlord);
		} else {
			deckHelper = new _deck.RegularDeckHelper(warlord);
		}
		return deckHelper;
	}
	
	_deck.getAlliedDeckFactions = function(warlordId) {
		return _deck.getDeckHelper({
			warlordId : warlordId
		}).getAlliedDeckFactions();
	};
	
	_deck.getValidDeckFactions = function(warlordId) {		
		return _deck.getDeckHelper({
			warlordId : warlordId
		}).getValidDeckFactions();
	};
	
	_deck.getValidDeckCardTypes = function(warlordId) {
		var warlord = db.dict.findCard(warlordId);
		return _.filter(db.dict.cardTypes, function(cardType) {
			return _deck.isValidDeckCardType(cardType.techName) 
				&& (cardType.techName != 'synapse' || warlord.faction == 'tyranid');
		});
	};
	
	_deck.getValidDeckCards = function(warlordId) {
		return _deck.getDeckHelper({
			warlordId : warlordId
		}).filterValidDeckCards(db.dict.cards);
	};
	
	_deck.getValidDeckMembers = function(deckWarlordId) {
		var validDeckCards = _deck.getValidDeckCards(deckWarlordId);
		var validDeckMembers = [];
		_.each(validDeckCards, function(card) {
			var availableQuantity = (_.isUndefined(card.quantity) ? 3 : card.quantity);
			var quantity = (card.type == 'warlord' || _.isNumber(card.warlordId) ? availableQuantity : 0);
			var member = {
				cardId : card.id,
				quantity : quantity,
				availableQuantity : availableQuantity
			};
			validDeckMembers.push(member);
		});
		return validDeckMembers;
	};
	
	//
	// predicate for cards from regular decks (on alignment circle)
	//
	_deck.buildRegularDeckCardPredicate = function(warlord) {
		var alliedDeckFactions = _.pluck(_deck.getAlliedDeckFactions(warlord.id), 'techName');
	
		return function(card) {
			// invalid type
			if (!_deck.isValidDeckCardType(card.type)) {
				return false;
			}
			// invalid faction
			if (alliedDeckFactions.indexOf(card.faction) < 0) {
				return false;
			}
			// invalid warlord
			if (card.type == 'warlord') {
				return false;
			}
			// invalid signature squad
			if (card.warlordId && card.warlordId !== warlord.id) {
				return false;
			}
			// loyal to another faction
			if (card.loyal == true && card.faction !== warlord.faction) {
				return false;
			}
			return true;
		};
	};
	
	//
	// predicate for card from warlord's own faction
	//
	_deck.buildWarlordFactionCardPredicate = function(warlord) {	
		return function(card) {			
			// invalid type
			if (!_deck.isValidDeckCardType(card.type)) {
				return false;
			}
			// invalid faction
			if (warlord.faction != card.faction) {
				return false;
			}
			// invalid warlord
			if (card.type == 'warlord') {
				return false;
			}
			// invalid signature squad
			if (card.warlordId && card.warlordId !== warlord.id) {
				return false;
			}
			return true;
		};
	};
	
	//
	// predicate for common cards
	//
	_deck.buildCommonCardPredicate = function() {
		return function(card) {
			// valid type and not in signature squad and not loyal
			return _deck.isValidDeckCardType(card.type) && _.isUndefined(card.warlordId)
					&& card.loyal === false;
		};
	};
	
	//
	// predicate for cards with given trait
	//
	_deck.buildTraitCardPredicate = function(trait) {
		return function(card) {
			// valid type and has given trait
			var outcome = _deck.isValidDeckCardType(card.type);
			if (outcome && card.traitEn) {
				outcome = _.indexOf(card.traitEn.trim().toLowerCase().split(/ *\. */), trait) >= 0;
			} else {
				outcome = false;
			}
			return outcome;
		};
	};
	
	_deck.buildRegularDeckFactionPredicate = function(warlord) {
		var circleFactions = _.filter(db.dict.factions, function(faction) {
			return faction.techName != 'neutral' && faction.techName != 'necron'
					&& faction.techName != 'tyranid';
		});
		var faction = _.findWhere(db.dict.factions, {
			techName : warlord.faction
		});
	
		return function(faction) {
			var techName = faction.techName;
			if (techName == 'neutral') {
				return true;
			}
			if (techName == warlord.faction) {
				return true;
			}
			var index = _.findIndex(circleFactions, function(faction) {
				return faction.techName == warlord.faction;
			});
			var length = circleFactions.length;
			if (circleFactions[(index - 1 + length) % length].techName == techName
					|| circleFactions[(index + 1) % length].techName == techName) {
				return true;
			}
			return false;
		};
	};
	
	_deck.RegularDeckHelper = function(warlord) {
		this.getAlliedDeckFactions = function() {
			return _.filter(db.dict.factions, _deck.buildRegularDeckFactionPredicate(warlord));
		};
	
		this.getValidDeckFactions = function() {
			return this.getAlliedDeckFactions();
		};
		
		this.filterValidDeckCards = function(cards) {
			return _.filter(cards, _deck.buildRegularDeckCardPredicate(warlord));
		};
	};
	
	_deck.TyranidDeckHelper = function(warlord) {
		this.getAlliedDeckFactions = function() {
			return undefined;
		};
	
		this.getValidDeckFactions = function() {
			return _.filter(db.dict.factions, function(faction) {
				return faction.techName == 'tyranid' || faction.techName == 'neutral';
			});
		};
	
		this.filterValidDeckCards = function(cards) {
			var warlordFaction = _deck.buildWarlordFactionCardPredicate(warlord);
			var neutralNonArmy = function(card) {
				return card.faction == 'neutral' && card.type != 'army';
			};
			return _.filter(cards, function(card) {
				return warlordFaction(card) || neutralNonArmy(card);
			});
		};
	};
	
	_deck.NecronDeckHelper = function(warlord) {
		this.getAlliedDeckFactions = function() {
			return undefined;
		};
	
		this.getValidDeckFactions = function() {
			return _.filter(db.dict.factions, function(faction) {
				return faction.techName != 'tyranid';
			});
		};
	
		this.filterValidDeckCards = function(cards) {
			var warlordFaction = _deck.buildWarlordFactionCardPredicate(warlord);
			var common = _deck.buildCommonCardPredicate(warlord);
			var nonTyranidArmy = function(card) {
				return card.faction != 'tyranid' && card.type == 'army';
			};
			var neutral = function(card) {
				return card.faction == 'neutral';
			}
			return _.filter(cards, function(card) {
				return warlordFaction(card) || neutral(card) || nonTyranidArmy(card) && common(card);
			});
		};
	};
	
	_deck.CommanderStarblazeDeckHelper = function(warlord) {
		this.getAlliedDeckFactions = function() {
			return _.filter(db.dict.factions, _deck
					.buildRegularDeckFactionPredicate(warlord));
		};
	
		this.getValidDeckFactions = function() {
			var filtered = this.getAlliedDeckFactions();
			filtered.push(_.findWhere(db.dict.factions, {
				techName : 'astra-militarum'
			}));
			return filtered;
		};
	
		this.filterValidDeckCards = function(cards) {
			var standard = _deck.buildRegularDeckCardPredicate(warlord);
			var common = _deck.buildCommonCardPredicate();
			return _.filter(cards, function(card) {
				return standard(card) || (common(card) && card.faction == 'astra-militarum');
			});
		};
	
	};
	
	_deck.GorzodDeckHelper = function(warlord) {
		this.getAlliedDeckFactions = function() {
			return _.filter(db.dict.factions, _deck
					.buildRegularDeckFactionPredicate(warlord));
		};
	
		this.getValidDeckFactions = function() {
			var filtered = this.getAlliedDeckFactions();
			filtered.push(_.findWhere(db.dict.factions, {
				techName : 'space-marines'
			}));
			return filtered;
		};
	
		this.filterValidDeckCards = function(cards) {
			var standard = _deck.buildRegularDeckCardPredicate(warlord);
			var common = _deck.buildCommonCardPredicate();
			var vehicle = _deck.buildTraitCardPredicate("vehicle");
			return _.filter(cards, function(card) {
				return standard(card)
						|| (common(card) && vehicle(card) && card.faction == 'space-marines');
			});
		};
	};

})(db.deck);