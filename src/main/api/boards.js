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

		this.url = url + "/1/boards";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}

	/**
	 * Gets the board by ID and optional filters
	 * @see https://developers.trello.com/reference/#boardsboardid-1
	 *
	 * @param  {[type]}  board_id Board Id
	 * @param  {Array}   [args=[]] Optional Filters
	 */
	async get(id, args = []) {
		assert(id, NAME + " - id not provided.");

		return await this.trelloRest.get(`${this.url}/${id}`, args);
	}

	/**
	 * Create a board on trello
	 * @see https://developers.trello.com/reference/#boardsid
	 * @param  {object}  args Arguments to pass in
	 */
	async createBoard(args) {
		assert(args, NAME + " - args not provided.");
		assert(args.name, NAME + " - args.name not provided.");

		return await this.trelloRest.post(`${this.url}`, args);
	}

	/**
	 * Delete a board on trello
	 * @see https://developers.trello.com/reference/#boardsid-1
	 * @param  {string}  board_id Board Id
	 */
	async deleteBoard(id) {
		assert(id, NAME + " - id not provided.");

		return await this.trelloRest.delete(this.url, id);
	}

	/**
	 * Get the lists on the board
	 * @see https://developers.trello.com/reference/#boardsboardidlists
	 * @param  {string}  board_id Board Id
	 * @param  {Array}   [params=['fields=all']] [description]
	 */
	async getLists(board_id, params = ['fields=all']) {
		assert(board_id, NAME + " - board_id not provided.");

		return await this.trelloRest.get(`${this.url}/${board_id}/lists/open`, params);
	}

	/**
	 * Get all the labels defined on the board
	 * @see https://trello.readme.io/reference#boardsboardidlabels
	 * @param  {[type]}  board_id Board Id
	 */
	async getLabels(board_id, params = ['fields=all']) {
		assert(board_id, NAME + " - board_id not provided.");

		return await this.trelloRest.get(`${this.url}/${board_id}/labels`, params);
	}

}
