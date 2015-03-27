package org.meb.conquest.service;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.meb.conquest.core.Constant;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

public class ExceptionFilter {

	private Throwable base;

	@Getter
	private Throwable throwable;
	private static final Set<String> constraintNames;
	
	static {
		constraintNames = new HashSet<>();
		constraintNames.add(Constant.Constraint.UK_USER_NAME);
		constraintNames.add(Constant.Constraint.UK_USER_MAIL);
		constraintNames.add(Constant.Constraint.UK_USER_HASH);
		constraintNames.add(Constant.Constraint.UK_USER_SALT);
		constraintNames.add(Constant.Constraint.UK_USER_ACTV_CODE);
		constraintNames.add(Constant.Constraint.UK_USER_REPA_CODE);
		
		constraintNames.add(Constant.Constraint.UK_DECK_NAME);
		constraintNames.add(Constant.Constraint.FK_DECK_SNAPSHOT_BASE);
	}
	@Getter
	private String violatedConstraint;

	@Getter
	private String violatedConstraintValue;

	public ExceptionFilter(Throwable base) {
		this.base = base;
	}

	public <T extends Throwable> boolean find(Class<T> type) {
		int index = ExceptionUtils.indexOfType(base, type);
		if (index == -1) {
			String typeName = type.getCanonicalName();
			Throwable[] throwables = ExceptionUtils.getThrowables(base);
			for (Throwable throwable : throwables) {
				if (throwable.getClass().getCanonicalName().equals(typeName)) {
					this.throwable = throwable;
					return true;
				}
			}
			return false;
		} else {
			throwable = ExceptionUtils.getThrowables(base)[index];
			return true;
		}
	}

	public boolean findViolatedConstraint() {
		boolean found = find(MySQLIntegrityConstraintViolationException.class);
		if (found) {
			for (String name : constraintNames) {
				if (throwable.getMessage().contains(name)) {
					violatedConstraint = name;
					return true;
				}
			}
		}
		return false;
	}
}
