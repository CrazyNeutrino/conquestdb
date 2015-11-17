package org.meb.conquest.web.auth;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

import org.meb.conquest.db.model.User;

@Named
@SessionScoped
public class AuthToken implements Serializable {

	private static final long serialVersionUID = 5903924128226499769L;

	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getUserId() {
		return user == null ? null : user.getId();
	}
	
	public Set<String> getUserRoles() {
		Set<String> roles = null;
		if (user != null) {
			roles = new HashSet<>();
			roles.add("user");
		}
		return roles;
	}

	public String getUsername() {
		return user == null ? null : user.getUsername();
	}

	public boolean isSignedIn() {
		return getUserId() != null;
	}

	public boolean isNotSignedIn() {
		return getUserId() == null;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder("[");
		builder.append("id: ").append(getUserId());
		builder.append(", name: ").append(getUsername());
		builder.append(", signedIn: ").append(isSignedIn());
		builder.append("]");
		return builder.toString();
	}

	public TimeZone getTimeZone() {
		String timeZoneId;
		if (user == null || user.getTimeZoneId() == null) {
			timeZoneId = "UTC";
		} else {
			timeZoneId = user.getTimeZoneId();
		}
		return TimeZone.getTimeZone(timeZoneId);
	}

	public static void main(String[] args) {
		for (String id : TimeZone.getAvailableIDs()) {
			TimeZone tz = TimeZone.getTimeZone(id);
			System.out.println(tz.getRawOffset() + "\t" + id + "\t\t\t" + tz.getDisplayName(new Locale("pl")));
		}
	}
}
