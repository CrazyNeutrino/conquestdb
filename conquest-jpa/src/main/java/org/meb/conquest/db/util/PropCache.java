package org.meb.conquest.db.util;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Id;
import javax.persistence.Transient;
import javax.persistence.Version;

import org.apache.commons.lang3.ArrayUtils;

final class PropCache {

	private static final Map<Class<?>, PropCache> pool = new HashMap<Class<?>, PropCache>();

	private final Class<?> clazz;
	private final Map<PropType, String[]> nameCache = new HashMap<PropType, String[]>();
	private final Map<PropType, Field[]> fieldCache = new HashMap<PropType, Field[]>();

	private PropCache(Class<?> clazz) {
		this.clazz = clazz;
	}

	public static synchronized PropCache forClass(Class<?> clazz) {
		PropCache cache = pool.get(clazz);
		if (cache == null) {
			cache = new PropCache(clazz);
			pool.put(clazz, cache);
		}
		return cache;
	}

	public synchronized String[] getNames(PropType propType) {
		String[] names = nameCache.get(propType);
		if (names == null) {
			initCache(propType, getValidFields(propType));
			names = nameCache.get(propType);
		}
		return names;
	}

	public synchronized Field[] getFields(PropType propType) {
		Field[] fields = fieldCache.get(propType);
		if (fields == null) {
			initCache(propType, getValidFields(propType));
			fields = fieldCache.get(propType);
		}
		return fields;
	}

	private void initCache(PropType propType, Field[] fields) {
		fieldCache.put(propType, fields);
		String[] names = new String[fields.length];
		for (int i = 0; i < fields.length; i++) {
			names[i] = fields[i].getName();
		}
		nameCache.put(propType, names);
	}

	private Field[] getValidFields(PropType propType) {
		Field[] fields = clazz.getDeclaredFields();
		Field[] validFields = new Field[fields.length];
		int idx = 0;

		for (Field field : fields) {
			if (Modifier.isStatic(field.getModifiers())) {
				continue;
			}
			if (!isSimpleType(field.getType())) {
				continue;
			}
			if (propType == PropType.JPA) {
				if (field.isAnnotationPresent(Transient.class)) {
					continue;
				}
			}
			if (propType == PropType.JPA_DATA) {
				if (field.isAnnotationPresent(Transient.class)
						|| field.isAnnotationPresent(Id.class)
						|| field.isAnnotationPresent(Version.class)) {
					continue;
				}
			}
			validFields[idx++] = field;
		}
		return (Field[]) ArrayUtils.subarray(validFields, 0, idx);
	}

	private boolean isSimpleType(Class<?> clazz) {
		return clazz == String.class || clazz == Boolean.class
				|| Number.class.isAssignableFrom(clazz) || Date.class.isAssignableFrom(clazz)
				|| clazz.isEnum();
	}
}
