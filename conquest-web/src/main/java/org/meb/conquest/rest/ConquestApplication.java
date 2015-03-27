package org.meb.conquest.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import org.meb.conquest.rest.controller.CardController;
import org.meb.conquest.rest.controller.DeckController;
import org.meb.conquest.rest.controller.RoleBasedRequestFilter;

public class ConquestApplication extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		HashSet<Class<?>> classes = new HashSet<>();
		classes.add(DeckController.class);
//		classes.add(PublicDeckController.class);
		classes.add(CardController.class);
		classes.add(RoleBasedRequestFilter.class);
		return classes;
	}
}
