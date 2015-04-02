(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card-search-results-grid-4.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "\r\n	<div class=\"";
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual) || helperMissing,helper.call(depth0, (depth0 && depth0.type), "planet", {"name":"ifEqual","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\" style=\"padding-bottom: 10px;\">\r\n		<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, depth0, {"name":"cardUrl","hash":{},"data":data})))
    + "\" data-image-base=\""
    + escapeExpression(((helper = helpers.imageBase || (depth0 && depth0.imageBase)),(typeof helper === functionType ? helper.call(depth0, {"name":"imageBase","hash":{},"data":data}) : helper)))
    + "\">\r\n			<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, (depth0 && depth0.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-md "
    + escapeExpression(((helper = helpers.type || (depth0 && depth0.type)),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\" />\r\n		</a>\r\n		<strong style=\"display: table;\">"
    + escapeExpression(((helper = helpers.setName || (depth0 && depth0.setName)),(typeof helper === functionType ? helper.call(depth0, {"name":"setName","hash":{},"data":data}) : helper)))
    + "</strong>\r\n	</div>\r\n	";
},"2":function(depth0,helpers,partials,data) {
  return "col-xs-12 col-sm-12 col-md-6";
  },"4":function(depth0,helpers,partials,data) {
  return "col-xs-12 col-sm-6 col-md-4 col-lg-3";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row card-search-results-grid-4\">\r\n	";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.results)),stack1 == null || stack1 === false ? stack1 : stack1.cards), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"useData":true});
templates['card-search-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "							\r\n					<label class=\"btn btn-default\" data-faction=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"><div class=\"icon-faction icon-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\"></div></label>\r\n					";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n					<label class=\"btn btn-default\" data-type=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"><span>"
    + escapeExpression(((helper = helpers.shortName || (depth0 && depth0.shortName)),(typeof helper === functionType ? helper.call(depth0, {"name":"shortName","hash":{},"data":data}) : helper)))
    + "</span></label>\r\n					";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "\r\n					<label class=\"btn btn-default\" data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + ": "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">\r\n						<span>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\r\n					</label>\r\n					";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row card-search-view\">	\r\n	<div class=\"col-xs-12 card-search-filter-container\">\r\n		<div id=\"textFilter\" class=\"input-group\" style=\"margin-bottom: 10px;\">\r\n			<input class=\"form-control\" id=\"mainSearchInput\" type=\"text\" placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.nameOrTraitOrKeyword", {"name":"loc","hash":{},"data":data})))
    + "\" value=\"\" />\r\n			<span class=\"input-group-btn\">\r\n        		<button class=\"btn btn-default\" type=\"button\"><span class=\"glyphicon glyphicon-search\"></span></button>\r\n      		</span>\r\n		</div>\r\n		<div class=\"row\">\r\n			<div class=\"col-xs-12\">\r\n				<div id=\"factionFilter\" class=\"btn-group select-many filter-faction filter-group\">\r\n					";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.filter)),stack1 == null || stack1 === false ? stack1 : stack1.factions), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				</div>\r\n				<div id=\"cardTypeFilter\" class=\"btn-group select-many filter-group\">\r\n					";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.filter)),stack1 == null || stack1 === false ? stack1 : stack1.cardTypes), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				</div>\r\n				<div id=\"quantityFilter\" class=\"btn-group select-many filter-group\">\r\n					";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 1, 4, 1, {"name":"for","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n				</div>\r\n				<label id=\"filterTrigger\" class=\"btn btn-default btn-standard filter-group\">\r\n					<span class=\"glyphicon glyphicon-filter\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sets", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</label>\r\n			</div>			\r\n		</div>\r\n		<div class=\"card-search-results-container\">			\r\n		</div>\r\n	</div>\r\n	\r\n</div>\r\n";
},"useData":true});
templates['card-set-filter-popover-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n		<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><input type=\"checkbox\" value=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.released), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.nodes), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n		</li>\r\n	";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "data-node-type=\""
    + escapeExpression(((helper = helpers.type || (depth0 && depth0.type)),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"";
},"4":function(depth0,helpers,partials,data) {
  return "checked=\"checked\"";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n			<ul class=\"tree-node\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.nodes), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n			</ul>\r\n		";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n				<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><input type=\"checkbox\" value=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.released), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\r\n			";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"filter-content\">\r\n	<ul class=\"tree-node\">\r\n	";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.tree)),stack1 == null || stack1 === false ? stack1 : stack1.nodes), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "		\r\n	</ul>\r\n	<label class=\"btn btn-default btn-primary filter-apply\"><span class=\"glyphicon glyphicon-ok\"></span></label>\r\n	<label class=\"btn btn-default filter-cancel\"><span class=\"glyphicon glyphicon-remove\"></span></label>\r\n</div>";
},"useData":true});
templates['card-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "	\r\n	\r\n	<div class=\"col-sm-6 col-md-4 col-md-offset-2 card-info\">\r\n		\r\n		<div class=\"panel panel-default\">\r\n			<div class=\"panel-heading\">\r\n				<h3 class=\"panel-title\">\r\n					<strong>"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>\r\n				</h3>\r\n			</div>\r\n			<div class=\"panel-body\">				\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.faction", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression((helper = helpers.searchLinkFaction || (depth0 && depth0.searchLinkFaction) || helperMissing,helper.call(depth0, depth0, {"name":"searchLinkFaction","hash":{},"data":data})))
    + "</span>\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.type", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression((helper = helpers.searchLinkType || (depth0 && depth0.searchLinkType) || helperMissing,helper.call(depth0, depth0, {"name":"searchLinkType","hash":{},"data":data})))
    + "</span>\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.traits", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression((helper = helpers.searchLinkTrait || (depth0 && depth0.searchLinkTrait) || helperMissing,helper.call(depth0, depth0, {"name":"searchLinkTrait","hash":{},"data":data})))
    + "</span>\r\n				<br />\r\n				";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth0 && depth0.cost), {"name":"smartIf","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.shield), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.command), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth0 && depth0.attack), {"name":"smartIf","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hitPoints), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.startingHandSize), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.startingResources), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.startingHandSize), {"name":"unless","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "								\r\n				<br />\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.set", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression((helper = helpers.searchLinkSetName || (depth0 && depth0.searchLinkSetName) || helperMissing,helper.call(depth0, depth0, {"name":"searchLinkSetName","hash":{},"data":data})))
    + "</span>\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.number", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\" style=\"margin-right: 10px;\">"
    + escapeExpression(((helper = helpers.number || (depth0 && depth0.number)),(typeof helper === functionType ? helper.call(depth0, {"name":"number","hash":{},"data":data}) : helper)))
    + "</span>\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.illustrator), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n			</div>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"col-sm-6 col-md-4\">\r\n		<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, (depth0 && depth0.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-image\" style=\"margin-bottom: 10px;\" />\r\n	</div>\r\n\r\n	";
},"2":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.cost || (depth0 && depth0.cost)),(typeof helper === functionType ? helper.call(depth0, {"name":"cost","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"4":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.shieldIcons", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.shield || (depth0 && depth0.shield)),(typeof helper === functionType ? helper.call(depth0, {"name":"shield","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"6":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.commandIcons", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.command || (depth0 && depth0.command)),(typeof helper === functionType ? helper.call(depth0, {"name":"command","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"8":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.attack", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.attack || (depth0 && depth0.attack)),(typeof helper === functionType ? helper.call(depth0, {"name":"attack","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"10":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.hp", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.hitPoints || (depth0 && depth0.hitPoints)),(typeof helper === functionType ? helper.call(depth0, {"name":"hitPoints","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"12":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.startingHandSize", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.startingHandSize || (depth0 && depth0.startingHandSize)),(typeof helper === functionType ? helper.call(depth0, {"name":"startingHandSize","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"14":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.startingResources", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.startingResources || (depth0 && depth0.startingResources)),(typeof helper === functionType ? helper.call(depth0, {"name":"startingResources","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"16":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.unique", {"name":"loc","hash":{},"data":data})))
    + ":</span>				\r\n				<span class=\"value\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.unique), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.loyal", {"name":"loc","hash":{},"data":data})))
    + ":</span>				\r\n				<span class=\"value\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loyal), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>		\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.signatureSquad", {"name":"loc","hash":{},"data":data})))
    + ":</span>				\r\n				<span class=\"value\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.warlordId), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</span>\r\n				";
},"17":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.yes", {"name":"loc","hash":{},"data":data})));
  },"19":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.no", {"name":"loc","hash":{},"data":data})));
  },"21":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\r\n				<br />\r\n				<span class=\"key\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.illustrator", {"name":"loc","hash":{},"data":data})))
    + ":</span>\r\n				<span class=\"value\">"
    + escapeExpression(((helper = helpers.illustrator || (depth0 && depth0.illustrator)),(typeof helper === functionType ? helper.call(depth0, {"name":"illustrator","hash":{},"data":data}) : helper)))
    + "</span>\r\n				";
},"23":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"col-xs-6 col-sm-3\">						\r\n				<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, (depth0 && depth0.warlord), {"name":"cardUrl","hash":{},"data":data})))
    + "\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n					<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"img-responsive\" style=\"margin: 0px 10px 10px 0px;\" />\r\n				</a>				\r\n			</div>	\r\n			";
},"25":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"col-xs-6 col-sm-3\">\r\n				<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, depth0, {"name":"cardUrl","hash":{},"data":data})))
    + "\" data-image-base=\""
    + escapeExpression(((helper = helpers.imageBase || (depth0 && depth0.imageBase)),(typeof helper === functionType ? helper.call(depth0, {"name":"imageBase","hash":{},"data":data}) : helper)))
    + "\">\r\n					<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, (depth0 && depth0.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"img-responsive\" style=\"margin: 0px 10px 10px 0px;\" />\r\n				</a>\r\n			</div>			\r\n			";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row card-view\">\r\n	";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.card), {"name":"with","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	<div class=\"col-sm-12 col-md-8 col-md-offset-2\">\r\n		<div class=\"row\">\r\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.warlord), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, (depth0 && depth0.signSquadCards), {"name":"each","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</div>\r\n	</div>	\r\n</div>\r\n";
},"useData":true});
templates['commons-ul-tree.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n	<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><input type=\"checkbox\" value=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.released), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.nodes), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n	</li>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "data-node-type=\""
    + escapeExpression(((helper = helpers.type || (depth0 && depth0.type)),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"";
},"4":function(depth0,helpers,partials,data) {
  return "checked=\"checked\"";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n		<ul class=\"tree-node\">\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.nodes), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n		</ul>\r\n	";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n			<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><input type=\"checkbox\" value=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.released), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\r\n		";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul class=\"tree-node\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.tree)),stack1 == null || stack1 === false ? stack1 : stack1.nodes), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "		\r\n</ul>";
},"useData":true});
templates['commons-ul.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<strong><span>"
    + escapeExpression(((helper = helpers.listTitle || (depth0 && depth0.listTitle)),(typeof helper === functionType ? helper.call(depth0, {"name":"listTitle","hash":{},"data":data}) : helper)))
    + "</span></strong>\r\n	";
},"3":function(depth0,helpers,partials,data,depth1) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n		<li class=\""
    + escapeExpression(((stack1 = (depth1 && depth1.listItemStyle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\r\n	";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div class=\""
    + escapeExpression(((helper = helpers.listContainerStyle || (depth0 && depth0.listContainerStyle)),(typeof helper === functionType ? helper.call(depth0, {"name":"listContainerStyle","hash":{},"data":data}) : helper)))
    + "\">\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.listTitle), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<ul class=\""
    + escapeExpression(((helper = helpers.listStyle || (depth0 && depth0.listStyle)),(typeof helper === functionType ? helper.call(depth0, {"name":"listStyle","hash":{},"data":data}) : helper)))
    + "\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.listItems), {"name":"each","hash":{},"fn":this.programWithDepth(3, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "		\r\n	</ul>\r\n</div>";
},"useData":true});
templates['deck-actions.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.decksave), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.publicdecksave), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deckdelete), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deckedit), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deckview), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.decklist), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.publicdecklist), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.decknew), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deckimport), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deckexport), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = ((helper = helpers.ifSignedIn || (depth0 && depth0.ifSignedIn)),(options={"name":"ifSignedIn","hash":{},"fn":this.program(35, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.ifSignedIn) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.publicdeckexport), {"name":"if","hash":{},"fn":this.program(38, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"btn-group\">\r\n	<button type=\"button\" class=\"btn btn-success deck-save\">\r\n		<span class=\"glyphicon glyphicon-save\"></span>\r\n	</button>\r\n	<button type=\"button\" class=\"btn btn-success dropdown-toggle\" data-toggle=\"dropdown\">\r\n		<span class=\"caret\"></span>\r\n		<span class=\"sr-only\">Toggle Dropdown</span>\r\n	</button>\r\n	<ul class=\"dropdown-menu\" role=\"menu\">\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" class=\"deck-save\" tabindex=\"-1\" style=\"cursor: pointer;\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.save", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n		</li>\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" class=\"deck-save-copy\" tabindex=\"-1\" style=\"cursor: pointer;\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.saveCopy", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n		</li>\r\n	</ul>\r\n</div>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = "";
  stack1 = ((helper = helpers.ifSignedIn || (depth0 && depth0.ifSignedIn)),(options={"name":"ifSignedIn","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.ifSignedIn) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n<a class=\"btn btn-default btn-success deck-save-copy\" data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.saveCopy", {"name":"loc","hash":{},"data":data})))
    + "\">\r\n	<span class=\"glyphicon glyphicon-save\"></span>\r\n</a>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a id=\"deckDelete\" class=\"btn btn-default btn-danger\" data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.delete", {"name":"loc","hash":{},"data":data})))
    + "\">\r\n	<span class=\"glyphicon glyphicon-trash\"></span>\r\n</a>\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<a class=\"btn btn-default\" data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.edit", {"name":"loc","hash":{},"data":data})))
    + "\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "edit/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deckedit)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deckedit)),stack1 == null || stack1 === false ? stack1 : stack1.techName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n	<span class=\"glyphicon glyphicon-pencil\"></span>\r\n</a>\r\n";
},"11":function(depth0,helpers,partials,data) {
  return "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<a class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.decklist)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"unless","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "\">\r\n	<span class=\"glyphicon glyphicon-align-justify\"></span>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.decklist)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</a>\r\n";
},"14":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.myDecks", {"name":"loc","hash":{},"data":data})));
  },"16":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.myDecks", {"name":"loc","hash":{},"data":data})));
},"18":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<a class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.publicdecklist)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"unless","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "\">\r\n	<span class=\"glyphicon glyphicon-align-justify\"></span>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.publicdecklist)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</a>\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.decks", {"name":"loc","hash":{},"data":data})));
  },"21":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.decks", {"name":"loc","hash":{},"data":data})));
},"23":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<a class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.decknew)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"unless","hash":{},"fn":this.program(24, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "new\">\r\n	<span class=\"glyphicon glyphicon-plus\"></span>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.decknew)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</a>\r\n";
},"24":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.create", {"name":"loc","hash":{},"data":data})));
  },"26":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.createDeck", {"name":"loc","hash":{},"data":data})));
},"28":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<a class=\"btn btn-default\" data-toggle=\"tooltip\" title=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.deckimport)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"unless","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "import\">\r\n	<span class=\"glyphicon glyphicon-import\"></span>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.deckimport)),stack1 == null || stack1 === false ? stack1 : stack1.showText), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</a>\r\n";
},"29":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.import", {"name":"loc","hash":{},"data":data})));
  },"31":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.importDeck", {"name":"loc","hash":{},"data":data})));
},"33":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"btn-group\">\r\n	<button type=\"button\" class=\"btn btn-default export-copy-to-clipboard\">\r\n		<span class=\"glyphicon glyphicon-export\"></span>\r\n	</button>\r\n	<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\r\n		<span class=\"caret\"></span>\r\n		<span class=\"sr-only\">Toggle Dropdown</span>\r\n	</button>\r\n	<ul class=\"dropdown-menu\" role=\"menu\">\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" class=\"export-copy-to-clipboard\" tabindex=\"-1\" style=\"cursor: pointer;\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.copyToClipboard", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n		</li>\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" id=\"deckExportDownloadOctgn\" tabindex=\"-1\" href=\""
    + escapeExpression(((helper = helpers.restUrl || (depth0 && depth0.restUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"restUrl","hash":{},"data":data}) : helper)))
    + "/deck/export/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deckexport)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?language="
    + escapeExpression(((helper = helpers.language || (depth0 && depth0.language)),(typeof helper === functionType ? helper.call(depth0, {"name":"language","hash":{},"data":data}) : helper)))
    + "\">\r\n				"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.downloadOctgnFile", {"name":"loc","hash":{},"data":data})))
    + "\r\n			</a>\r\n		</li>\r\n	</ul>\r\n</div>\r\n";
},"35":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deckexportall), {"name":"if","hash":{},"fn":this.program(36, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n";
},"36":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"btn-group\">\r\n	<button type=\"button\" class=\"btn btn-default\">\r\n		<span class=\"glyphicon glyphicon-export\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.exportAllDecks", {"name":"loc","hash":{},"data":data})))
    + "\r\n	</button>\r\n	<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\r\n		<span class=\"caret\"></span>\r\n		<span class=\"sr-only\">Toggle Dropdown</span>\r\n	</button>\r\n	<ul class=\"dropdown-menu\" role=\"menu\">\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" tabindex=\"-1\" href=\""
    + escapeExpression(((helper = helpers.restUrl || (depth0 && depth0.restUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"restUrl","hash":{},"data":data}) : helper)))
    + "/deck/export?language="
    + escapeExpression(((helper = helpers.language || (depth0 && depth0.language)),(typeof helper === functionType ? helper.call(depth0, {"name":"language","hash":{},"data":data}) : helper)))
    + "\">\r\n				"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.downloadOctgnFiles", {"name":"loc","hash":{},"data":data})))
    + "\r\n			</a>\r\n		</li>\r\n	</ul>\r\n</div>\r\n	\r\n";
},"38":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"btn-group\">\r\n	<button type=\"button\" class=\"btn btn-default export-copy-to-clipboard\">\r\n		<span class=\"glyphicon glyphicon-export\"></span>\r\n	</button>\r\n	<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\r\n		<span class=\"caret\"></span>\r\n		<span class=\"sr-only\">Toggle Dropdown</span>\r\n	</button>\r\n	<ul class=\"dropdown-menu\" role=\"menu\">\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" class=\"export-copy-to-clipboard\" tabindex=\"-1\" style=\"cursor: pointer;\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.copyToClipboard", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n		</li>\r\n		<li role=\"presentation\">\r\n			<a role=\"menuitem\" id=\"deckExportDownloadOctgn\" tabindex=\"-1\" href=\""
    + escapeExpression(((helper = helpers.restUrl || (depth0 && depth0.restUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"restUrl","hash":{},"data":data}) : helper)))
    + "/deck/public/export/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.publicdeckexport)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?language="
    + escapeExpression(((helper = helpers.language || (depth0 && depth0.language)),(typeof helper === functionType ? helper.call(depth0, {"name":"language","hash":{},"data":data}) : helper)))
    + "\">\r\n				"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.downloadOctgnFile", {"name":"loc","hash":{},"data":data})))
    + "\r\n			</a>\r\n		</li>\r\n	</ul>\r\n</div>\r\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.actions), {"name":"with","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"useData":true});
