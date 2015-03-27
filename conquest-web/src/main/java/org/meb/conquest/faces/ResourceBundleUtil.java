package org.meb.conquest.faces;

import java.util.Locale;
import java.util.ResourceBundle;

import org.apache.commons.lang3.StringUtils;

public class ResourceBundleUtil {

	private ResourceBundle bundle;

	public ResourceBundleUtil(String bundleName) {
		this(bundleName, null);
	}

	public ResourceBundleUtil(String bundleName, Locale locale) {
		bundle = ResourceBundle.getBundle("resources/messages", locale);
	}

	public ResourceBundle getBundle() {
		return bundle;
	}

	public String getString(String key) {
		String string = bundle.getString(key);
		if (StringUtils.isBlank(string)) {
			string = "???" + key + "???";
		}
		return string;
	}
}
