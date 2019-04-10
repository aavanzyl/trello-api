'use strict';

const assert = require('assert');
const TrelloRest = require('./cc-trello-rest');

/**
 * Name of the module
 * @type {String}
 */
const NAME = "trello-api";

module.exports = class {

	/**
	 * Create a new Trello instance for handeling requests to trello.
	 * @param  {object} options     trelloKey and trelloToken
	 */
	constructor(url, trelloKey, trelloToken) {

		assert(url, NAME + " - url not provided.");
		assert(trelloKey, NAME + " - trelloKey not provided.");
		assert(trelloToken, NAME + " - trelloToken not provided.");

		this.url = url + "/1/tokens";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}

	async getTokenInfo(token) {

		assert(token, NAME + " - token not provided.");

		var _params = [
			'fields=all'
		];

		return await this.trelloRest.get(`${this.url}/${token}`, _params);
	}

	async getTokenMember(token) {
		assert(token, NAME + " - token not provided.");

		var _params = [
			'fields=all'
		];

		return await this.trelloRest.get(`${this.url}/${token}/member`, _params);
	}

	async getTokenWebhooks(token) {
		assert(token, NAME + " - token not provided.");

		var _params = [
			'fields=all'
		];

		return await this.trelloRest.get(`${this.url}/${token}/webhooks`, _params);
	}

}
