import { getSessionPayload } from "./helpers/index.mjs";

/**
 * Bounce all request for unauthorized sessions, excluding endpoints in whitelist
 */
export const bounceUnathenticated = (req, res, next) => {
    let targetURL = req.originalUrl.split('?')[0]; // The first value is the main part of the url i.e without get parameters
    // targetURL = targetURL.replace(conf.API_BASE_ENDPOINT, ''); // Strip off API_BASE_ENDPOINT, we only need the specific endpoint
    const whitelist = ['/auth/login', '/auth/user/new']; // Endpoints that do not need authentication
    const token = req.header("X-Access-Token");
    const payload = getSessionPayload(token);
    if (whitelist.indexOf(targetURL) !== -1 || payload.user_hash) {
      next();
      return ;
    }
    res.status(401).json({
        data: [],
        message: 'Access denied! Please, refresh your access token',
        error: true
    });
    res.end();
};