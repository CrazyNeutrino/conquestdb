Handlebars.registerHelper('table', function(context, cols, options) {
	var ret = '<table class="members-grid members-grid-' + cols + '"><tbody>';

	for(var i = 0; i < context.length; i += cols) {
		ret += '<tr>';
		for(var j = 0; j < cols; j++) {			
			var cardOrMember = context[i + j];			
			if (i + j < context.length) {
				var cardId = cardOrMember.id || cardOrMember.card.id;
				ret += '<td class="members-grid-item" data-card-id="' + cardId + '">' + options.fn(cardOrMember) + '</td>';
			} else {
				ret += '<td>&nbsp;</td>';
			}		
		}
		ret += '</tr>';
	}

	return ret + '</tbody></table>';
});

Handlebars.registerHelper('grid', function(context, options) {
	var cols = 2;
	for(var i = 0; i < context.length; i += cols) {
		ret += '<div class="row">';
		for(var j = 0; j < cols; j++) {			
			ret += '<div class="col-md">';
			if (i + j < context.length) {
				ret += '<td class="members-grid-item" data-card-id="' + member.card.id + '">' + options.fn(member) + '</td>';
			} else {
				ret += '<td>&nbsp;</td>';
			}		
		}
		ret += '</div>';
	}

	return ret + '</tbody></table>';
});

Handlebars.registerHelper('loc', function(context, options) {
	var ret = conquest.dict.messages[context];
	if (_.isUndefined(ret)) {
		ret = context;
	}
	if (options.hash.translate == "true") {
		ret = conquest.ui.toHtml(ret);
	}
	return ret;
});

Handlebars.registerHelper('for', function(from, to, incr, options) {
	var ret = '';
	for(var i = from; i <= to; i += incr) {
		ret += options.fn(i);
	}
	return ret;
});

Handlebars.registerHelper('factionImagePath', function(context, options) {
	return conquest.ui.toFactionImageMd(context);
});

Handlebars.registerHelper('factionImagePathLg', function(context, options) {
	return conquest.ui.toFactionImageLg(context);
});

Handlebars.registerHelper('cardImagePath', function(context, options) {
	// cardId or cardImageBase
	var imageBase;
	if (_.isNumber(context)) {
		imageBase = conquest.dict.findCard(context).imageBase;
	} else {
		imageBase = context;	
	}
	if (options.hash.bloodied == "true") {
		imageBase += "-b";
	}
	return conquest.ui.toCardImage(imageBase);
});

Handlebars.registerHelper('findCard', function(context, options) {
	return conquest.dict.findCard(context);
});

Handlebars.registerHelper('findSet', function(context, options) {
	return conquest.dict.findSet(context);
});

Handlebars.registerHelper('rootUrl', function(options) {
	return conquest.static.root;
});

Handlebars.registerHelper('rootUrlClean', function(options) {	
	var root = conquest.static.root;
	if(root.charAt(root.length - 1) == '/') {
        root = root.substr(0, root.length - 1);
    }
	return root;
});

Handlebars.registerHelper('restUrl', function(options) {
	return conquest.static.restPath;
});

Handlebars.registerHelper('cardUrl', function(context, options) {
	return conquest.ui.toCardUrl(context);
});

Handlebars.registerHelper('cardRelativeUrl', function(context, options) {
	return conquest.ui.toCardRelativeUrl(context);
});

Handlebars.registerHelper('publicDeckUrl', function(id, name, options) {
	return conquest.ui.toPublicDeckUrl({
		id: id,
		name: name
	});
});

Handlebars.registerHelper('userDeckUrl', function(id, name, options) {
	return conquest.ui.toUserDeckUrl({
		id: id,
		name: name
	});
});

Handlebars.registerHelper('tweetUrl', function(text, options) {
//	var url = '';
//	return ;
});

Handlebars.registerHelper('href', function(context, options) {
	return conquest.root + '#/' + context;
});

Handlebars.registerHelper('concat', function(c0, c1, c2, c3, c4, options) {
	var ret = '';
	_.each([c0, c1, c2, c3, c4], function(item) {
		if (!_.isUndefined(item)) {
			ret += item;
		}
	});
	return ret;
});

