package org.meb.conquest.web.auth;

import javax.servlet.http.HttpServlet;

// @WebServlet("/auth/twitter")
public class TwitterAuthServlet extends HttpServlet {

	private static final long serialVersionUID = -8784925431831905177L;

	// private static final String TWITTER_REQUEST_TOKEN =
	// "twitterRequestToken";
	// private static final String TWITTER_ACCESS_TOKEN = "twitterAccessToken";
	// private static final String TWITTER = "twitter";
	//
	// private static final long serialVersionUID = 1L;
	// private static final Logger log =
	// LoggerFactory.getLogger(TwitterAuthServlet.class);
	//
	// @Inject
	// private EntityManager em;
	//
	// @Inject
	// private AuthToken authUser;
	//
	// protected void doGet(HttpServletRequest request, HttpServletResponse
	// response) throws ServletException, IOException {
	//
	// HttpSession session = request.getSession();
	//
	// boolean signoutRequest =
	// request.getParameterMap().containsKey("signout");
	// if (session != null && signoutRequest) {
	// removeSignInAttributes(session);
	// response.sendRedirect(request.getContextPath() + "/");
	// return;
	// }
	//
	// if (session != null && authUser.isSignedIn()) {
	// response.sendRedirect(request.getContextPath() + "/");
	// return;
	// }
	//
	// boolean callbackRequest =
	// request.getParameterMap().containsKey("callback");
	// if (callbackRequest) {
	// processCallbackRequest(request, response);
	// } else {
	// processInitialRequest(request, response);
	// }
	// }
	//
	// private void processInitialRequest(HttpServletRequest request,
	// HttpServletResponse response) throws IOException,
	// ServletException {
	//
	// removeSignInAttributes(request.getSession(false));
	//
	// String origin = request.getParameter("origin");
	// StringBuffer callbackURL = request.getRequestURL().append("?callback");
	// if (StringUtils.isNotBlank(origin)) {
	// callbackURL.append("&origin=").append(origin);
	// }
	// RequestToken requestToken;
	// try {
	// requestToken =
	// getTwitter(request).getOAuthRequestToken(callbackURL.toString());
	// } catch (TwitterException e) {
	// throw new ServletException(e);
	// }
	//
	// request.getSession().setAttribute(TWITTER_REQUEST_TOKEN, requestToken);
	// response.sendRedirect(requestToken.getAuthenticationURL());
	// }
	//
	// private void processCallbackRequest(HttpServletRequest request,
	// HttpServletResponse response)
	// throws ServletException, IOException {
	//
	// RequestToken requestToken = (RequestToken)
	// request.getSession().getAttribute(TWITTER_REQUEST_TOKEN);
	// String oauthVerifier = request.getParameter("oauth_verifier");
	// String oauthToken = request.getParameter("oauth_token");
	//
	// if (!requestToken.getToken().equals(oauthToken)) {
	// throw new ServletException("Request token mismatch");
	// }
	//
	// AccessToken twitterAccessToken;
	// twitter4j.User twitterUser;
	// try {
	// Twitter twitter = getTwitter(request);
	// twitterAccessToken = twitter.getOAuthAccessToken(requestToken,
	// oauthVerifier);
	// twitterUser = twitter.verifyCredentials();
	// log.info("twitter sign in success [id: {}, name: {}, screen name: {}]",
	// new Object[] { twitterUser.getId(),
	// twitterUser.getName(), twitterUser.getScreenName() });
	// } catch (TwitterException e) {
	// removeSignInAttributes(request.getSession());
	// throw new ServletException(e);
	// }
	//
	// User user;
	// try {
	// em.getTransaction().begin();
	//
	// user = new User();
	// user.setTwitterId(twitterUser.getId());
	// user = new JpaDao<User, Query<User>>(em).findUnique(user);
	//
	// Date date = new Date();
	// if (user == null) {
	// user = new User();
	// user.setTwitterId(twitterUser.getId());
	// user.setUsername(twitterUser.getScreenName());
	// user.setSignUpDate(date);
	// user.setSignInDate(date);
	// em.persist(user);
	// } else {
	// user.setSignInDate(date);
	// user = em.merge(user);
	// }
	//
	// em.flush();
	// em.getTransaction().commit();
	// } catch (RuntimeException e) {
	// em.getTransaction().rollback();
	// removeSignInAttributes(request.getSession());
	// throw new ServletException(e);
	// }
	//
	// request.getSession().removeAttribute(TWITTER_REQUEST_TOKEN);
	// request.getSession().setAttribute(TWITTER_ACCESS_TOKEN,
	// twitterAccessToken);
	// authUser.setUser(user);
	//
	// String redirectURL = request.getParameter("origin");
	// if (StringUtils.isBlank(redirectURL)) {
	// redirectURL = request.getContextPath() + "/";
	// }
	// response.sendRedirect(redirectURL);
	// }
	//
	// private void removeSignInAttributes(HttpSession session) {
	// if (session == null) {
	// return;
	// }
	//
	// authUser.setUser(null);
	// session.removeAttribute(TWITTER_REQUEST_TOKEN);
	// session.removeAttribute(TWITTER_ACCESS_TOKEN);
	// session.removeAttribute(TWITTER);
	// }
	//
	// private Twitter getTwitter(HttpServletRequest request) {
	// Twitter twitter = (Twitter) request.getSession().getAttribute(TWITTER);
	// if (twitter == null) {
	// twitter = new TwitterFactory().getInstance();
	// request.getSession().setAttribute(TWITTER, twitter);
	// }
	// return twitter;
	// }
}
