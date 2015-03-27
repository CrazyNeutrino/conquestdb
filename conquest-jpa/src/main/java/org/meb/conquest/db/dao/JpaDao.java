package org.meb.conquest.db.dao;

import javax.persistence.EntityManager;

import org.meb.conquest.db.query.Query;

public class JpaDao<T, Q extends Query<T>> extends JpaDaoAbstract<T, Query<T>> {

	public JpaDao(EntityManager em) {
		super(em);
	}

	@Override
	protected Query<T> createQuery(T example) {
		return new Query<T>(example);
	}
}
