package org.meb.conquest.web.rest;

import java.util.Locale;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

public class MessageBundleResolver {

	public PropertyResourceBundle getClientBundle(String language) {
		return (PropertyResourceBundle) ResourceBundle.getBundle("resources/clientMessages", new Locale(language));
	}
	
	public PropertyResourceBundle getBundle(String language) {
		return (PropertyResourceBundle) ResourceBundle.getBundle("resources/messages", new Locale(language));
	}
}
