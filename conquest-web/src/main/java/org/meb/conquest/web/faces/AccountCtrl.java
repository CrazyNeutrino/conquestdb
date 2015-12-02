package org.meb.conquest.web.faces;

import java.io.Serializable;

import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.meb.conquest.core.Constant;
import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.User;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.service.api.UserService;
import org.meb.conquest.web.auth.AuthToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named
@ViewScoped
public class AccountCtrl implements Serializable {

	private static final long serialVersionUID = -6744625140054186154L;
	private static final Logger log = LoggerFactory.getLogger(AccountCtrl.class);
	public static final String NAME_PATTERN = "[\\w\\ \\-]{3,20}";
	public static final String EMAIL_PATTERN = "[\\w\\.-]*[a-zA-Z0-9_]@[\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]";
	public static final String PASSWORD_PATTERN = "[\\p{ASCII}]{8,20}";

	private String name;
	private String email;
	private String emailConfirm;
	private String password;
	private String passwordConfirm;

	private UIInput nameUIInput;
	private UIInput emailUIInput;
	private UIInput emailConfirmUIInput;
	private UIInput passwordUIInput;
	private UIInput passwordConfirmUIInput;

	private String activationCode;

	@Inject
	private AuthToken authUser;
	@Inject
	private UserService userService;
	@Inject
	private LocaleCtrl localeCtrl;
	@Inject
	private RequestContext queryContext;
	@Inject
	private Messages messages;

	public String activateUser() {
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		if (activationCode == null) {
			return null;
		} else {
			User user = userService.activateUser(activationCode);

			if (user == null) {
				messages.addGlobalError("core.activation.error");
			} else {
				messages.addGlobalInfo("core.activation.success");
			}
			return null;
		}
	}

	public String signUpUser() {
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		name = name.trim();
		email = email.trim();
		emailConfirm = emailConfirm.trim();
		password = password.trim();
		passwordConfirm = passwordConfirm.trim();

		boolean errors = false;
		if (StringUtils.isBlank(name)) {
			messages.addError(nameUIInput.getClientId(), "error.username.required");
			errors = true;
		}
		if (!email.equals(emailConfirm)) {
			messages.addError(emailConfirmUIInput.getClientId(), "error.email.mismatch");
			errors = true;
		}
		if (!password.equals(passwordConfirm)) {
			messages.addError(passwordConfirmUIInput.getClientId(), "error.password.mismatch");
			errors = true;
		}

		if (errors) {
			return null;
		}

		try {
			log.info("signing up: {}, {}", name, email);
			userService.signUpUser(name, email, password);
			messages.addGlobalInfo("core.activation.pending0");
			messages.addGlobalInfo("core.activation.pending1");
			log.info("signed up: {}, {}", name, email);

			return "pretty:activate";
		} catch (DeckException de) {
			String error = de.getErrorCore();

			UIInput uiInput;
			if (Constant.Constraint.UK_USER_NAME.equals(error)) {
				uiInput = nameUIInput;
				error = "error.username.alreadyUsed";
			} else if (Constant.Constraint.UK_USER_MAIL.equals(error)) {
				uiInput = emailUIInput;
				error = "error.email.alreadyUsed";
			} else {
				uiInput = null;
			}

			if (uiInput == null) {
				messages.addGlobalError(error);
			} else {
				messages.addError(uiInput.getClientId(), error);
			}
			return null;
		}
	}

	public String signInUser() {
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		try {
			String jsessionId = getSessionId();
			log.info("signing in: name: {}, JSESSIONID: {}", name, jsessionId);
			User user = userService.signInUser(name, password);
			authUser.setUser(user);
			log.info("signed in: name: {}, JSESSIONID: {}", name, jsessionId);
			// HttpServletResponse response = (HttpServletResponse)
			// FacesContext.getCurrentInstance().getExternalContext().getResponse();
			// response.addCookie(new Cookie("auth", "7f8sd7f9sd"));
			return "pretty:home1";
		} catch (DeckException de) {
			String error = de.getErrorCore();
			if ("error.usernameOrPassword.invalid".equals(error)) {
				messages.addError(nameUIInput.getClientId(), error);
				messages.addError(passwordUIInput.getClientId(), error);
			} else {
				messages.addGlobalError(error);
			}
			return null;
		}
	}

	private String getSessionId() {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext()
				.getSession(false);
		if (session == null) {
			return null;
		} else {
			return session.getId();
		}
	}

	public String signOutUser() {
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		User user = authUser.getUser();
		if (user != null) {
			log.info("signing out: {}", user.getUsername());
			authUser.setUser(null);
			FacesContext.getCurrentInstance().getExternalContext().invalidateSession();
			FacesContext.getCurrentInstance().getViewRoot().getViewMap()
					.put("localeCtrl", localeCtrl);
			log.info("signed out: {}", user.getUsername());
		}
		return "pretty:home1";
	}

	public String getNamePattern() {
		return NAME_PATTERN;
	}

	public String getEmailPattern() {
		return EMAIL_PATTERN;
	}

	public String getPasswordPattern() {
		return PASSWORD_PATTERN;
	}
}
