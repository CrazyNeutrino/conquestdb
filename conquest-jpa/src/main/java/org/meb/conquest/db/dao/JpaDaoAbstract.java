package org.meb.conquest.db.dao;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Fetch;
import javax.persistence.criteria.FetchParent;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.ManagedType;
import javax.persistence.metamodel.SingularAttribute;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.meb.conquest.db.query.CriteriaIn;
import org.meb.conquest.db.query.CriteriaMax;
import org.meb.conquest.db.query.CriteriaMin;
import org.meb.conquest.db.query.Query;
import org.meb.conquest.db.query.Query.Mode;
import org.meb.conquest.db.query.Sorting;
import org.meb.conquest.db.query.Sorting.Direction;
import org.meb.conquest.db.query.Sorting.Item;
import org.meb.conquest.db.util.PropType;
import org.meb.conquest.db.util.PropUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class JpaDaoAbstract<E, Q extends Query<E>> {
	
	private static final Logger log = LoggerFactory.getLogger(JpaDaoAbstract.class);

	private EntityManager em;

	public JpaDaoAbstract(EntityManager em) {
		this.em = em;
	}

	protected EntityManager getEntityManager() {
		return em;
	}

	protected List<Predicate> buildExampleCriteria(Path<E> path, E example,
			Set<String> excludeFieldNames) {
		CriteriaBuilder cb = em.getCriteriaBuilder();

		List<Predicate> predicates = new ArrayList<>();

		@SuppressWarnings("unchecked")
		Class<E> exampleClazz = (Class<E>) example.getClass();
		ManagedType<E> managedType = em.getMetamodel().managedType(exampleClazz);

		Field[] fields = PropUtils.getFields(exampleClazz, PropType.JPA);
		for (Field field : fields) {
			String fieldName = field.getName();
			if (excludeFieldNames != null && excludeFieldNames.contains(fieldName)) {
				continue;
			}

			Class<?> fieldType = field.getType();
			Object fieldValue = PropUtils.getProperty(example, fieldName);

			if (fieldValue == null) {
				continue;
			}

			Predicate predicate;
			if (fieldType == String.class) {
				SingularAttribute<? super E, String> attr = managedType
						.getSingularAttribute(fieldName, String.class);
				predicate = cb.like(cb.lower(path.get(attr)), (String) fieldValue);
			} else {
				SingularAttribute<? super E, ?> attr = managedType.getSingularAttribute(fieldName,
						fieldType);
				predicate = cb.equal(path.get(attr), fieldValue);
			}
			predicates.add(predicate);
		}

		return predicates;
	}

	protected List<Predicate> buildCustomCriteria(Q query, Root<E> root) {
		List<Predicate> predicates = new ArrayList<Predicate>();
		predicates.addAll(buildRangeCriteria(query, root));
		predicates.addAll(buildSetCriteria(query, root));
		return predicates;
	}

	protected List<Predicate> buildSetCriteria(Q query, Root<E> root) {
		List<Predicate> predicates = new ArrayList<>();

		Field[] fields = query.getClass().getDeclaredFields();
		try {
			for (Field field : fields) {
				CriteriaIn anno = field.getAnnotation(CriteriaIn.class);
				if (anno != null) {
					@SuppressWarnings("unchecked")
					Collection<Object> values = (Collection<Object>) FieldUtils
							.readDeclaredField(query, field.getName(), true);
					if (values != null) {
						Predicate predicate = buildSetCriteria(values, anno.value(), root);
						if (predicate != null) {
							if (anno.negate()) {
								predicate = predicate.not();
							}
							predicates.add(predicate);
						}
					}
				}
			}
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		}

		return predicates;
	}

	protected Predicate buildSetCriteria(Collection<?> values, String property, Path<?> path) {
		Predicate predicate;

		if (values != null && values.size() > 0) {
			int dotIndex = property.indexOf('.');
			if (dotIndex > -1) {
				String current = property.substring(0, dotIndex);
				String remaining = property.substring(dotIndex + 1);
				predicate = buildSetCriteria(values, remaining, path.get(current));
			} else {
				predicate = path.get(property).in(values);
			}
		} else {
			predicate = null;
		}

		return predicate;
	}

	protected List<Predicate> buildRangeCriteria(Q query, Root<E> root) {
		List<Predicate> predicates = new ArrayList<>();

		Map<String, Object[]> map = new HashMap<>();
		Field[] fields = query.getClass().getDeclaredFields();

		try {
			for (Field field : fields) {
				CriteriaMin minAnno = field.getAnnotation(CriteriaMin.class);
				if (minAnno != null) {
					Object valueMin = FieldUtils.readDeclaredField(query, field.getName(), true);
					if (valueMin != null) {
						String key = minAnno.value();
						Object[] valueMinMax = map.get(key);
						if (valueMinMax == null) {
							valueMinMax = new Object[3];
							map.put(key, valueMinMax);
						}
						if (valueMinMax[0] == null || valueMinMax[0].equals(valueMin.getClass())) {
							valueMinMax[0] = valueMin.getClass();
						} else {
							throw new RuntimeException("Type mismatch");
						}
						valueMinMax[1] = valueMin;
					}
				}

				CriteriaMax maxAnno = field.getAnnotation(CriteriaMax.class);
				if (maxAnno != null) {
					Object valueMax = FieldUtils.readDeclaredField(query, field.getName(), true);
					if (valueMax != null) {
						String key = maxAnno.value();
						Object[] valueMinMax = map.get(key);
						if (valueMinMax == null) {
							valueMinMax = new Object[3];
							map.put(key, valueMinMax);
						}
						if (valueMinMax[0] == null || valueMinMax[0].equals(valueMax.getClass())) {
							valueMinMax[0] = valueMax.getClass();
						} else {
							throw new RuntimeException("Type mismatch");
						}
						valueMinMax[2] = valueMax;
					}
				}
			}
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		}

		Set<Entry<String, Object[]>> entries = map.entrySet();
		for (Entry<String, Object[]> entry : entries) {
			Class<?> type = (Class<?>) entry.getValue()[0];
			if (Number.class.isAssignableFrom(type)) {
				Number valueMin = (Number) entry.getValue()[1];
				Number valueMax = (Number) entry.getValue()[2];
				predicates.addAll(buildRangeCriteria(valueMin, valueMax, entry.getKey(), root));
			} else if (Date.class.isAssignableFrom(type)) {
				Date valueMin = (Date) entry.getValue()[1];
				Date valueMax = (Date) entry.getValue()[2];
				predicates.addAll(buildRangeCriteria(valueMin, valueMax, entry.getKey(), root));
			}
		}

		return predicates;
	}

	protected <T extends Comparable<? super T>> List<Predicate> buildRangeCriteria(T valueMin,
			T valueMax, String property, Path<?> path) {

		List<Predicate> predicates;

		if (valueMin != null || valueMax != null) {
			int dotIndex = property.indexOf('.');
			if (dotIndex > -1) {
				String current = property.substring(0, dotIndex);
				String remaining = property.substring(dotIndex + 1);
				predicates = buildRangeCriteria(valueMin, valueMax, remaining, path.get(current));
			} else {
				CriteriaBuilder cb = em.getCriteriaBuilder();
				predicates = new ArrayList<>();
				Path<T> valuePath = path.get(property);
				if (valueMin != null) {
					predicates.add(cb.greaterThanOrEqualTo(valuePath, valueMin));
				}
				if (valueMax != null) {
					predicates.add(cb.lessThanOrEqualTo(valuePath, valueMax));
				}
			}
		} else {
			predicates = new ArrayList<>();
		}

		return predicates;
	}

	protected <T extends Number> List<Predicate> buildRangeCriteria(T valueMin, T valueMax,
			String property, Path<?> path) {

		List<Predicate> predicates;

		if (valueMin != null || valueMax != null) {
			int dotIndex = property.indexOf('.');
			if (dotIndex > -1) {
				String current = property.substring(0, dotIndex);
				String remaining = property.substring(dotIndex + 1);
				predicates = buildRangeCriteria(valueMin, valueMax, remaining, path.get(current));
			} else {
				CriteriaBuilder cb = em.getCriteriaBuilder();
				predicates = new ArrayList<>();
				Path<T> valuePath = path.get(property);
				if (valueMin != null) {
					predicates.add(cb.ge(valuePath, valueMin));
				}
				if (valueMax != null) {
					predicates.add(cb.le(valuePath, valueMax));
				}
			}
		} else {
			predicates = new ArrayList<>();
		}

		return predicates;
	}

	protected void applyCriteria(CriteriaQuery<?> cq, List<Predicate> predicates, Mode mode) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		if (predicates.size() > 0) {
			if (mode == Mode.AND) {
				cq.where(predicates.toArray(new Predicate[predicates.size()]));
			} else if (mode == Mode.OR) {
				cq.where(cb.or(predicates.toArray(new Predicate[predicates.size()])));
			}
		}
	}

	protected void applyOrder(CriteriaQuery<E> cq, ManagedType<E> mt, Path<E> root,
			Sorting sorting) {
		cq.orderBy(buildOrderList(sorting.items(), root));
	}

	protected List<Order> buildOrderList(Collection<Item> items, Path<?> root) {
		List<Order> orderList = new ArrayList<Order>();
		if (items != null) {
			for (Item item : items) {
				Order order = buildOrder(item, item.getProperty(), root);
				if (order != null) {
					orderList.add(order);
				}
			}
		}
		return orderList;
	}

	protected Order buildOrder(Item item, String property, Path<?> path) {
		Order order;

		int dotIndex = property.indexOf('.');
		if (dotIndex > -1) {
			String current = property.substring(0, dotIndex);
			String remaining = property.substring(dotIndex + 1);
			order = buildOrder(item, remaining, path.get(current));
		} else {
			CriteriaBuilder cb = em.getCriteriaBuilder();
			if (item.getDirection() == Direction.ASC) {
				order = cb.asc(path.get(property));
			} else {
				order = cb.desc(path.get(property));
			}
		}

		return order;
	}

	protected CriteriaQuery<E> createCriteriaQuery(Q query) {

		E example = query.getExample();
		@SuppressWarnings("unchecked")
		Class<E> exampleClazz = (Class<E>) example.getClass();
		ManagedType<E> mt = em.getMetamodel().managedType(exampleClazz);
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<E> cq = cb.createQuery(exampleClazz);
		Root<E> root = cq.from(exampleClazz);
		fetchRelatedEntities(query, root);

		List<Predicate> predicates = new ArrayList<>();
		predicates.addAll(buildExampleCriteria(root, example, null));
		predicates.addAll(buildCustomCriteria(query, root));
		applyCriteria(cq, predicates, query.getMode());
		applyOrder(cq, mt, root, query.getSorting());

		return cq.select(root);
	}

	protected CriteriaQuery<Long> createCountCriteriaQuery(Q query) {
		E example = query.getExample();

		@SuppressWarnings("unchecked")
		Class<E> exampleClazz = (Class<E>) example.getClass();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Long> cq = cb.createQuery(Long.class);
		Root<E> root = cq.from(exampleClazz);

		List<Predicate> predicates = new ArrayList<>();
		predicates.addAll(buildExampleCriteria(root, example, null));
		predicates.addAll(buildCustomCriteria(query, root));
		applyCriteria(cq, predicates, query.getMode());

		return cq.select(cb.count(root));
	}

	protected void fetchRelatedEntities(Q query, Root<E> root) {
		Set<String> fetchPaths = query.getFetchPaths();
		if (fetchPaths != null) {
			for (String fetchPath : fetchPaths) {
				log.debug("fetching path: {}", fetchPath);
				fetchRelatedEntity(fetchPath, root);
			}
		}
	}

	private void fetchRelatedEntity(String fetchPath, FetchParent<?, ?> fetchParent) {
		int dotIndex = fetchPath.indexOf('.');
		if (dotIndex > -1) {
			String part = fetchPath.substring(0, dotIndex);
			String remainingPart = fetchPath.substring(dotIndex + 1);
			log.debug("fetching path part: {}", part);
			Fetch<Object, Object> fetch = fetchParent.fetch(part);
			fetchRelatedEntity(remainingPart, fetch);
		} else {
			log.debug("fetching path part: {}", fetchPath);
			fetchParent.fetch(fetchPath);
		}
	}

	protected void setTypedQueryParameterValues(TypedQuery<?> typedQuery, Q query) {

	}

	protected TypedQuery<E> createTypedQuery(Q query) {
		TypedQuery<E> typedQuery = em.createQuery(createCriteriaQuery(query));
		setTypedQueryParameterValues(typedQuery, query);
		Integer pn = query.getPageNumber();
		Integer ps = query.getPageSize();
		if (pn != null && ps != null) {
			typedQuery.setFirstResult((pn - 1) * ps);
			typedQuery.setMaxResults(ps);
		}
		return typedQuery;
	}

	protected TypedQuery<Long> createCountTypedQuery(Q query) {
		TypedQuery<Long> typedQuery = em.createQuery(createCountCriteriaQuery(query));
		setTypedQueryParameterValues(typedQuery, query);
		return typedQuery;
	}

	protected abstract Q createQuery(E example);

	public List<E> find(E example) {
		return createTypedQuery(createQuery(example)).getResultList();
	}

	public E findUnique(E example) {
		E sb;

		try {
			sb = createTypedQuery(createQuery(example)).getSingleResult();
		} catch (NoResultException e) {
			sb = null;
		}
		return sb;
	}

	public List<E> find(Q query) {
		return createTypedQuery(query).getResultList();
	}

	public E findUnique(Q query) {
		E sb;

		try {
			sb = createTypedQuery(query).getSingleResult();
		} catch (NoResultException e) {
			sb = null;
		}
		return sb;
	}

	public Long count(Q query) {
		return createCountTypedQuery(query).getSingleResult();
	}
}
