'use strict'

const OAuth = (require("oauth")).OAuth;

const requestUrl = "https://trello.com/1/OAuthGetRequestToken";
const accessUrl = "https://trello.com/1/OAuthGetAccessToken";
const authorizeUrl = "https://trello.com/1/OAuthAuthorizeToken";

/**
 * Create Trello OAuth Token
 * @param  {[type]} key           your trello application's API key
 * @param  {[type]} secret        your trello application's API secret
 * @param  {[type]} loginCallback the URL that trello redirects back to after authentication
 * @param  {[type]} appName       the name you'd like shown on trello's "authorize this app" page
 *
 */
var TrelloOAuth = module.exports = function(key, secret, loginCallback, appName) {
	this.oauth = new OAuth(requestUrl, accessUrl, key, secret, "1.0", loginCallback, "HMAC-SHA1");
	this.appName = appName;
};

TrelloOAuth.prototype.getRequestToken = function(callback) {
	var appName = this.appName;

	this.oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
		if(error) {
			return callback(error, null);
		}

		callback(null, {
			oauth_token: token,
			oauth_token_secret: tokenSecret,
			redirect: authorizeUrl + ("?oauth_token=" + token + "&name=" + appName)
		});
	});
};

/**
 * Get an Access Token
 * @param  {[type]}   bag      the data bag returned from #getRequestToken() merged with the query variables given from the user redirect back to the loginCallback.
 * @param  {Function} callback
 *
 */
TrelloOAuth.prototype.getAccessToken = function(bag, callback) {
	var token = bag.oauth_token;
	var tokenSecret = bag.oauth_token_secret;
	var verifier = bag.oauth_verifier;

	this.oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results) {
		if(error) {
			return callback(error, null);
		}

		callback(null, {
			oauth_token: token,
			oauth_token_secret: tokenSecret,
			oauth_access_token: accessToken,
			oauth_access_token_secret: accessTokenSecret
		});
	});
};
