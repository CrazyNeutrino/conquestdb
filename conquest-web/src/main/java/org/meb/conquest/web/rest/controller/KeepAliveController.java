package org.meb.conquest.web.rest.controller;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.meb.conquest.web.auth.AuthToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/keepalive")
public class KeepAliveController extends AbstractController {

	private static final Logger log = LoggerFactory.getLogger(KeepAliveController.class);

	@Inject
	private AuthToken authUser;

	@POST
	@PermitAll
	public Response keepAlive() {
		log.info("keepAlive(): auth user: {}", authUser);
		return Response.ok().build();
	}
}