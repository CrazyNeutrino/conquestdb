package org.meb.conquest.db.util;

import java.lang.reflect.Field;

import org.apache.commons.beanutils.PropertyUtils;

public class PropUtils {

	public static String[] getNames(Class<?> clazz, PropType propType) {
		return PropCache.forClass(clazz).getNames(propType);
	}

	public static Field[] getFields(Class<?> clazz, PropType propType) {
		return PropCache.forClass(clazz).getFields(propType);
	}

	public static void copy(Object target, Object source, String... properties) {
		for (String property : properties) {
			try {
				Object value = PropertyUtils.getProperty(source, property);
				PropertyUtils.setProperty(target, property, value);
			} catch (Exception e) {
				throw new RuntimeException("Unable to copy property: " + property, e);
			}
		}
	}

	public static void copy(Object target, Object source, PropType propType) {
		copy(target, source, getNames(target.getClass(), propType));
	}

	public static void copyJpa(Object target, Object source) {
		copy(target, source, PropType.JPA);
	}

	public static void copyJpaData(Object target, Object source) {
		copy(target, source, PropType.JPA_DATA);
	}

	public static Object getProperty(Object bean, String name) {
		return getProperty(bean, name, true);
	}

	public static Object getProperty(Object bean, String name, boolean silent) {
		try {
			return PropertyUtils.getProperty(bean, name);
		} catch (Exception e) {
			if (silent) {
				return null;
			} else {
				throw new RuntimeException(e);
			}
		}
	}
}
