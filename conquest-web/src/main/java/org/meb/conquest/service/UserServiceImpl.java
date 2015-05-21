package org.meb.conquest.service;

import java.io.Serializable;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Properties;
import java.util.PropertyResourceBundle;

import javax.inject.Inject;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.deltaspike.jpa.api.transaction.Transactional;
import org.jboss.resteasy.util.Hex;
import org.meb.conquest.core.Constant;
import org.meb.conquest.db.model.User;
import org.meb.conquest.rest.MessageBundleResolver;
import org.meb.conquest.rest.exception.DeckException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserServiceImpl extends SearchServiceImpl implements UserService, Serializable {

	private static final long serialVersionUID = -3917684297662777248L;

	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

	@Inject
	private EntityManager em;

	@Inject
	private RequestContext queryContext;

	@Inject
	private MessageBundleResolver resolver;

	@Transactional
	public User signInUser(String name, String password) throws DeckException {
		User user = findUnique(new User(name, true));
		if (user != null) {
			HashHelper helper = new HashHelper(password);

			if (helper.verify(user.getHash(), user.getSalt())) {
				user.setSignInDate(new Date());
				user = em.merge(user);
				em.flush();
			} else {
				user = null;
			}
		}

		if (user == null) {
			throw new DeckException("error.usernameOrPassword.invalid");
		}

		return user;
	}

	@Transactional
	public User signUpUser(String name, String email, String password) throws DeckException {
		try {
			HashHelper helper = new HashHelper(password);
			if (!helper.create().verify()) {
				throw new RuntimeException("Unable to verify hash");
			}

			String activationCode = createCode();

			User user = new User(name, email, helper.getHashHex(), helper.getSaltHex());
			Date date = new Date();
			user.setSignUpDate(date);
			user.setSignInDate(date);
			user.setActivationCode(activationCode);
			user.setActive(false);
			em.persist(user);
			em.flush();

			sendActivationMail(user.getEmail(), createActivationLink(activationCode));

			return user;
		} catch (Exception e) {
			ExceptionFilter filter = new ExceptionFilter(e);
			if (filter.findViolatedConstraint()) {
				throw new DeckException(filter.getViolatedConstraint());
			}
			if (e instanceof RuntimeException) {
				throw (RuntimeException) e;
			} else {
				throw new RuntimeException(e);
			}
		}
	}

	@Transactional
	public User activateUser(String activationCode) {
		User user = new User();
		user.setActivationCode(activationCode);
		user.setActive(false);
		user = findUnique(user);
		if (user != null) {
			user.setActivationCode(null);
			user.setActive(true);
			user = em.merge(user);
			em.flush();
		}

		return user;
	}

	@Override
	@Transactional
	public User prepareResetPassword(String email) throws DeckException {
		try {
			User user = new User();
			user.setEmail(email);
			user = findUnique(user);
			if (user != null) {
				String resetPasswordCode = createCode();
				user.setResetPasswordCode(resetPasswordCode);
				em.merge(user);
				em.flush();

				sendResetPasswordMail(email, createResetPasswordLink(resetPasswordCode));
			}

			return user;
		} catch (Exception e) {
			ExceptionFilter filter = new ExceptionFilter(e);
			if (filter.findViolatedConstraint()) {
				throw new DeckException(filter.getViolatedConstraint());
			}
			if (e instanceof RuntimeException) {
				throw (RuntimeException) e;
			} else {
				throw new RuntimeException(e);
			}
		}
	}

	@Override
	@Transactional
	public User resetPassword(String resetPasswordCode, String password) {
		User user = new User();
		user.setResetPasswordCode(resetPasswordCode);
		user = findUnique(user);
		if (user != null) {
			HashHelper helper = new HashHelper(password);
			if (!helper.create().verify()) {
				throw new RuntimeException("Unable to verify hash");
			}

			user.setResetPasswordCode(null);
			user.setHash(helper.getHashHex());
			user.setSalt(helper.getSaltHex());
			user = em.merge(user);
			em.flush();
		}

		return user;
	}

	private void sendMail(String address, String subject, String content) throws Exception {
		Properties properties = new Properties();
		properties.load(getClass().getResourceAsStream("/resources/mail.properties"));
		final String username = properties.getProperty("mail.smtp.user");
		final String password = Constant.MAIL_PASSWORD;

		Session session = Session.getDefaultInstance(properties, new javax.mail.Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		Message message = new MimeMessage(session);
		InternetAddress recipientsTo[] = new InternetAddress[] { new InternetAddress(address) };
		message.setRecipients(Message.RecipientType.TO, recipientsTo);
		message.setSubject(subject);
		message.setContent(content, "text/plain; charset=utf-8");
		Transport.send(message);
	}

	private void sendActivationMail(String email, String activationLink) throws Exception {
		if (Constant.MAIL_ACTIVATE) {
			log.info("sending activation link: {}, to: {}", activationLink, email);
			sendMail(email, createActivationMailSubject(), createActivationMailContent(activationLink));
		} else {
			log.info("not sending activation link (disabled): {}, to: {}", activationLink, email);
		}
	}

	private void sendResetPasswordMail(String email, String resetPasswordLink) throws Exception {
		if (Constant.MAIL_RESET_PASSWORD) {
			log.info("sending activation link: {}, to: {}", resetPasswordLink, email);
			sendMail(email, createResetPasswordMailSubject(), createResetPasswordMailContent(resetPasswordLink));
		} else {
			log.info("not sending reset password link (disabled): {}, to: {}", resetPasswordLink, email);
		}
	}

	private String createCode() {
		byte[] data = new byte[16];
		new SecureRandom().nextBytes(data);
		return Hex.encodeHex(data);
	}

	private String createActivationLink(String activationCode) {
		StringBuilder link = new StringBuilder("http://");
		link.append(Constant.HOST);
		if (Constant.PORT != null) {
			link.append(":").append(Constant.PORT);
		}
		link.append("/");
		link.append(queryContext.getUserLanguage());
		link.append("/account/activate?code=");
		link.append(StringEscapeUtils.escapeHtml4(activationCode));
		return link.toString();
	}

	private String createResetPasswordLink(String resetPasswordCode) {
		StringBuilder link = new StringBuilder("http://");
		link.append(Constant.HOST);
		if (Constant.PORT != null) {
			link.append(":").append(Constant.PORT);
		}
		link.append("/");
		link.append(queryContext.getUserLanguage());
		link.append("/account/resetpassword?code=");
		link.append(StringEscapeUtils.escapeHtml4(resetPasswordCode));
		return link.toString();
	}

	private String createActivationMailSubject() {
		return resolver.getBundle(queryContext.getUserLanguage()).getString("mail.activate.subject");
	}

	private String createActivationMailContent(String activationLink) {
		StringBuilder message = new StringBuilder();
		PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
		message.append(bundle.getString("mail.activate.content"));
		message.append("\n\n");
		message.append(activationLink);
		message.append("\n\n");
		message.append(bundle.getString("mail.doNotReply"));
		return message.toString();
	}

	private String createResetPasswordMailSubject() {
		return resolver.getBundle(queryContext.getUserLanguage()).getString("mail.resetPassword.subject");
	}

	private String createResetPasswordMailContent(String resetPasswordLink) {
		StringBuilder message = new StringBuilder();
		PropertyResourceBundle bundle = resolver.getBundle(queryContext.getUserLanguage());
		message.append(bundle.getString("mail.resetPassword.content"));
		message.append("\n\n");
		message.append(resetPasswordLink);
		message.append("\n\n");
		message.append(bundle.getString("mail.doNotReply"));
		return message.toString();
	}
}