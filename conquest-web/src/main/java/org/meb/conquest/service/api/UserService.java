package org.meb.conquest.service.api;

import java.util.List;

import org.meb.conquest.core.exception.DeckException;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.model.UserContribSummary;

public interface UserService extends SearchService {

	User signInUser(String name, String password) throws DeckException;

	User signUpUser(String name, String email, String password) throws DeckException;
	
	User activateUser(String activationCode);
	
	User prepareResetPassword(String email) throws DeckException;
	
	User resetPassword(String code, String password);
	
	List<UserContribSummary> findContributors();
}