Handlebars.registerHelper('smartIf', function(context, options) {
	if (_.isUndefined(context) || context === null || context === false) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

Handlebars.registerHelper('smartUnless', function(context, options) {
	if (_.isUndefined(context) || context === null || context === false) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('ifEqual', function(value0, value1, options) {
	if (value0 === value1) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('unlessEqual', function(value0, value1, options) {
	if (value0 === value1) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

Handlebars.registerHelper('markdown', function(context, options) {
	if (_.isUndefined(context)) {
		return null;
	} else {
		return new Markdown.getSanitizingConverter().makeHtml(context);
	}
});

Handlebars.registerHelper('na', function(context, options) {
	if (_.isUndefined(context)) {
		return '&#x25cf;';
	} else {
		return context;
	}
});

Handlebars.registerHelper('searchLinkFaction', function(card, options) {
	return new Handlebars.SafeString('<a href="/' + conquest.static.language 
			+ '/card/search?faction='  + card.faction + '">' + card.factionDisplay + '</a>');
});

Handlebars.registerHelper('searchLinkSetName', function(card, options) {
	return new Handlebars.SafeString('<a href="/' + conquest.static.language 
			+ '/card/search?set='  + card.setTechName + '">' + card.setName + '</a>');
});

Handlebars.registerHelper('searchLinkTrait', function(card, options) {
	var result = '';
	var traits = card.trait.split('. ');
	_.each(traits, function(trait, index) {
		trait = s.trim(trait.replace('.', ''));
		result += '<a href="/' + conquest.static.language + '/card/search?trait=' + trait + '">' + trait + '.</a>';
		if (index < traits.length - 1) {
			result += ' ';
		}
	});
	return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('searchLinkType', function(card, options) {
	return new Handlebars.SafeString('<a href="/' + conquest.static.language 
			+ '/card/search?type='  + card.type + '">' + card.typeDisplay + '</a>');
});

Handlebars.registerHelper('momentFromNow', function(timestamp, options) {
	return moment.tz(timestamp, conquest.static.timezone).locale(conquest.static.language).fromNow();
});

Handlebars.registerHelper('moment', function(timestamp, options) {
	return moment.tz(timestamp, conquest.static.timezone).locale(conquest.static.language)
			.format(conquest.static.format[conquest.static.language].timestamp);
});

Handlebars.registerHelper('ifSignedIn', function(options) {
	if (conquest.static.user.username) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('unlessSignedIn', function(options) {
	if (conquest.static.user.username) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

Handlebars.registerHelper('ifUserDeck', function(deck, options) {
	var username = conquest.static.user.username;
	if (username && username === deck.username) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('ifPublicSnapshot', function(deck, options) {
	if (deck.snapshotBaseId && deck.snapshotPublic === true) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper('language', function(options) {
	return conquest.static.language;
});

Handlebars.registerHelper('cardText', function(text, options) {
	if (text) {
		return text.replace('\n', '<br />');
	} else {
		return '';
	}
});

Handlebars.registerHelper('cardTypeToIconClass', function(cardType, options) {
	/*var map = {
		warlord: 'db-icon db-icon-king',
		synapse: 'db-icon db-icon-link',
		army: 'db-icon db-icon-rocket',
		event: 'db-icon db-icon-flash',
		support: 'db-icon db-icon-database',
		attachment: 'db-icon db-icon-attach',
		planet: 'db-icon db-icon-globe',
		token: 'db-icon db-icon-asterisk'
	};*/
	return translateMap['cardTypeIconClass'][cardType];
});

var translateMap = {
	cardTypeIconClass: {
		warlord: 'db-icon db-icon-king',
		synapse: 'db-icon db-icon-link',
		army: 'db-icon db-icon-rocket',
		event: 'db-icon db-icon-flash',
		support: 'db-icon db-icon-database',
		attachment: 'db-icon db-icon-attach',
		planet: 'db-icon db-icon-globe',
		token: 'db-icon db-icon-asterisk'
	},
	tournamentTypeIconClass: {
		worlds: 'glyphicon glyphicon-king',
		nationals: 'glyphicon glyphicon-queen',
		regionals: 'glyphicon glyphicon-tower',
		local: 'glyphicon glyphicon-knight'
	},
	tournamentTypeDisplay: {
		worlds: 'core.tournament.type.worlds',
		nationals: 'core.tournament.type.nationals',
		regionals: 'core.tournament.type.regionals',
		local: 'core.tournament.type.local'
	},
	tournamentPlaceIconClass: {
		'1st': 'db-icon db-icon-1st',
		'2nd': 'db-icon db-icon-2nd'
	},
	tournamentPlaceDisplay: {
		'1st': 'core.tournament.place.1st',
		'2nd': 'core.tournament.place.2nd'
	},
	factionColor: {
		'astra-militarum': '#8A8A8A',
		'chaos': '#E65B2E',
		'dark-eldar': '#B965AA',
		'eldar': '#EADA67',
		'ork': '#538A34',
		'pace-marines': '#3173CE',
		'tau': '#4CD0DC',
		'tyranid': '#A32618'
	},
//	interestIconClass: {
//		'favourite-0': 'db-icon db-icon-star-empty',
//		'favourite-1': 'db-icon db-icon-star',
//		'superb-0': 'db-icon db-icon-heart-empty',
//		'superb-1': 'db-icon db-icon-heart'
//	}
	interestIconClass: {
		'favourite-0': 'db-icon db-icon-heart-empty',
		'favourite-1': 'db-icon db-icon-heart',
		'superb-0': 'db-icon db-icon-star-empty',
		'superb-1': 'db-icon db-icon-star'
	}
};

Handlebars.registerHelper('translate', function(value, context, options) {
	if (context == 'interestIconClass') {
		return translateMap[context][options.hash.kind + '-' + value[options.hash.kind]];
	} else {
		return translateMap[context][value];
	}
});

Handlebars.registerHelper('deckColor', function(faction, options) {	
	return conquest.deck.factionColors[faction].base;
});

Handlebars.registerHelper('deckBoxShadowStyle', function(color, options) {	
	var tmpColor = color.replace('#', '');
	var r = parseInt(tmpColor.substr(0, 2), 16);
	var g = parseInt(tmpColor.substr(2, 2), 16);
	var b = parseInt(tmpColor.substr(4, 2), 16);
	return 'box-shadow: 0 0 2px rgba($r,$g,$b,.6), 0 2px 4px rgba($r,$g,$b,.6)'
				.replace(/\$r/g, r).replace(/\$g/g, g).replace(/\$b/g, b);
});