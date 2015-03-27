package org.meb.conquest.db.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatabaseUtils {

	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(DatabaseUtils.class);

	public static void executeSetUserLang(EntityManager em, final String lang) {
		Session session = (Session) em.getDelegate();
		session.doWork(new Work() {

			public void execute(Connection conn) throws SQLException {
				PreparedStatement stmt = conn.prepareStatement("call cqp_set_user_lang(?)");
				stmt.setString(1, lang);
				stmt.execute();
				stmt.close();
			}
		});
	}
}
