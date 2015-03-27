package org.meb.conquest.rest;

import java.util.Locale;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

public class MessageBundleResolver {

	public PropertyResourceBundle getBundle(String language) {
		return (PropertyResourceBundle) ResourceBundle.getBundle("resources/clientMessages", new Locale(language));
	}
}
