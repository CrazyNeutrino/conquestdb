package org.meb.conquest.service;

import javax.enterprise.context.RequestScoped;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@RequestScoped
public class RequestContext {

	private String userLanguage;
	private Long userId;

	public void checkUserLanguageSet() {
		if (userLanguage == null) {
			throw new IllegalStateException("User language not set");
		}
	}
	
	public void checkUserIdSet() {
		if (userId == null) {
			throw new IllegalStateException("User id not set");
		}
	}
}
