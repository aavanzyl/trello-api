'use strict';

const assert = require('assert');
const TrelloRest = require('./rest');

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

		this.url = url + "/1/webhooks";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}

	async get(id) {
		assert(id, NAME + " - id not provided.");
		return await this.trelloRest.get(`${this.url}/${id}`, []);
	}

	async create(args) {
		assert(args, NAME + " - args not provided.");
		assert(args.callbackURL, NAME + " - args.callbackURL not provided.");
		assert(args.idModel, NAME + " - args.idModel not provided.");

		return await this.trelloRest.post(`${this.url}`, args);
	}

	async update(id, args) {
		assert(id, NAME + " - id not provided.");
		assert(args, NAME + " - args not provided.");

		return await this.trelloRest.put(`${this.url}/${id}`, args);
	}

	async delete(id) {
		assert(id, NAME + " - id not provided.");

		return await this.trelloRest.delete(`${this.url}`, id);
	}

}
