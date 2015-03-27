package org.meb.conquest.auth;

import java.io.IOException;
import java.util.Date;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.meb.conquest.db.dao.JpaDao;
import org.meb.conquest.db.model.User;
import org.meb.conquest.db.query.Query;

// @WebServlet("/auth/twitter")
public class TwitterAuthServletDummy extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Inject
	private EntityManager em;

	@Inject
	private AuthToken authUser;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		boolean signoutRequest = request.getParameterMap().containsKey("signout");
		if (signoutRequest) {
			authUser.setUser(null);
			response.sendRedirect(request.getContextPath());
		} else {

			User user;
			try {
				em.getTransaction().begin();

				user = new User();
				user.setTwitterId(0L);
				user = new JpaDao<User, Query<User>>(em).findUnique(user);

				Date date = new Date();
				if (user == null) {
					user = new User();
					user.setTwitterId(0L);
					user.setUsername("DummyTwitterUser");
					user.setSignUpDate(date);
					user.setSignInDate(date);
					em.persist(user);
				} else {
					user.setSignInDate(date);
					user = em.merge(user);
				}

				em.flush();
				em.getTransaction().commit();
			} catch (RuntimeException e) {
				em.getTransaction().rollback();
				throw new ServletException(e);
			}

			String origin = request.getParameter("origin");
			if (origin == null) {
				response.sendRedirect(request.getContextPath());
			} else {
				response.sendRedirect(origin);
			}
			// session.setAttribute(TwitterAuthServlet.SIGNED_IN_USER, user);
			authUser.setUser(user);
		}
	}
}
