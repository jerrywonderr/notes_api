import { getSessionPayload, getUserHashFromSession, removeTrailingSlash } from "./helpers/index.mjs";

/**
 * Bounce all request for unauthorized sessions, excluding endpoints in whitelist
 */
export const bounceUnathenticated = (req, res, next) => {
    let targetURL = req.originalUrl.split('?')[0]; // The first value is the main part of the url i.e without get parameters
    // targetURL = targetURL.replace(conf.API_BASE_ENDPOINT, ''); // Strip off API_BASE_ENDPOINT, we only need the specific endpoint
    let  whitelist = ['/auth/login', '/auth/user/new', '']; // Endpoints that do not need authentication
    targetURL = removeTrailingSlash(targetURL);
    const userHash = getUserHashFromSession(req);
    if (whitelist.indexOf(targetURL) !== -1 || userHash) {
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