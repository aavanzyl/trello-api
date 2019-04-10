'use strict';

const assert = require('assert');
const TrelloRest = require('./rest');

/**
 * Name of the module
 * @type {String}
 */
const NAME = "trello-api";
const VALID_LABEL_COLOR = ['yellow', 'purple', 'blue', 'red', 'green', 'orange', 'black', 'sky', 'pink', 'lime'];

module.exports = class {

	/**
	 * Create a new Trello instance for handeling requests to trello.
	 * @param  {object} options     trelloKey and trelloToken
	 */
	constructor(url, trelloKey, trelloToken) {

		assert(url, NAME + " - url not provided.");
		assert(trelloKey, NAME + " - trelloKey not provided.");
		assert(trelloToken, NAME + " - trelloToken not provided.");

		this.url = url + "/1/labels";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}


	/**
	 * Get a label by ID
	 * @see https://trello.readme.io/reference#id
	 * @param  {[type]}  id      Label ID
	 * @return {Promise}
	 */
	async getLabel(id) {
		assert(id, NAME + " - id not provided.");

		return await this.trelloRest.get(`${this.url}/${id}`, []);
	}

	/**
	 * Create a Checklist check item
	 * @see https://trello.readme.io/reference#page-1
	 * @param  {[type]}  args        Create Arguments
	 * @return {Promise}
	 */
	async createLabel(args) {
		assert(args, NAME + " - args not provided.");
		assert(args.name, NAME + " - args.name not provided.");
		assert(args.color, NAME + " - args.color not provided.");
		assert(args.idBoard, NAME + " - args.idBoard not provided.");

		if(args.color) {
			assert(VALID_LABEL_COLOR.includes(args.color), "Not A valid label color");
		}

		return await this.trelloRest.post(`${this.url}`, args);
	}

	/**
	 * Update a label on a board
	 * @see https://trello.readme.io/reference#id-1
	 * @param  {[type]}  id      Label ID
	 * @return {Promise}
	 */
	async updateLabel(id, args) {
		assert(id, NAME + " - id not provided.");
		assert(args, NAME + " - args not provided.");

		return await this.trelloRest.put(`${this.url}/${id}`, args);
	}

	/**
	 * Delete a label on a board
	 * @see https://trello.readme.io/reference#id-2
	 * @param  {[type]}  id      Label ID
	 * @return {Promise}
	 */
	async deleteLabel(id) {
		assert(id, NAME + " - id not provided.");

		return await this.trelloRest.delete(`${this.url}`, id);
	}

}
