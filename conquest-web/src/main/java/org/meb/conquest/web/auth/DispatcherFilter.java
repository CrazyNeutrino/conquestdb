package org.meb.conquest.web.auth;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

@WebFilter(filterName = "DispatcherFilter", urlPatterns = { "/en/deck/*", "/pl/deck/*",
		"/de/deck/*", "/en/card/*", "/pl/card/*", "/de/card/*", "/en/public/deck/*",
		"/pl/public/deck/*", "/de/public/deck/*", "/en/set/*", "/pl/set/*", "/de/set/*",
		"/en/cycle/*", "/pl/cycle/*", "/de/cycle/*" })
public class DispatcherFilter implements Filter {

	private static final Logger log = LoggerFactory.getLogger(DispatcherFilter.class);
	private static final List<String> dispatchItems = new ArrayList<>();
	
	static {
		dispatchItems.add("/public/deck");
		dispatchItems.add("/deck");
		dispatchItems.add("/card");
		dispatchItems.add("/set");
		dispatchItems.add("/cycle");
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		String requestURI = request.getRequestURI();
		String newRequestURI = null;

		int index = -1;
		for (String item : dispatchItems) {
			if ((index = requestURI.indexOf(item)) > -1) {
				newRequestURI = requestURI.substring(0, index + item.length()) + "/";
				break;
			}
		}

		if (index == -1) {
			throw new IllegalStateException("Invalid URI");
		}
		
		log.info("dispatching: {} to {}", requestURI, newRequestURI);
		request.getServletContext().getRequestDispatcher(newRequestURI).forward(request, response);
	}
}