templates['deck-comments-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n<div class=\"block folding-block\">\r\n	<div class=\"block-header\">\r\n		<div class=\"block-header-text\">\r\n			<span class=\"glyphicon glyphicon-comment\"></span>\r\n			&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.postComment", {"name":"loc","hash":{},"data":data})))
    + "\r\n		</div>\r\n	</div>\r\n	<div class=\"block-content\">\r\n		<div class=\"deck-comments-post\">\r\n			<div class=\"form-group\">\r\n				<label for=\"deckCommentTextarea\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.comment", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n				<textarea id=\"deckCommentTextarea\" class=\"form-control\" rows=\"5\"></textarea>\r\n			</div>\r\n			<button id=\"deckCommentPostButton\" class=\"btn btn-success\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.postComment", {"name":"loc","hash":{},"data":data})))
    + "</button>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", blockHelperMissing=helpers.blockHelperMissing, buffer = "<div class=\"block folding-block\">\r\n	<div class=\"block-header\">\r\n		<div class=\"block-header-text\">\r\n			<span class=\"glyphicon glyphicon-comment\"></span>\r\n			&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.comments", {"name":"loc","hash":{},"data":data})))
    + "\r\n		</div>\r\n	</div>\r\n	<div class=\"block-content\">\r\n		<div class=\"deck-comments-container\">\r\n			<ul class=\"list-unstyled\"></ul>\r\n		</div>		\r\n	</div>\r\n</div>\r\n";
  stack1 = ((helper = helpers.ifSignedIn || (depth0 && depth0.ifSignedIn)),(options={"name":"ifSignedIn","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.ifSignedIn) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['deck-comment.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<li class=\"comment\">\r\n	<div class=\"comment-avatar\">\r\n		<span class=\"glyphicon glyphicon-user\"></span>\r\n	</div>\r\n	<div class=\"comment-content\">\r\n		<div class=\"comment-header\">		\r\n			<span class=\"user text-primary\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.comment)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n			<span class=\"secondary\">&nbsp;&#8226;&nbsp;</span>\r\n			<span class=\"secondary\" data-toggle=\"tooltip\" data-placement=\"right\" title=\""
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.comment)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"moment","hash":{},"data":data})))
    + "\">\r\n				"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.comment)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "\r\n			</span>\r\n		</div>\r\n		<div class=\"comment-body\">		\r\n			<span>";
  stack1 = (helper = helpers.markdown || (depth0 && depth0.markdown) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.comment)),stack1 == null || stack1 === false ? stack1 : stack1.value), {"name":"markdown","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</span>\r\n		</div>		\r\n	</div>\r\n</li>";
},"useData":true});
templates['deck-config.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"configContent\">\r\n	<ul class=\"radio-group\">\r\n		<li class=\"no-wrap\"><input type=\"radio\" name=\"csQuantity\" value=\"1\">1&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.coreSet", {"name":"loc","hash":{},"data":data})))
    + "</li>\r\n		<li class=\"no-wrap\"><input type=\"radio\" name=\"csQuantity\" value=\"2\">2&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.coreSets", {"name":"loc","hash":{},"data":data})))
    + "</li>\r\n		<li class=\"no-wrap\"><input type=\"radio\" name=\"csQuantity\" value=\"3\">3&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.coreSets", {"name":"loc","hash":{},"data":data})))
    + "</li>\r\n	</ul>\r\n	<a id=\"configApply\" class=\"btn btn-default btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span></a>\r\n	<a id=\"configCancel\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></a>\r\n</div>";
},"useData":true});
templates['deck-description-modal.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div id=\"deckEditCommonModal\" class=\"modal\">\r\n	<div class=\"modal-dialog modal-lg\">\r\n		<div class=\"modal-content\">\r\n			<div class=\"modal-header\">\r\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n					<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "</span>\r\n				</button>\r\n				<h4 class=\"modal-title\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.title), {"name":"loc","hash":{},"data":data})))
    + "</h4>\r\n			</div>\r\n			<div class=\"modal-body\">\r\n				<div class=\"deck-description-view\"></div>\r\n			</div>\r\n			<div class=\"modal-footer\">\r\n				<button type=\"button\" class=\"btn "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.button)),stack1 == null || stack1 === false ? stack1 : stack1.btnClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.button)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n					<span class=\"glyphicon "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.button)),stack1 == null || stack1 === false ? stack1 : stack1.glyphiconClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.button)),stack1 == null || stack1 === false ? stack1 : stack1.title), {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>	\r\n				<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\r\n					<span class=\"glyphicon glyphicon-remove\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['deck-description-view.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div class=\"block folding-block\">\r\n	<div class=\"block-header\">\r\n		<div class=\"block-header-text\">\r\n			<span class=\"glyphicon glyphicon-pencil\"></span>\r\n			&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.edit2", {"name":"loc","hash":{},"data":data})))
    + "\r\n		</div>\r\n	</div>\r\n	<div class=\"block-content\">\r\n		<div class=\"form-group\">\r\n			<label for=\"deckName\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.name", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<input class=\"form-control\" id=\"deckName\" type=\"text\"placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.deckName", {"name":"loc","hash":{},"data":data})))
    + "\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\r\n		</div>\r\n		<div class=\"form-group\">\r\n			<label for=\"deckDescription\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.description", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<textarea class=\"form-control\" id=\"deckDescription\" placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.deckDescription", {"name":"loc","hash":{},"data":data})))
    + "\" rows=\"10\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\r\n		</div>\r\n		<a href=\"http://en.wikipedia.org/wiki/Markdown#Example\" target=\"_blank\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.markdownSyntaxExamples", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"block folding-block\">\r\n	<div class=\"block-header\">\r\n		<div class=\"block-header-text\">\r\n			<span class=\"glyphicon glyphicon-eye-open\"></span>\r\n			&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.preview", {"name":"loc","hash":{},"data":data})))
    + "\r\n		</div>\r\n	</div>\r\n	<div class=\"block-content\">\r\n		<h2 id=\"deckNamePreview\">";
  stack1 = (helper = helpers.markdown || (depth0 && depth0.markdown) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.name), {"name":"markdown","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h2>\r\n		<h5 style=\"color: gray;\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\r\n		<div id=\"deckDescriptionPreview\">";
  stack1 = (helper = helpers.markdown || (depth0 && depth0.markdown) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.description), {"name":"markdown","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</div>\r\n	</div>\r\n</div>";
},"useData":true});
templates['deck-export-bbcode.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "[b]";
  stack1 = ((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ("
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + ")[/b]\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n";
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + "x [url=http://www.conquestdb.com"
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"cardUrl","hash":{},"data":data})))
    + "]";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.includeSetName), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "[/url]\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.setName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.link)),stack1 == null || stack1 === false ? stack1 : stack1.key), {"name":"loc","hash":{},"data":data})))
    + ": "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.link)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "[url=http://www.conquestdb.com"
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, (depth0 && depth0.warlord), {"name":"cardUrl","hash":{},"data":data})))
    + "]";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "[/url]\r\n\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.membersGroups), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.link), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['deck-export-modal.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"exportModal\" class=\"modal\">\r\n	<div class=\"modal-dialog modal-lg\">\r\n		<div class=\"modal-content\">\r\n			<div class=\"modal-header\">\r\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "</span></button>\r\n				<h4 class=\"modal-title\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.exportDeck", {"name":"loc","hash":{},"data":data})))
    + "</h4>\r\n			</div>\r\n			<div class=\"modal-body\">\r\n				<div class=\"row\">\r\n					<div class=\"mg-control-group col-md-6\">\r\n						<label><strong>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.groupBy", {"name":"loc","hash":{},"data":data})))
    + ":</strong></label>\r\n						<div class=\"btn-group btn-group-sm\">\r\n							<label class=\"btn btn-default\" data-group-key=\"typeDisplay\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.type", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"memberQuantity\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"setName\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.set", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"factionDisplay\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.faction", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"cost\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n						</div>\r\n					</div>\r\n					<div class=\"mg-control-sort col-md-4\">\r\n						<label><strong>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sortBy", {"name":"loc","hash":{},"data":data})))
    + ":</strong></label>\r\n						<div class=\"btn-group btn-group-sm\">\r\n							<label class=\"btn btn-default\" data-sort-key=\"name\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.name", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-sort-key=\"memberQuantity\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-sort-key=\"cost\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n						</div>\r\n					</div>\r\n				</div>\r\n				<ul class=\"nav nav-tabs\" role=\"tablist\">\r\n					<li class=\"active\"><a href=\"#exportPlain\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.exportPlain", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n					<li><a href=\"#exportBBCode\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.exportBBCode", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n					<li><a href=\"#exportBackup\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.exportBackup", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n				</ul>\r\n\r\n				<div class=\"tab-content\" style=\"padding-top: 20px;\">\r\n					<div class=\"tab-pane active\" id=\"exportPlain\"><textarea id=\"1\" class=\"form-control\" rows=\"20\">1</textarea></div>\r\n					<div class=\"tab-pane\" id=\"exportBBCode\"><textarea id=\"2\" class=\"form-control\" rows=\"20\">2</textarea></div>\r\n					<div class=\"tab-pane\" id=\"exportBackup\"><textarea id=\"3\" class=\"form-control\" rows=\"20\">3</textarea></div>\r\n				</div>\r\n			</div>\r\n			<div class=\"modal-footer\">				\r\n				<button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" id=\"exportCopyAndCloseButton\">\r\n					<span class=\"glyphicon glyphicon-copy\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.copyToClipboardAndClose", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>\r\n				<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"exportCloseButton\">\r\n					<span class=\"glyphicon glyphicon-remove\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['deck-export-plain.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "";
  stack1 = ((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ("
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + ")\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + "x ";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.includeSetName), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.setName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.link)),stack1 == null || stack1 === false ? stack1 : stack1.key), {"name":"loc","hash":{},"data":data})))
    + ": "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.link)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", buffer = "";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.membersGroups), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.link), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['deck-filter.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n		<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><input type=\"checkbox\" value=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.released), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.nodes), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n		</li>\r\n	";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "data-node-type=\""
    + escapeExpression(((helper = helpers.type || (depth0 && depth0.type)),(typeof helper === functionType ? helper.call(depth0, {"name":"type","hash":{},"data":data}) : helper)))
    + "\"";
},"4":function(depth0,helpers,partials,data) {
  return "checked=\"checked\"";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n			<ul class=\"tree-node\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.nodes), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n			</ul>\r\n		";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n				<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><input type=\"checkbox\" value=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.released), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\r\n			";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"filterContent\">\r\n	<ul class=\"tree-node\">\r\n	";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.tree)),stack1 == null || stack1 === false ? stack1 : stack1.nodes), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "		\r\n	</ul>\r\n	<a id=\"filterApply\" class=\"btn btn-default btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span></a>\r\n	<a id=\"filterCancel\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></a>\r\n</div>";
},"useData":true});
templates['deck-list-data-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"pagination-container text-center\">\r\n	<nav>\r\n		<ul class=\"pagination\">					\r\n			<li ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.prevPage), {"name":"unless","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n				<a href=\"#\" aria-label=\"Previous\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.prevPage), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n					<span aria-hidden=\"true\">&laquo;</span>\r\n				</a>\r\n			</li>\r\n			";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.pages), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<li ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.nextPage), {"name":"unless","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n				<a href=\"#\" aria-label=\"Next\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.nextPage), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + ">\r\n					<span aria-hidden=\"true\">&raquo;</span>\r\n				</a>\r\n			</li>\r\n		</ul>\r\n	</nav>\r\n</div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  return "class=\"disabled\"";
  },"4":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return "data-page-number=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.prevPage)),stack1 == null || stack1 === false ? stack1 : stack1.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
},"6":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "><a href=\"#\" data-page-number=\""
    + escapeExpression(((helper = helpers.number || (depth0 && depth0.number)),(typeof helper === functionType ? helper.call(depth0, {"name":"number","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = helpers.number || (depth0 && depth0.number)),(typeof helper === functionType ? helper.call(depth0, {"name":"number","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n			";
},"7":function(depth0,helpers,partials,data) {
  return "class=\"active\"";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return "data-page-number=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.nextPage)),stack1 == null || stack1 === false ? stack1 : stack1.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
},"11":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n		<div class=\"col-sm-6 col-xs-12\">\r\n			<div class=\"deck-container "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.faction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n				<div class=\"deck\">\r\n					<div class=\"row\">\r\n						";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.deck), {"name":"with","hash":{},"fn":this.programWithDepth(12, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n					<div class=\"row\">\r\n						<div class=\"col-xs-12\">\r\n							<div class=\"deck-stats-container pull-left\">\r\n								<table class=\"deck-stats-table\">\r\n									<thead>\r\n										<tr>\r\n											<th></th>\r\n											<th><span data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.cardsQuantity", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.cardsQuantity.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n											<th><span data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sum", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sum.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n											<th><span data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.average", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.average.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n										</tr>\r\n									</thead>\r\n									<tbody>\r\n										";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stats), {"name":"each","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n									</tbody>\r\n								</table>\r\n							</div>\r\n							<div class=\"charts-container pull-left\">\r\n								<div class=\"chart-container factions\" data-deck-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n									<div class=\"legend\"></div>\r\n									<canvas class=\"chart\" width=\"80\" height=\"80\"></canvas>\r\n								</div>\r\n								<div class=\"chart-container types\" data-deck-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n									<div class=\"legend\"></div>\r\n									<canvas class=\"chart\" width=\"80\" height=\"80\"></canvas>\r\n								</div>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					<div class=\"row hidden members\">\r\n						<div class=\"col-xs-12\">\r\n							";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.membersGroups), {"name":"each","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n						</div>\r\n					</div>\r\n					<div class=\"row footer\">\r\n						<div class=\"col-xs-12 text-right\">\r\n							<span class=\"secondary-text\">\r\n								";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.published), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n								";
  stack1 = (helper = helpers.unlessEqual || (depth0 && depth0.unlessEqual) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.modifyDate), {"name":"unlessEqual","hash":{},"fn":this.program(27, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n							</span>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		";
},"12":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n						<div class=\"col-xs-12\">\r\n							<div class=\"pull-right\">\r\n								";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.published), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n								<a class=\"btn btn-default expand-toggle\">\r\n									<span class=\"glyphicon glyphicon-fullscreen\"></span>\r\n								</a>\r\n							</div>							\r\n							<h4>"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n							<h4>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <small>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.factionDisplay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</small></h4>\r\n						</div>\r\n						";
},"13":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n								<a class=\"btn btn-default\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\">\r\n									<span class=\"glyphicon glyphicon-eye-open\"></span>\r\n								</a>\r\n								";
},"15":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n								<a class=\"btn btn-default\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "edit/"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\">\r\n									<span class=\"glyphicon glyphicon-pencil\"></span>\r\n								</a>\r\n								";
},"17":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "\r\n										<tr>\r\n											<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.name), {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n											<td>"
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.quantityX), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</span></td>\r\n											<td>"
    + escapeExpression(((helper = helpers.sum || (depth0 && depth0.sum)),(typeof helper === functionType ? helper.call(depth0, {"name":"sum","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n											<td>"
    + escapeExpression(((helper = helpers.average || (depth0 && depth0.average)),(typeof helper === functionType ? helper.call(depth0, {"name":"average","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n										</tr>\r\n										";
},"18":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "+"
    + escapeExpression(((helper = helpers.quantityX || (depth0 && depth0.quantityX)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantityX","hash":{},"data":data}) : helper)))
    + "X";
},"20":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n							<div class=\"col-xs-4\">\r\n								<div class=\"mg\">\r\n									<span class=\"mg-title\">"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "&nbsp;("
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + ")</span>\r\n									<ul>\r\n										";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n									</ul>\r\n								</div>\r\n							</div>\r\n							";
},"21":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n										<li>"
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + "x&nbsp;"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\r\n										";
},"23":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "\r\n								<span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n								<span class=\"separator\">&nbsp;&#8226;&nbsp;</span>\r\n								<span class=\"value\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.published", {"name":"loc","hash":{},"data":data})))
    + ": "
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"moment","hash":{},"data":data})))
    + "\">\r\n									"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "\r\n								</span>\r\n								";
},"25":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n								<span class=\"value\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.created", {"name":"loc","hash":{},"data":data})))
    + ": "
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"moment","hash":{},"data":data})))
    + "\">\r\n									"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "\r\n								</span>\r\n								";
},"27":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n								<span class=\"separator\">&nbsp;&#8226;&nbsp;</span>\r\n								<span class=\"value\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.modified", {"name":"loc","hash":{},"data":data})))
    + ": "
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.modifyDate), {"name":"moment","hash":{},"data":data})))
    + "\">\r\n									"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.modifyDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "\r\n								</span>\r\n								";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pagination), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<div class=\"decks-container\">\r\n	<div class=\"row\">\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.deckWrappers), {"name":"each","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n</div>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pagination), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['deck-list-filter-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"btn-group btn-group-filter filter-faction filter-group select-many primary\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.factions), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</div>\r\n<label id=\"searchButton\" class=\"btn btn-primary filter-group\"><span class=\"glyphicon glyphicon-search\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.search", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n<label id=\"moreButton\" class=\"btn btn-default filter-group\"><span class=\"glyphicon glyphicon-menu-right\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.more", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<label class=\"btn btn-default\" data-faction=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n		<div class=\"icon-faction icon-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\"></div>\r\n	</label>\r\n	";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\r\n<div class=\"row\">\r\n	<div class=\"col-md-4\">\r\n		<div class=\"form-group\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.primaryFaction", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<div clas=\"input-group\">\r\n				<div class=\"btn-group btn-group-filter filter-faction select-many primary\">\r\n						";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.factions), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n			</div>\r\n		</div>\r\n		<div class=\"form-group\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.secondaryFaction", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<div clas=\"input-group\">\r\n				<div class=\"btn-group btn-group-filter filter-faction select-many secondary\">\r\n						";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.factions), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n			</div>\r\n		</div>\r\n\r\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.config)),stack1 == null || stack1 === false ? stack1 : stack1.showCreateDate), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.config)),stack1 == null || stack1 === false ? stack1 : stack1.showModifyDate), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.config)),stack1 == null || stack1 === false ? stack1 : stack1.showPublishDate), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.config)),stack1 == null || stack1 === false ? stack1 : stack1.showUsername), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n	</div>\r\n	<div class=\"col-md-3\">\r\n		<div class=\"form-group\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.set", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<div id=\"setMatchMode\" style=\"margin-bottom: 10px;\">\r\n				<div class=\"radio\">\r\n					<label>\r\n						<input type=\"radio\" name=\"matchMode\" id=\"matchModeSubset\" value=\"subset\" checked=\"checked\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.matchModeSubset", {"name":"loc","hash":{},"data":data})))
    + "\r\n						<div class=\"checkbox\" style=\"margin-bottom: 0px; margin-top: 0px;\">\r\n							<label>\r\n								<input type=\"checkbox\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.skipCoreSetOnlyDecks", {"name":"loc","hash":{},"data":data})))
    + "\r\n							</label>\r\n						</div>\r\n					</label>\r\n					\r\n				</div>\r\n				<div class=\"radio\">\r\n					<label>\r\n						<input type=\"radio\" name=\"matchMode\" id=\"matchModeExact\" value=\"exact\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.matchModeExact", {"name":"loc","hash":{},"data":data})))
    + "\r\n					</label>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div id=\"cardSetFilter\" class=\"input-group\"></div>\r\n	</div>\r\n	<div class=\"col-md-3\">\r\n		<div class=\"form-group\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.warlord", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<div id=\"warlordFilter\" class=\"input-group\"></div>\r\n		</div>\r\n	</div>\r\n	<div class=\"col-md-2\">\r\n		<div class=\"deck-sort-container form-group\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sorting", {"name":"loc","hash":{},"data":data})))
    + "</label>			\r\n		</div>\r\n		<label id=\"searchButton\" class=\"btn btn-primary form-control\" style=\"margin-bottom: 10px;\"><span class=\"glyphicon glyphicon-search\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.search", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n		<label id=\"clearButton\" class=\"btn btn-default form-control\" style=\"margin-bottom: 10px;\"><span class=\"glyphicon glyphicon-remove\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.clear", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n		<label id=\"lessButton\" class=\"btn btn-default form-control\" style=\"margin-bottom: 10px;\"><span class=\"glyphicon glyphicon-menu-left\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.less", {"name":"loc","hash":{},"data":data})))
    + "</label>		\r\n	</div>\r\n</div>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<label class=\"btn btn-default\" data-faction=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n							<div class=\"icon-faction icon-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\"></div>\r\n						</label>\r\n						";
},"7":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"createDateFilter\" class=\"form-group date-range-filter complex\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.createDate", {"name":"loc","hash":{},"data":data})))
    + "</label>			\r\n			<div class=\"input-daterange input-group\">\r\n				<input type=\"text\" class=\"form-control\" name=\"start\" />\r\n				<span class=\"input-group-addon\">-</span>\r\n				<input type=\"text\" class=\"form-control\" name=\"end\" />\r\n			</div>\r\n		</div>\r\n		";
},"9":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"modifyDateFilter\" class=\"form-group date-range-filter complex\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.modifyDate", {"name":"loc","hash":{},"data":data})))
    + "</label>		\r\n			<div class=\"input-daterange input-group\">\r\n				<input type=\"text\" class=\"form-control\" name=\"start\" />\r\n				<span class=\"input-group-addon\">-</span>\r\n				<input type=\"text\" class=\"form-control\" name=\"end\" />\r\n			</div>			\r\n		</div>\r\n		";
},"11":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"publishDateFilter\" class=\"form-group date-range-filter complex\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.publishDate", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			\r\n			<div class=\"input-daterange input-group\">\r\n				<input type=\"text\" class=\"form-control\" name=\"start\" />\r\n				<span class=\"input-group-addon\">-</span>\r\n				<input type=\"text\" class=\"form-control\" name=\"end\" />\r\n			</div>			\r\n		</div>\r\n		";
},"13":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"usernameFilter\" class=\"form-group\">\r\n			<label>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.username", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n			<input type=\"text\" class=\"form-control\" />	\r\n		</div>\r\n		";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing;
  stack1 = (helper = helpers.smartUnless || (depth0 && depth0.smartUnless) || helperMissing,helper.call(depth0, (depth0 && depth0.advanced), {"name":"smartUnless","hash":{},"fn":this.program(1, data),"inverse":this.program(4, data),"data":data}));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"useData":true});
