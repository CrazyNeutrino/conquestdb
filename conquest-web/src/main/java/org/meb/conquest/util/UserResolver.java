package org.meb.conquest.util;

import org.meb.conquest.db.model.User;

public interface UserResolver {

	User resolve(Long id);
}
