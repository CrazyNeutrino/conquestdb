package org.meb.conquest.core;

public class Constant {

	public static final String HOST = getSystemProperty("conquest.host", "www.conquestdb.com");
	public static final String PORT = getSystemProperty("conquest.port", null);
	public static final String MAIL_PASSWORD = getSystemProperty("conquest.mail.password", null);
	public static final boolean MAIL_ACTIVATE = getBooleanSystemProperty("conquest.mail.activate",
			true);
	public static final boolean MAIL_RESET_PASSWORD = getBooleanSystemProperty(
			"conquest.mail.resetPassword", true);

	public static class Constraint {

		public static String UK_USER_NAME = "uk_user_name_idx";
		public static String UK_USER_MAIL = "uk_user_email_idx";
		public static String UK_USER_HASH = "uk_user_hash_idx";
		public static String UK_USER_SALT = "uk_user_salt_idx";
		public static String UK_USER_ACTV_CODE = "uk_user_actv_code_idx";
		public static String UK_USER_REPA_CODE = "uk_user_repa_code_idx";

		public static String UK_DECK_NAME = "uk_deck_comp00_idx";
		public static String FK_DECK_SNAPSHOT_BASE = "fk_deck_snaphot_base_id_idx";
	}

	public static class Deck {
		
		public static final long MAX_QUANTITY = 100;
		public static final long MAX_NAME_LEN = 50;
		public static final long MAX_DESCRIPTION_LEN = 20 * 1024;
		public static final long MAX_COMMENT_LEN = 2 * 1024;
	}

	private static String getSystemProperty(String property, String defaultValue) {
		String value = System.getProperty(property);
		if (value == null) {
			value = defaultValue;
		}
		return value;
	}

	private static boolean getBooleanSystemProperty(String property, boolean defaultValue) {
		String stringValue = System.getProperty(property);
		if (stringValue == null) {
			return defaultValue;
		} else {
			return new Boolean(stringValue);
		}
	}
}