templates['deck-member-modal.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n					<label class=\"btn btn-default\" ";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth1 && depth1.readOnly), {"name":"smartIf","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n					";
},"2":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div id=\"messageModal\" class=\"modal\">\r\n	<div class=\"modal-dialog\">\r\n		<div class=\"modal-content\">\r\n			<div class=\"modal-header\">\r\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "</span></button>\r\n				<h4 class=\"modal-title\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.member)),stack1 == null || stack1 === false ? stack1 : stack1.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\r\n			</div>\r\n			<div class=\"modal-body\" style=\"text-align: center;\">\r\n				<div class=\"btn-group btn-group-qty\" style=\"display: table; margin-bottom: 10px; margin-left: auto; margin-right: auto;\">\r\n					";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 0, ((stack1 = (depth0 && depth0.member)),stack1 == null || stack1 === false ? stack1 : stack1.availableQuantity), 1, {"name":"for","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n				</div>\r\n				<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.member)),stack1 == null || stack1 === false ? stack1 : stack1.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-md\" />\r\n			</div>\r\n			<div class=\"modal-footer\">\r\n				<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.member)),stack1 == null || stack1 === false ? stack1 : stack1.card), {"name":"cardUrl","hash":{},"data":data})))
    + "\" class=\"btn btn-default\" target=\"_blank\">\r\n					<span class=\"glyphicon glyphicon-search\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.gotoCardPage", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</a>\r\n				<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"exportCloseButton\">\r\n					<span class=\"glyphicon glyphicon-remove\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['deck-members-grid-2.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n	<div class=\"col-xs-12 col-sm-6 members-grid-item text\" data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\">\r\n		<table>\r\n			<tbody>\r\n				<tr>\r\n					<td>\r\n						<a data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"cursor: pointer;\">\r\n							<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-sm\" />\r\n						</a>\r\n					</td>\r\n					<td>\r\n						<div class=\"btn-group btn-group-qty\">\r\n							";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 0, (depth0 && depth0.availableQuantity), 1, {"name":"for","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n						</div>\r\n						<div style=\"line-height: 1;\">\r\n							<small><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></small>\r\n							<br />\r\n							<span class=\"secondary-text\">\r\n								";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.cost), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.shield), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.command), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.attack), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.hitPoints), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n							</span>\r\n							<br />\r\n							<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkType || (depth0 && depth0.searchLinkType) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkType","hash":{},"data":data})))
    + "</span>\r\n							<br />\r\n							<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkTrait || (depth0 && depth0.searchLinkTrait) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkTrait","hash":{},"data":data})))
    + "</span>\r\n							<br />\r\n							<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkSetName || (depth0 && depth0.searchLinkSetName) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkSetName","hash":{},"data":data})))
    + "</span>\r\n						</div>\r\n						\r\n					</td>\r\n				</tr>\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	";
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n							<label class=\"btn btn-default\" ";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth2 && depth2.readOnly), {"name":"smartIf","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n							";
},"3":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row members-grid members-grid-md\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>		";
},"useData":true});
templates['deck-members-grid-3.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n	<div class=\"col-xs-8 col-sm-4 members-grid-item text\" data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\">\r\n		<table>\r\n			<tbody>\r\n				<tr>\r\n					<td>\r\n						<a data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"cursor: pointer;\">\r\n							<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-xs\" />\r\n						</a>\r\n					</td>\r\n					<td>\r\n						<div class=\"btn-group btn-group-qty\">\r\n							";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 0, (depth0 && depth0.availableQuantity), 1, {"name":"for","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n						</div>\r\n						<div style=\"line-height: 1;\">\r\n							<small><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></small>\r\n							<br />\r\n							<span class=\"secondary-text\">\r\n								";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.cost), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.shield), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.command), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.attack), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.hitPoints), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n							</span>\r\n							<br />\r\n							<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkType || (depth0 && depth0.searchLinkType) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkType","hash":{},"data":data})))
    + "</span>\r\n							<br />\r\n							<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkTrait || (depth0 && depth0.searchLinkTrait) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkTrait","hash":{},"data":data})))
    + "</span>\r\n							<br />\r\n							<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkSetName || (depth0 && depth0.searchLinkSetName) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkSetName","hash":{},"data":data})))
    + "</span>\r\n						</div>\r\n					</td>\r\n				</tr>\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	";
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n							<label class=\"btn btn-default\" ";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth2 && depth2.readOnly), {"name":"smartIf","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n							";
},"3":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row members-grid members-grid-sm\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>";
},"useData":true});
templates['deck-members-grid-4.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n	<div class=\"col-xs-6 col-sm-3 members-grid-item\" data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\">\r\n		<div class=\"btn-group btn-group-qty\">\r\n		";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 0, (depth0 && depth0.availableQuantity), 1, {"name":"for","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "	\r\n		</div>\r\n		<a data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"cursor: pointer;\">\r\n			<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-sm\" style=\"margin-bottom: 5px;\" />\r\n		</a>\r\n		<small><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></small>\r\n	</div>\r\n	";
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n			<label class=\"btn btn-default\" ";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth2 && depth2.readOnly), {"name":"smartIf","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n		";
},"3":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row members-grid members-grid-md\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>";
},"useData":true});
templates['deck-members-grid-6.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n	<div class=\"col-xs-4 col-sm-2 members-grid-item\" data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\">\r\n		<div class=\"btn-group btn-group-qty\">\r\n		";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 0, (depth0 && depth0.availableQuantity), 1, {"name":"for","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "	\r\n		</div>\r\n		<a data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"cursor: pointer;\">\r\n			<img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-xs\" style=\"margin-bottom: 5px;\" />\r\n		</a>\r\n		<small><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></small>\r\n	</div>\r\n	";
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n			<label class=\"btn btn-default\" ";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth2 && depth2.readOnly), {"name":"smartIf","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n		";
},"3":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row members-grid members-grid-sm\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>";
},"useData":true});
templates['deck-members-list.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n<div class=\"members-list-item row\" data-card-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n	<div class=\"col-xs-4 col-md-2\">\r\n		<div class=\"btn-group btn-group-qty\">\r\n			";
  stack1 = (helper = helpers['for'] || (depth0 && depth0['for']) || helperMissing,helper.call(depth0, 0, (depth0 && depth0.availableQuantity), 1, {"name":"for","hash":{},"fn":this.programWithDepth(2, data, depth1),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"col-xs-8 col-md-10\">\r\n		<div class=\"row\">\r\n			<div class=\"col-xs-12 col-sm-5\">				\r\n				<div class=\"name-col\">\r\n					<a data-card-id=\""
    + escapeExpression(((helper = helpers.cardId || (depth0 && depth0.cardId)),(typeof helper === functionType ? helper.call(depth0, {"name":"cardId","hash":{},"data":data}) : helper)))
    + "\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"cursor: pointer;\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\r\n					<br />\r\n					<span class=\"secondary-text\">"
    + escapeExpression((helper = helpers.searchLinkSetName || (depth0 && depth0.searchLinkSetName) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkSetName","hash":{},"data":data})))
    + "&nbsp;|&nbsp;"
    + escapeExpression((helper = helpers.searchLinkTrait || (depth0 && depth0.searchLinkTrait) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkTrait","hash":{},"data":data})))
    + "</span>\r\n				</div>				\r\n			</div>\r\n			<div class=\"col-xs-12 col-sm-7\">\r\n				<div class=\"type-col type-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression((helper = helpers.searchLinkType || (depth0 && depth0.searchLinkType) || helperMissing,helper.call(depth0, (depth0 && depth0.card), {"name":"searchLinkType","hash":{},"data":data})))
    + "</div>\r\n				<div class=\"faction-col text-center\"><img src=\""
    + escapeExpression((helper = helpers.factionImagePath || (depth0 && depth0.factionImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.faction), {"name":"factionImagePath","hash":{},"data":data})))
    + "\" /></div>\r\n				<div class=\"stat-col text-center\">";
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.cost), -1, {"name":"ifEqual","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n				<div class=\"stat-col text-center\">";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.shield), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n				<div class=\"stat-col text-center\">";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.command), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n				<div class=\"stat-col text-center\">";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.attack), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\r\n				<div class=\"stat-col text-center\">";
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.hitPoints), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"2":function(depth0,helpers,partials,data,depth2) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n			<label class=\"btn btn-default\" ";
  stack1 = (helper = helpers.smartIf || (depth0 && depth0.smartIf) || helperMissing,helper.call(depth0, (depth2 && depth2.readOnly), {"name":"smartIf","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + " data-quantity=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n			";
},"3":function(depth0,helpers,partials,data) {
  return "disabled=\"disabled\"";
  },"5":function(depth0,helpers,partials,data) {
  return "X";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing;
  stack1 = (helper = helpers.na || (depth0 && depth0.na) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.cost), {"name":"na","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"members-list-header row\">\r\n	<div class=\"col-xs-4 col-md-2\">\r\n		<span>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + "</span>\r\n	</div>\r\n	<div class=\"col-xs-8 col-md-10\">\r\n		<div class=\"row\">\r\n			<div class=\"col-xs-12 col-sm-5\">				\r\n				<div class=\"name-col\">								\r\n					<span>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.name", {"name":"loc","hash":{},"data":data})))
    + "</span>\r\n				</div>				\r\n			</div>\r\n			<div class=\"col-xs-12 col-sm-7\">\r\n				<div class=\"type-col\"><span>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.type", {"name":"loc","hash":{},"data":data})))
    + "</span></div>\r\n				<div class=\"faction-col\"><span>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.faction", {"name":"loc","hash":{},"data":data})))
    + "</span></div>\r\n				<div class=\"stat-col text-center\"><span data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></div>\r\n				<div class=\"stat-col text-center\"><span data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.shieldIcons", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.shieldIcons.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></div>\r\n				<div class=\"stat-col text-center\"><span data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.commandIcons", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.commandIcons.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></div>\r\n				<div class=\"stat-col text-center\"><span data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.attack", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.attack.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></div>\r\n				<div class=\"stat-col text-center\"><span data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.hp", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.hp.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></div>	\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>		\r\n			\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['deck-message-modal.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.titleKey), {"name":"loc","hash":{},"data":data})));
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = helpers.message || (depth0 && depth0.message)),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)));
  },"7":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.messageKey), {"name":"loc","hash":{},"data":data})));
  },"9":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n				";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.buttonYes), {"name":"with","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n				";
},"10":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "\r\n				<button type=\"button\" class=\"btn btn-default "
    + escapeExpression(((helper = helpers['class'] || (depth0 && depth0['class'])),(typeof helper === functionType ? helper.call(depth0, {"name":"class","hash":{},"data":data}) : helper)))
    + "\" data-dismiss=\"modal\" id=\"messageButtonYes\">\r\n					"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.labelKey), {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>\r\n				";
},"12":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n				<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"messageButtonNo\">\r\n					"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.no", {"name":"loc","hash":{},"data":data})))
    + "\r\n				</button>\r\n				";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div id=\"messageModal\" class=\"modal\">\r\n	<div class=\"modal-dialog\">\r\n		<div class=\"modal-content\">\r\n			<div class=\"modal-header\">\r\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.close", {"name":"loc","hash":{},"data":data})))
    + "</span></button>\r\n				<h4 class=\"modal-title\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h4>\r\n			</div>\r\n			<div class=\"modal-body\">\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.message), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n			<div class=\"modal-footer\">\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.buttonYes), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.buttonNo), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['deck-private-link-list.hbs'] = template({"1":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "\r\n		<tr data-id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n			<td><a href=\""
    + escapeExpression((helper = helpers.publicDeckUrl || (depth0 && depth0.publicDeckUrl) || helperMissing,helper.call(depth0, (depth0 && depth0.value), ((stack1 = (depth1 && depth1.deck)),stack1 == null || stack1 === false ? stack1 : stack1.name), {"name":"publicDeckUrl","hash":{},"data":data})))
    + "\">"
    + escapeExpression(((helper = helpers.value || (depth0 && depth0.value)),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "</a></td>\r\n			<td>"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n			<td>"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, (depth0 && depth0.createDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "</td>\r\n			<td>\r\n				<label class=\"btn btn-default btn-sm\">\r\n					<span class=\"glyphicon glyphicon-trash\"></span>\r\n				</label>\r\n			</td>\r\n		</tr>\r\n	";
},"3":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n	<tfoot>\r\n		<tr>\r\n			<td colspan=\"4\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.noPrivateLinks", {"name":"loc","hash":{},"data":data})))
    + "</td>\r\n		</tr>\r\n	</tfoot>\r\n	";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<table id=\"deckPrivateLinkList\" class=\"table table-striped table-with-btn\">\r\n	<thead>\r\n		<tr>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.link", {"name":"loc","hash":{},"data":data})))
    + "</th>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.description", {"name":"loc","hash":{},"data":data})))
    + "</th>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.created", {"name":"loc","hash":{},"data":data})))
    + "</th>\r\n			<th>&nbsp;</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n	";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.links), {"name":"each","hash":{},"fn":this.programWithDepth(1, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</tbody>\r\n	";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.links), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</table>";
},"useData":true});
templates['deck-published-decks-list.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  return "\r\n			<th>&nbsp;</th>\r\n			";
  },"3":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n		<tr data-id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n			<td><a href=\""
    + escapeExpression((helper = helpers.publicDeckUrl || (depth0 && depth0.publicDeckUrl) || helperMissing,helper.call(depth0, (depth0 && depth0.id), (depth0 && depth0.techName), {"name":"publicDeckUrl","hash":{},"data":data})))
    + "\">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a></td>\r\n			<td><span data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, (depth0 && depth0.createDate), {"name":"moment","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, (depth0 && depth0.createDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "</span></td>\r\n			<td><span data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, (depth0 && depth0.modifyDate), {"name":"moment","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, (depth0 && depth0.modifyDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "</span></td>\r\n			";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.editable), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n		</tr>\r\n	";
},"4":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n			<td>\r\n				<label class=\"btn btn-default btn-sm deck-oper-edit\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.edit", {"name":"loc","hash":{},"data":data})))
    + "\">\r\n					<span class=\"glyphicon glyphicon-pencil\"></span>\r\n				</label>\r\n				<label class=\"btn btn-default btn-sm deck-oper-delete\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.delete", {"name":"loc","hash":{},"data":data})))
    + "\">\r\n					<span class=\"glyphicon glyphicon-trash\"></span>\r\n				</label>\r\n			</td>\r\n			";
},"6":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n	<tfoot>\r\n		<tr>\r\n			<td colspan=\"4\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.noPublishedVersions", {"name":"loc","hash":{},"data":data})))
    + "</td>\r\n		</tr>\r\n	</tfoot>\r\n	";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<table id=\"deckPublishedDeckList\" class=\"table table-striped table-with-btn\">\r\n	<thead>\r\n		<tr>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.name", {"name":"loc","hash":{},"data":data})))
    + "</th>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.published", {"name":"loc","hash":{},"data":data})))
    + "</th>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.modified", {"name":"loc","hash":{},"data":data})))
    + "</th>\r\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.editable), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.decks), {"name":"each","hash":{},"fn":this.programWithDepth(3, data, depth0),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</tbody>\r\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.decks), {"name":"unless","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</table>";
},"useData":true});
templates['deck-sort-dropdown.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<li role=\"presentation\">\r\n      <div role=\"menuitem\">\r\n        <label role=\"menuitem\" tabindex=\"-1\" class=\"btn btn-default btn-sm sort-asc\">\r\n          <span class=\"glyphicon glyphicon-sort-by-attributes\"></span>\r\n        </label>\r\n        <label role=\"menuitem\" tabindex=\"-1\" class=\"btn btn-default btn-sm sort-desc \">\r\n          <span class=\"glyphicon glyphicon-sort-by-attributes-alt\"></span>\r\n        </label>\r\n        <span>"
    + escapeExpression(((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\r\n      </div>\r\n    </li>\r\n    ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"dropdown sorting-dropdown\">\r\n  <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-expanded=\"true\">\r\n    <span class=\"glyphicon glyphicon-sort\"></span>&nbsp;<span>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sorting", {"name":"loc","hash":{},"data":data})))
    + "</span><span class=\"caret\"></span>\r\n  </button>\r\n  <ul class=\"dropdown-menu\" role=\"menu\">\r\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n  </ul>\r\n</div>";
},"useData":true});
templates['deck-sort-select.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<option value=\""
    + escapeExpression(((helper = helpers.value || (depth0 && depth0.value)),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + ",asc\">"
    + escapeExpression(((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "&nbsp;&#9650;</option>\r\n  <option value=\""
    + escapeExpression(((helper = helpers.value || (depth0 && depth0.value)),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + ",desc\">"
    + escapeExpression(((helper = helpers.label || (depth0 && depth0.label)),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "&nbsp;&#9660;</option>\r\n  ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<select class=\"form-control sort-control \">\r\n  <option value=\"none\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.none", {"name":"loc","hash":{},"data":data})))
    + "</option>\r\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sortItems), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</select>";
},"useData":true});
templates['deck-stats-table.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "\r\n		<tr>\r\n			<th>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.name), {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n			<td>"
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.quantityX), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</span></td>\r\n			<td>"
    + escapeExpression(((helper = helpers.sum || (depth0 && depth0.sum)),(typeof helper === functionType ? helper.call(depth0, {"name":"sum","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n			<td>"
    + escapeExpression(((helper = helpers.average || (depth0 && depth0.average)),(typeof helper === functionType ? helper.call(depth0, {"name":"average","hash":{},"data":data}) : helper)))
    + "</span></td>\r\n		</tr>\r\n		";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "+"
    + escapeExpression(((helper = helpers.quantityX || (depth0 && depth0.quantityX)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantityX","hash":{},"data":data}) : helper)))
    + "X";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<table class=\"deck-stats-table\">\r\n	<thead>\r\n		<tr>\r\n			<th></th>\r\n			<th><span data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.cardsQuantity", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.cardsQuantity.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n			<th><span data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sum", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sum.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n			<th><span data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.average", {"name":"loc","hash":{},"data":data})))
    + "\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.average.sh", {"name":"loc","hash":{},"data":data})))
    + "</span></th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stats), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n	</tbody>\r\n</table>";
},"useData":true});
templates['global-messages.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n<div class=\"alert alert-"
    + escapeExpression(((helper = helpers.kind || (depth0 && depth0.kind)),(typeof helper === functionType ? helper.call(depth0, {"name":"kind","hash":{},"data":data}) : helper)))
    + " alert-dismissible\" role=\"alert\">\r\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\r\n  <strong>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.title), {"name":"loc","hash":{},"data":data})))
    + ":</strong> "
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, (depth0 && depth0.message), {"name":"loc","hash":{},"data":data})));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.context), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return " ["
    + escapeExpression(((helper = helpers.context || (depth0 && depth0.context)),(typeof helper === functionType ? helper.call(depth0, {"name":"context","hash":{},"data":data}) : helper)))
    + "]";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 && depth0.messages), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"useData":true});
