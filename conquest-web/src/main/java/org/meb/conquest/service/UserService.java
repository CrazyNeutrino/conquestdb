package org.meb.conquest.service;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.User;

public interface UserService extends SearchService {

	User signInUser(String name, String password) throws DeckException;

	User signUpUser(String name, String email, String password) throws DeckException;
	
	User activateUser(String activationCode);
	
	User prepareResetPassword(String email) throws DeckException;
	
	User resetPassword(String code, String password);
}
