package org.meb.conquest.web.auth;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebFilter(filterName = "DispatcherFilter", urlPatterns = { "/en/deck/*", "/pl/deck/*", "/de/deck/*", "/en/card/*",
		"/pl/card/*", "/de/card/*", "/en/public/deck/*", "/pl/public/deck/*", "/de/public/deck/*" })
public class DispatcherFilter implements Filter {

	private static final Logger log = LoggerFactory.getLogger(DispatcherFilter.class);
	private static final String PUBLIC_DECK = "/public/deck";
	private static final String DECK = "/deck";
	private static final String CARD = "/card";

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		String requestURI = request.getRequestURI();
		String newRequestURI = null;

		int index = -1;
		if ((index = requestURI.indexOf(PUBLIC_DECK)) > -1) {
			newRequestURI = requestURI.substring(0, index + PUBLIC_DECK.length()) + "/";
		} else if ((index = requestURI.indexOf(DECK)) > -1) {
			newRequestURI = requestURI.substring(0, index + DECK.length()) + "/";
		} else if ((index = requestURI.indexOf(CARD)) > -1) {
			newRequestURI = requestURI.substring(0, index + CARD.length()) + "/";
		} else {
			throw new IllegalStateException("Invalid URI");
		}

		log.info("dispatching: {} to {}", requestURI, newRequestURI);
		request.getServletContext().getRequestDispatcher(newRequestURI).forward(request, response);
	}
}
