package org.meb.conquest.service;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class PersistenceProducer {

	private static final Logger log = LoggerFactory.getLogger(PersistenceProducer.class);

	private EntityManagerFactory emf;

	@Produces
	@RequestScoped
	public EntityManager createEntityManager() {
		EntityManager em = createEntityManagerFactory().createEntityManager();
		log.debug("createEntityManager(): {}", em);
		return em;
	}

	public void destroyEntityManager(@Disposes EntityManager em) {
		log.debug("destroyEntityManager(): {}", em);
		if (em.isOpen()) {
			em.close();
		}
	}

	private EntityManagerFactory createEntityManagerFactory() {
		if (emf == null) {
			emf = Persistence.createEntityManagerFactory("conquest-pu");
		}
		return emf;
	}
}