templates['members-group.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n	<span class=\"mg-title\">"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "&nbsp;("
    + escapeExpression(((helper = helpers.count || (depth0 && depth0.count)),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span>\r\n	<ul>\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n	</ul>\r\n	";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n			<li>"
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + "x&nbsp;<a href=\"/\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-card-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\r\n		";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div>\r\n	";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.membersGroup), {"name":"with","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>";
},"useData":true});
templates['members-groups.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "\r\n	<div class=\"col-xs-6\">\r\n		<div class=\"mg\">\r\n			<span class=\"mg-title\">"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "&nbsp;("
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + ")</span>\r\n			<ul>\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n				<li>"
    + escapeExpression(((helper = helpers.quantity || (depth0 && depth0.quantity)),(typeof helper === functionType ? helper.call(depth0, {"name":"quantity","hash":{},"data":data}) : helper)))
    + "x&nbsp;<a data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-card-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" style=\"cursor: pointer;\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.card)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\r\n				";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row\">\r\n	<div class=\"col-xs-12 mg-header\">\r\n		<div class=\"row\">\r\n			<div class=\"col-xs-12\">\r\n				<div class=\"mg-control-group row\">\r\n					<div class=\"col-xs-3\">\r\n						<label><strong>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.groupBy", {"name":"loc","hash":{},"data":data})))
    + ":</strong></label>\r\n					</div>\r\n					<div class=\"col-xs-9\">\r\n						<div class=\"btn-group btn-group-xs\">\r\n							<label class=\"btn btn-default\" data-group-key=\"typeDisplay\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.type", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"memberQuantity\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"setName\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.set", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"factionDisplay\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.faction", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-group-key=\"cost\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n						</div>\r\n					</div>\r\n				</div>\r\n				<div class=\"mg-control-sort row\">\r\n					<div class=\"col-xs-3\">\r\n						<label><strong>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sortBy", {"name":"loc","hash":{},"data":data})))
    + ":</strong></label>\r\n					</div>\r\n					<div class=\"col-xs-9\">\r\n						<div class=\"btn-group btn-group-xs\">\r\n							<label class=\"btn btn-default\" data-sort-key=\"name\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.name", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-sort-key=\"memberQuantity\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.quantity", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n							<label class=\"btn btn-default\" data-sort-key=\"cost\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.cost", {"name":"loc","hash":{},"data":data})))
    + "</label>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.membersGroups), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n</div>";
},"useData":true});
templates['user-deck-create-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "\r\n				<tr data-card-id=\""
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-card-image-base=\""
    + escapeExpression(((helper = helpers.imageBase || (depth0 && depth0.imageBase)),(typeof helper === functionType ? helper.call(depth0, {"name":"imageBase","hash":{},"data":data}) : helper)))
    + "\">\r\n					<td>"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n					<td style=\"text-align: center;\"><img src=\""
    + escapeExpression((helper = helpers.factionImagePath || (depth0 && depth0.factionImagePath) || helperMissing,helper.call(depth0, (depth0 && depth0.faction), {"name":"factionImagePath","hash":{},"data":data})))
    + "\" /></td>\r\n					<td><a class=\"btn btn-default\" href=\""
    + escapeExpression(((helper = helpers.rootUrl || (depth0 && depth0.rootUrl)),(typeof helper === functionType ? helper.call(depth0, {"name":"rootUrl","hash":{},"data":data}) : helper)))
    + "new/"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\"><span class=\"glyphicon glyphicon-pencil\"></span></a></td>\r\n					<td>"
    + escapeExpression(((helper = helpers.attack || (depth0 && depth0.attack)),(typeof helper === functionType ? helper.call(depth0, {"name":"attack","hash":{},"data":data}) : helper)))
    + "</td>\r\n					<td>"
    + escapeExpression(((helper = helpers.hitPoints || (depth0 && depth0.hitPoints)),(typeof helper === functionType ? helper.call(depth0, {"name":"hitPoints","hash":{},"data":data}) : helper)))
    + "</td>\r\n				</tr>\r\n				";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"user-deck-create-view row\">\r\n	<div class=\"col-md-6\">\r\n		<div class=\"actions-container\"></div>\r\n		<table class=\"table table-striped faction-image-container-md\">\r\n			<thead>\r\n				<tr>\r\n					<td>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.name", {"name":"loc","hash":{},"data":data})))
    + "</td>\r\n					<td style=\"text-align: center;\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.faction", {"name":"loc","hash":{},"data":data})))
    + "</td>\r\n					<td>&nbsp;</td>\r\n					<td>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.attack.sh", {"name":"loc","hash":{},"data":data})))
    + "</td>\r\n					<td>"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "card.hp.sh", {"name":"loc","hash":{},"data":data})))
    + "</td>\r\n				</tr>\r\n			</thead>\r\n			<tbody>\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.warlords), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	<div class=\"col-md-6\">\r\n		<div class=\"card-container\"></div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['user-deck-edit-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li role=\"presentation\"><a href=\"#deckSharingTab\" aria-controls=\"sharing\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.sharing", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n			";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "							\r\n						<label class=\"btn btn-default\" data-faction=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"><div class=\"icon-faction icon-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\"></div></label>\r\n						";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n						<label class=\"btn btn-default type-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + " marker\" data-type=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"><span>"
    + escapeExpression(((helper = helpers.shortName || (depth0 && depth0.shortName)),(typeof helper === functionType ? helper.call(depth0, {"name":"shortName","hash":{},"data":data}) : helper)))
    + "</span></label>\r\n						";
},"7":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"deckSharingTab\" role=\"tabpanel\" class=\"tab-pane\">				\r\n				<div class=\"block folding-block\">\r\n					<div class=\"block-header\">\r\n						<div class=\"block-header-text\">\r\n							<span class=\"glyphicon glyphicon-share\"></span>\r\n							&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.publishedVersions", {"name":"loc","hash":{},"data":data})))
    + "\r\n						</div>\r\n					</div>\r\n					<div class=\"block-content\">\r\n						<div style=\"margin-bottom: 10px;\">\r\n							<label id=\"deckPublishButton\" class=\"btn btn-success\">\r\n								<span class=\"glyphicon glyphicon-share\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.publishDeck", {"name":"loc","hash":{},"data":data})))
    + "							\r\n							</label>							\r\n						</div>\r\n						<div id=\"deckPublishedDecksBlock\"></div>\r\n					</div>\r\n				</div>\r\n\r\n				<div class=\"block folding-block\">\r\n					<div class=\"block-header\">\r\n						<div class=\"block-header-text\">\r\n							<span class=\"glyphicon glyphicon-link\"></span>\r\n							&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.privateLinks", {"name":"loc","hash":{},"data":data})))
    + "\r\n						</div>\r\n					</div>\r\n					<div class=\"block-content\">\r\n						<div style=\"margin-bottom: 10px;\">\r\n							<input id=\"createLinkInput\" class=\"form-control\" type=\"text\" placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.linkDescription", {"name":"loc","hash":{},"data":data})))
    + "\" style=\"width: 300px; float: left; margin-right: 10px;\" maxlength=\"50\" />\r\n							<label id=\"createLinkButton\" class=\"btn btn-success\">\r\n								<span class=\"glyphicon glyphicon-plus\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.createLink", {"name":"loc","hash":{},"data":data})))
    + "\r\n							</label>\r\n						</div>\r\n						<div id=\"deckPrivateLinkBlock\"></div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n			";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div class=\"user-deck-edit-view row\">\r\n	<div class=\"col-md-4 col-lg-4\">\r\n		<div class=\"actions-container\"></div>\r\n		<div class=\"deck-info-container row\">\r\n			<div class=\"col-xs-12\" style=\"font-size: 18px; margin-bottom: 10px;\">\r\n				<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.id), {"name":"cardUrl","hash":{},"data":data})))
    + "\" target=\"_blank\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ><strong>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></a>\r\n			</div>\r\n			<div class=\"col-xs-6\">\r\n				<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.id), {"name":"cardUrl","hash":{},"data":data})))
    + "\" target=\"_blank\"><img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlordId), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-sm\" /></a>\r\n			</div>\r\n			<div class=\"deck-stats-container col-xs-6\">				\r\n			</div>\r\n		</div>		\r\n		<div class=\"mg-container\"></div>		\r\n	</div>\r\n	<div class=\"col-md-8 col-lg-8\">\r\n		<ul class=\"nav nav-tabs\" role=\"tablist\" id=\"tabs1ul\">\r\n			<li role=\"presentation\" class=\"active\"><a href=\"#deckDeckTab\" aria-controls=\"deck\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.deck", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n			<li role=\"presentation\"><a href=\"#deckDescriptionTab\" aria-controls=\"description\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.description", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n			<li role=\"presentation\"><a href=\"#deckUtilitiesTab\" aria-controls=\"utilities\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.utilities", {"name":"loc","hash":{},"data":data})))
    + "</a></li>\r\n			";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.id), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\r\n\r\n		<div class=\"tab-content\">\r\n    		\r\n    		<div id=\"deckDeckTab\" role=\"tabpanel\" class=\"tab-pane active\">\r\n				<div class=\"members-list-filter-container\">\r\n					<div class=\"btn-group btn-group-layout filter-group\">\r\n						<label class=\"btn btn-default\" data-layout=\"list\"><span class=\"glyphicon glyphicon-align-justify\"></span></label>\r\n						<label class=\"btn btn-default\" data-layout=\"grid-6\"><span class=\"glyphicon glyphicon-th\"></span></label>\r\n						<label class=\"btn btn-default\" data-layout=\"grid-4\"><span class=\"glyphicon glyphicon-th-large\"></span></label>\r\n						<label class=\"btn btn-default\" data-layout=\"grid-3\"><span class=\"glyphicon glyphicon-th\"></span></label>\r\n						<label class=\"btn btn-default\" data-layout=\"grid-2\"><span class=\"glyphicon glyphicon-th-large\"></span></label>\r\n					</div>					\r\n					<div class=\"btn-group btn-group-filter filter-faction filter-group select-many\">\r\n						";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.filter)),stack1 == null || stack1 === false ? stack1 : stack1.factions), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n					<div class=\"btn-group btn-group-filter filter-type filter-group select-many\">\r\n						";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.filter)),stack1 == null || stack1 === false ? stack1 : stack1.cardTypes), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n					<div class=\"btn-group btn-group-filter filter-selection filter-group select-many\">\r\n						<label class=\"btn btn-default\" data-selection=\"not-selected\" data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.notSelected", {"name":"loc","hash":{},"data":data})))
    + "\"><span>0</span></label>\r\n						<label class=\"btn btn-default\" data-selection=\"selected\" data-toggle=\"tooltip\" title=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.selected", {"name":"loc","hash":{},"data":data})))
    + "\"><span>1+</span></label>\r\n					</div>\r\n					<label id=\"filterTrigger\" class=\"btn btn-default btn-standard filter-group\"><span class=\"glyphicon glyphicon-filter\"></span></label>\r\n					<label id=\"configTrigger\" class=\"btn btn-default btn-standard filter-group\"><span class=\"glyphicon glyphicon-cog\"></span></label>\r\n\r\n					<input id=\"search\" type=\"text\" class=\"form-control filter-group\" placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.nameOrTraitOrKeyword", {"name":"loc","hash":{},"data":data})))
    + "\" style=\"margin-top: 10px;\">\r\n				</div>\r\n				<div class=\"members-container\"></div>\r\n			</div>\r\n\r\n			<div id=\"deckDescriptionTab\" role=\"tabpanel\" class=\"tab-pane\">\r\n				<div class=\"deck-description-view\"></div>\r\n			</div>\r\n			\r\n			<div id=\"deckUtilitiesTab\" role=\"tabpanel\" class=\"tab-pane\">\r\n				<div class=\"block folding-block\">\r\n					<div class=\"block-header\">\r\n						<div class=\"block-header-text\">\r\n							<span class=\"glyphicon glyphicon-random\"></span>\r\n							&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.simulator", {"name":"loc","hash":{},"data":data})))
    + "\r\n						</div>\r\n					</div>\r\n					<div class=\"block-content\">\r\n						<div class=\"text-center\" style=\"margin-bottom: 10px;\">\r\n							<div class=\"btn-group btn-group-draw\">\r\n								<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.startingHand", {"name":"loc","hash":{},"data":data})))
    + "\"><span class=\"glyphicon glyphicon-play\"></span></label>\r\n								<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.allCards", {"name":"loc","hash":{},"data":data})))
    + "\"><span class=\"glyphicon glyphicon-forward\"></span></label>\r\n								<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.nextCard", {"name":"loc","hash":{},"data":data})))
    + "\">1</label>\r\n								<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.next2Cards", {"name":"loc","hash":{},"data":data})))
    + "\">2</label>\r\n								<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.next3Cards", {"name":"loc","hash":{},"data":data})))
    + "\">3</label>\r\n								<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.next4Cards", {"name":"loc","hash":{},"data":data})))
    + "\">4</label>\r\n							</div>\r\n						</div>\r\n						<div class=\"draw-container\"></div>\r\n					</div>\r\n				</div>\r\n				<div class=\"block folding-block\">\r\n					<div class=\"block-header\">\r\n						<div class=\"block-header-text\">\r\n							<span class=\"glyphicon glyphicon-stats\"></span>\r\n							&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.stats", {"name":"loc","hash":{},"data":data})))
    + "\r\n						</div>\r\n					</div>\r\n					<div class=\"block-content\">Soon...</div>\r\n				</div>\r\n			</div>\r\n\r\n			";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.id), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</div>\r\n	</div>\r\n	<div class=\"hidden-xs hidden-sm hidden-md hidden-lg \">\r\n		<div id=\"costSlider\" class=\"slider\" data-slider-min=\"0\" data-slider-max=\"9\" />\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['user-deck-import-view.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"user-deck-import-view row\">\r\n	<div class=\"col-md-12\">\r\n		<div class=\"actions-container\"></div>\r\n		<div class=\"row\">\r\n			<div class=\"col-md-6\">\r\n				<div class=\"form-group\">\r\n					<textarea class=\"form-control\" id=\"importedDeck\"  rows=\"35\" placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.import.lineFormat", {"name":"loc","hash":{},"data":data})))
    + "\"></textarea>					\r\n				</div>\r\n			</div>\r\n			<div class=\"col-md-6\">\r\n				<div style=\"margin-bottom: 20px;\">\r\n					<label id=\"parseDeckButton\" class=\"btn btn-default\" data-layout=\"list\">\r\n						<span class=\"glyphicon glyphicon-cog\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.process", {"name":"loc","hash":{},"data":data})))
    + "\r\n					</label>\r\n					<label id=\"editDeckButton\" class=\"btn btn-default disabled\" data-layout=\"list\">\r\n						<span class=\"glyphicon glyphicon-pencil\"></span>&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.looksGoodGoToEditView", {"name":"loc","hash":{},"data":data})))
    + "\r\n					</label>\r\n				</div>\r\n				<div class=\"mg-container\"></div>\r\n				<div class=\"problems-container\"></div>\r\n			</div>\r\n		</div>\r\n	</div>	\r\n</div>\r\n";
},"useData":true});
templates['user-deck-list-view.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"user-deck-list-view\">\r\n	<div class=\"actions-container\"></div>\r\n	<div class=\"deck-list-filter-container\"></div>	\r\n	<div class=\"deck-list-data-container\"></div>\r\n</div>";
  },"useData":true});
