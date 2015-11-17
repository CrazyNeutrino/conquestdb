package org.meb.conquest.web.rest.controller;

import java.lang.reflect.Method;
import java.util.Set;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;

import org.jboss.resteasy.core.Headers;
import org.jboss.resteasy.core.ResourceMethodInvoker;
import org.jboss.resteasy.core.ServerResponse;
import org.meb.conquest.web.auth.AuthToken;

@Provider
public class RoleBasedRequestFilter implements ContainerRequestFilter {

	@Inject
	private AuthToken authToken;

	private static final ServerResponse ACCESS_DENIED = new ServerResponse("Access denied", 401, new Headers<Object>());
	private static final ServerResponse ACCESS_FORBIDDEN = new ServerResponse("Access forbidden", 403,
			new Headers<Object>());

	@Override
	public void filter(ContainerRequestContext requestContext) {
		ResourceMethodInvoker methodInvoker = (ResourceMethodInvoker) requestContext
				.getProperty("org.jboss.resteasy.core.ResourceMethodInvoker");
		Method method = methodInvoker.getMethod();

		if (method.isAnnotationPresent(PermitAll.class)) {
			return;
		}

		if (method.isAnnotationPresent(DenyAll.class)) {
			requestContext.abortWith(ACCESS_FORBIDDEN);
			return;
		}

		if (method.isAnnotationPresent(RolesAllowed.class)) {
			RolesAllowed annotation = method.getAnnotation(RolesAllowed.class);
			String[] rolesAllowed = annotation.value();
			Set<String> userRoles = authToken.getUserRoles();

			if (userRoles == null || userRoles.isEmpty()) {
				requestContext.abortWith(ACCESS_DENIED);
				return;
			}
			for (String roleAllowed : rolesAllowed) {
				if (userRoles.contains(roleAllowed)) {
					return;
				}
			}
		} else {
			throw new IllegalStateException("Access not defined for: " + method.getDeclaringClass().getCanonicalName()
					+ "." + method.getName());
		}
	}
}