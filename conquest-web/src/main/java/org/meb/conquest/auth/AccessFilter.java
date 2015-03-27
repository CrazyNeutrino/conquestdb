package org.meb.conquest.auth;

import java.io.IOException;

import javax.inject.Inject;
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

import com.ocpsoft.pretty.faces.util.StringUtils;

@WebFilter(filterName = "AccessFilter", urlPatterns = "/*")
public class AccessFilter implements Filter {

	private static final Logger log = LoggerFactory.getLogger(AccessFilter.class);
	
	@Inject
	private AuthToken authUser;

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

		String contextPath = request.getContextPath();
		String requestURI = request.getRequestURI();		

		boolean xhtmlRequest = requestURI.endsWith(".xhtml");
		boolean jsfRequest = requestURI.endsWith(".jsf");
		boolean jsfResourceRequest = jsfRequest && requestURI.startsWith(contextPath + "/javax.faces.resource/");
		
		if (jsfResourceRequest) {
			log.debug("method: {}, requestURI: {}", request.getMethod(), requestURI);
		}

		if (xhtmlRequest || (jsfRequest && !jsfResourceRequest)) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
		} else {
			String origin = (String) request.getSession().getAttribute("origin");
			if (authUser.isSignedIn() && StringUtils.isNotBlank(origin)) {
				request.getSession().removeAttribute("origin");
				response.sendRedirect(origin);
			} else {
				chain.doFilter(servletRequest, servletResponse);
			}
		}
	}
}
