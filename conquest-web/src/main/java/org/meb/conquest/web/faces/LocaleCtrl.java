package org.meb.conquest.web.faces;

import java.io.Serializable;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;

import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Named
@ViewScoped
public class LocaleCtrl implements Serializable {

	private static final Logger log = LoggerFactory.getLogger(LocaleCtrl.class);
	private static final long serialVersionUID = -3078188121739515720L;
	private static final Set<String> supportedLanguages;

	static {
		supportedLanguages = new HashSet<String>();
		supportedLanguages.add("pl");
		supportedLanguages.add("en");
		supportedLanguages.add("de");
	}
	
	private Locale locale;

	public Locale getLocale() {
		if (locale == null) {
			locale = prepareLocale(null);
		}
		return locale;
	}

	public String getLanguage() {
		return getLocale().getLanguage();
	}

	public void setLanguage(String language) {
		locale = prepareLocale(language);
	}

	private Locale prepareLocale(String language) {

		Locale locale = FacesContext.getCurrentInstance().getExternalContext().getRequestLocale();
		log.info("request locale: {}", locale);

		if (StringUtils.isNotBlank(language)) {
			log.info("request language: {}", language);
			if (!language.equals(locale.getLanguage())) {
				locale = new Locale(language);
			}
		}
		if (locale == null || !supportedLanguages.contains(locale.getLanguage().toLowerCase())) {
			locale = Locale.ENGLISH;
		}
		log.info("locale: {}", locale);

		return locale;
	}

	public TimeZone getTimeZone() {
		return Calendar.getInstance(locale).getTimeZone();
	}
}