templates['pub-deck-list-view.hbs'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"publicDeckListView\">\r\n	<div class=\"actions-container\"></div>\r\n	<div class=\"deck-list-filter-container\"></div>	\r\n	<div class=\"deck-list-data-container\"></div>\r\n</div>";
  },"useData":true});
templates['pub-deck-view.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, buffer = "\r\n				";
  stack1 = (helper = helpers.ifPublicSnapshot || (depth0 && depth0.ifPublicSnapshot) || helperMissing,helper.call(depth0, (depth0 && depth0.deck), {"name":"ifPublicSnapshot","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n  				";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n				<a href=\""
    + escapeExpression((helper = helpers.userDeckUrl || (depth0 && depth0.userDeckUrl) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.snapshotBaseId), (depth0 && depth0.undefined), {"name":"userDeckUrl","hash":{},"data":data})))
    + "\"><span class=\"glyphicon glyphicon-pencil\"></span></a>\r\n				";
},"4":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\r\n				<li role=\"presentation\">\r\n					<a href=\"#deckCommentsTab\" aria-controls=\"comments\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.comments", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n				</li>\r\n				";
},"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "							\r\n							<label class=\"btn btn-default\" data-faction=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"><div class=\"icon-faction icon-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\"></div></label>\r\n							";
},"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n							<label class=\"btn btn-default type-"
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + " marker\" data-type=\""
    + escapeExpression(((helper = helpers.techName || (depth0 && depth0.techName)),(typeof helper === functionType ? helper.call(depth0, {"name":"techName","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\"><span>"
    + escapeExpression(((helper = helpers.shortName || (depth0 && depth0.shortName)),(typeof helper === functionType ? helper.call(depth0, {"name":"shortName","hash":{},"data":data}) : helper)))
    + "</span></label>\r\n							";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<div id=\"publicDeckView\" class=\"pub-deck\">\r\n	<div class=\"row deck-header-row\">\r\n		<div class=\"col-xs-12\">\r\n			<div class=\"deck-header\">				\r\n				<span class=\"deck-name\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n				";
  stack1 = (helper = helpers.ifUserDeck || (depth0 && depth0.ifUserDeck) || helperMissing,helper.call(depth0, (depth0 && depth0.deck), {"name":"ifUserDeck","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				<span class=\"secondary-text\">\r\n					&nbsp;\r\n					<span class=\"deck-user\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n					&nbsp;&#8226;&nbsp;\r\n					<span class=\"deck-user\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + escapeExpression((helper = helpers.moment || (depth0 && depth0.moment) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"moment","hash":{},"data":data})))
    + "\">\r\n						"
    + escapeExpression((helper = helpers.momentFromNow || (depth0 && depth0.momentFromNow) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.createDate), {"name":"momentFromNow","hash":{},"data":data})))
    + "\r\n					</span>\r\n				</span>\r\n\r\n  				<span class=\"twitter popup pull-right social\">\r\n  					<i style=\"color: #55ACEE;\" class=\"fa fa-twitter\"></i>\r\n  				</span>\r\n  				\r\n			</div>\r\n		</div>	\r\n	</div>\r\n	<div class=\"row deck-content-row\">\r\n		<div class=\"col-md-4 col-lg-4\">\r\n			<div class=\"actions-container\"></div>\r\n			<div class=\"deck-info-container row\">\r\n				<div class=\"col-xs-12\" style=\"font-size: 18px; margin-bottom: 10px;\">\r\n					<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.id), {"name":"cardUrl","hash":{},"data":data})))
    + "\" target=\"_blank\" data-image-base=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.imageBase)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ><strong>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></a>\r\n				</div>\r\n				<div class=\"col-xs-6\">\r\n					<a href=\""
    + escapeExpression((helper = helpers.cardUrl || (depth0 && depth0.cardUrl) || helperMissing,helper.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlord)),stack1 == null || stack1 === false ? stack1 : stack1.id), {"name":"cardUrl","hash":{},"data":data})))
    + "\" target=\"_blank\"><img src=\""
    + escapeExpression((helper = helpers.cardImagePath || (depth0 && depth0.cardImagePath) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.warlordId), {"name":"cardImagePath","hash":{},"data":data})))
    + "\" class=\"card-sm\" /></a>\r\n				</div>\r\n				<div class=\"deck-stats-container col-xs-6\">				\r\n				</div>\r\n			</div>		\r\n			<div class=\"mg-container\"></div>		\r\n		</div>\r\n		<div class=\"col-md-8 col-lg-8\" role=\"tabpanel\">\r\n			<ul class=\"nav nav-tabs\" role=\"tablist\" id=\"tabs1ul\">\r\n				<li role=\"presentation\" class=\"active\">\r\n					<a href=\"#deckDeckTab\" aria-controls=\"deck\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.deck", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n				</li>\r\n				<li role=\"presentation\">\r\n					<a href=\"#deckDescriptionTab\" aria-controls=\"description\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.description", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n				</li>\r\n				";
  stack1 = (helper = helpers.ifPublicSnapshot || (depth0 && depth0.ifPublicSnapshot) || helperMissing,helper.call(depth0, (depth0 && depth0.deck), {"name":"ifPublicSnapshot","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n				<li role=\"presentation\">\r\n					<a href=\"#deckUtilitiesTab\" aria-controls=\"utilities\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.utilities", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n				</li>\r\n				<li role=\"presentation\">\r\n					<a href=\"#deckVersionsTab\" aria-controls=\"versions\" role=\"tab\" data-toggle=\"tab\">"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.versions", {"name":"loc","hash":{},"data":data})))
    + "</a>\r\n				</li>\r\n			</ul>\r\n\r\n			<div class=\"tab-content\">\r\n	    		<div id=\"deckDeckTab\" role=\"tabpanel\" class=\"tab-pane active\">\r\n					<div class=\"members-list-filter-container\">\r\n						<div class=\"btn-group btn-group-layout filter-group\">\r\n							<label class=\"btn btn-default\" data-layout=\"list\"><span class=\"glyphicon glyphicon-align-justify\"></span></label>\r\n							<label class=\"btn btn-default\" data-layout=\"grid-6\"><span class=\"glyphicon glyphicon-th\"></span></label>\r\n							<label class=\"btn btn-default\" data-layout=\"grid-4\"><span class=\"glyphicon glyphicon-th-large\"></span></label>\r\n							<label class=\"btn btn-default\" data-layout=\"grid-3\"><span class=\"glyphicon glyphicon-th\"></span></label>\r\n							<label class=\"btn btn-default\" data-layout=\"grid-2\"><span class=\"glyphicon glyphicon-th-large\"></span></label>\r\n						</div>					\r\n						<div class=\"btn-group btn-group-filter filter-faction filter-group select-many\">\r\n							";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.filter)),stack1 == null || stack1 === false ? stack1 : stack1.factions), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n						</div>\r\n						<div class=\"btn-group btn-group-filter filter-type filter-group select-many\">\r\n							";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.filter)),stack1 == null || stack1 === false ? stack1 : stack1.cardTypes), {"name":"each","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n						</div>\r\n						\r\n						\r\n\r\n						<input id=\"search\" type=\"text\" class=\"form-control filter-group\" placeholder=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.nameOrTraitOrKeyword", {"name":"loc","hash":{},"data":data})))
    + "\" style=\"margin-top: 10px;\">\r\n					</div>\r\n					<div class=\"members-container\"></div>\r\n				</div>\r\n\r\n				<div id=\"deckDescriptionTab\" role=\"tabpanel\" class=\"tab-pane\">\r\n					\r\n					\r\n					<h2>";
  stack1 = (helper = helpers.markdown || (depth0 && depth0.markdown) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.name), {"name":"markdown","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h2>\r\n					\r\n					<p>";
  stack1 = (helper = helpers.markdown || (depth0 && depth0.markdown) || helperMissing,helper.call(depth0, ((stack1 = (depth0 && depth0.deck)),stack1 == null || stack1 === false ? stack1 : stack1.description), {"name":"markdown","hash":{},"data":data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "</p>\r\n				</div>\r\n				\r\n				<div id=\"deckUtilitiesTab\" role=\"tabpanel\" class=\"tab-pane\">\r\n					<div class=\"block folding-block\">\r\n						<div class=\"block-header\">\r\n							<div class=\"block-header-text\">\r\n								<span class=\"glyphicon glyphicon-random\"></span>\r\n								&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.simulator", {"name":"loc","hash":{},"data":data})))
    + "\r\n							</div>\r\n						</div>\r\n						<div class=\"block-content\">\r\n							<div class=\"text-center\" style=\"margin-bottom: 10px;\">\r\n								<div class=\"btn-group btn-group-draw\">\r\n									<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.startingHand", {"name":"loc","hash":{},"data":data})))
    + "\"><span class=\"glyphicon glyphicon-play\"></span></label>\r\n									<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.allCards", {"name":"loc","hash":{},"data":data})))
    + "\"><span class=\"glyphicon glyphicon-forward\"></span></label>\r\n									<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.nextCard", {"name":"loc","hash":{},"data":data})))
    + "\">1</label>\r\n									<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.next2Cards", {"name":"loc","hash":{},"data":data})))
    + "\">2</label>\r\n									<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.next3Cards", {"name":"loc","hash":{},"data":data})))
    + "\">3</label>\r\n									<label class=\"btn btn-default\" data-toggle=\"tooltip\" tooltip=\""
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.draw.next4Cards", {"name":"loc","hash":{},"data":data})))
    + "\">4</label>\r\n								</div>\r\n							</div>\r\n							<div class=\"draw-container\"></div>\r\n						</div>\r\n					</div>\r\n					<div class=\"block folding-block\">\r\n						<div class=\"block-header\">\r\n							<div class=\"block-header-text\">\r\n								<span class=\"glyphicon glyphicon-stats\"></span>\r\n								&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.stats", {"name":"loc","hash":{},"data":data})))
    + "\r\n							</div>\r\n						</div>\r\n						<div class=\"block-content\">Soon...</div>\r\n					</div>\r\n				</div>\r\n\r\n				<div id=\"deckCommentsTab\" role=\"tabpanel\" class=\"tab-pane\">				\r\n					<div class=\"deck-comments-view\"></div>\r\n				</div>\r\n\r\n				<div id=\"deckVersionsTab\" role=\"tabpanel\" class=\"tab-pane\">				\r\n					<div class=\"block folding-block\">\r\n						<div class=\"block-header\">\r\n							<div class=\"block-header-text\">\r\n								<span class=\"glyphicon glyphicon-share\"></span>\r\n								&nbsp;"
    + escapeExpression((helper = helpers.loc || (depth0 && depth0.loc) || helperMissing,helper.call(depth0, "core.publishedVersions", {"name":"loc","hash":{},"data":data})))
    + "\r\n							</div>\r\n						</div>\r\n						<div class=\"block-content\">\r\n							<div id=\"deckPublishedDecksBlock\"></div>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
})();