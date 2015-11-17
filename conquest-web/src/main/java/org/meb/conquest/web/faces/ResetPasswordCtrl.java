package org.meb.conquest.web.faces;

import java.io.Serializable;
import java.text.MessageFormat;

import javax.faces.component.UIInput;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import lombok.Getter;
import lombok.Setter;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.User;
import org.meb.conquest.service.RequestContext;
import org.meb.conquest.service.UserService;
import org.meb.conquest.web.auth.AuthToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Getter
@Setter
@Named
@ViewScoped
public class ResetPasswordCtrl implements Serializable {

	private static final Logger log = LoggerFactory.getLogger(ResetPasswordCtrl.class);
	private static final long serialVersionUID = 7775702473049783326L;

	private String email;
	private String password;
	private String passwordConfirm;

	private UIInput emailUIInput;
	private UIInput passwordUIInput;
	private UIInput passwordConfirmUIInput;

	private String resetPasswordCode;

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

	public boolean isResetPasswordInitMode() {
		return resetPasswordCode == null;
	}

	public boolean isResetPasswordMode() {
		return resetPasswordCode != null;
	}

	public String resetPasswordInit() {
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		email = email.trim();

		log.info("reset password init for email: {}", email);
		try {
			userService.prepareResetPassword(email);
			messages.addGlobalInfo("core.resetPassword.sendCode.success");
			log.info("reset password init (SUCCESS) for email: {}", email);
		} catch (DeckException e) {			
			messages.addGlobalInfo("core.resetPassword.sendCode.error");			
			String message = MessageFormat.format("reset password init (ERROR) for email: {0}", email); 
			log.error(message, e);
		}
		return "pretty:resetPasswordMessage";
	}

	public String resetPassword() {
		queryContext.setUserLanguage(localeCtrl.getLanguage());

		password = password.trim();
		passwordConfirm = passwordConfirm.trim();

		boolean errors = false;
		if (!password.equals(passwordConfirm)) {
			messages.addError(passwordConfirmUIInput.getClientId(), "error.password.mismatch");
			errors = true;
		}

		if (errors) {
			return null;
		}

		log.info("reset password for code: {}", resetPasswordCode);
		User user = userService.resetPassword(resetPasswordCode, password);
		if (user == null) {
			messages.addGlobalError("core.resetPassword.error");
			log.error("reset password (error) for code: {}", resetPasswordCode);
		} else {
			messages.addGlobalInfo("core.resetPassword.success");
			log.info("reset password (success) for code: {}", resetPasswordCode);
		}

		return "pretty:resetPasswordMessage";
	}

	public String getEmailPattern() {
		return AccountCtrl.EMAIL_PATTERN;
	}
	
	public String getPasswordPattern() {
		return AccountCtrl.PASSWORD_PATTERN;
	}
}
