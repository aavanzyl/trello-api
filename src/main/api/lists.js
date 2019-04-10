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

		this.url = url + "/1/lists";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}

	/**
	 * Get information about a list
	 * @see https://developers.trello.com/reference/#listsid
	 * @param  {[type]}  id [description]
	 * @return {Promise}    [description]
	 */
	async get(id) {
		assert(id, NAME + " - id not provided.");
		return await this.trelloRest.get(`${this.url}/${id}`, []);
	}

	/**
	 * Get the board a list is on
	 * @see https://developers.trello.com/reference/#listsidboard
	 * @param  {[type]}  id [description]
	 * @return {Promise}    [description]
	 */
	async getBoard(id) {
		assert(id, NAME + " - id not provided.");
		return await this.trelloRest.get(`${this.url}/${id}/board`, []);
	}

	/**
	 * Create a new list on a board
	 * @see https://developers.trello.com/reference/#lists-1
	 * @param  {object}  args Arguments to create the list with
	 */
	async createList(args) {

		assert(args, NAME + " - args not provided.");
		assert(args.name, NAME + " - args.name not provided.");
		assert(args.idBoard, NAME + " - args.idBoard not provided.");

		return await this.trelloRest.post(`${this.url}`, args);
	}

	/**
	 * Update a lists
	 * @see https://developers.trello.com/reference/#listsid-1
	 * @param  {string}  id   ID of the trello list
	 * @param  {object}  args Arguments possible on list update
	 */
	async update(id, args) {
		assert(id, NAME + " - id not provided.");
		assert(args, NAME + " - args not provided.");

		return await this.trelloRest.put(`${this.url}/${id}`, args);
	}

	/**
	 * Update List Position
	 * @see https://developers.trello.com/reference/#listsidpos
	 * @param  {string}  id   ID of the trello list
	 * @param  {object}  args Arguments possible on list update
	 */
	async updatePos(id, args) {
		assert(id, NAME + " - id not provided.");
		assert(args, NAME + " - args not provided.");
		assert(args.value, NAME + " - args.value not provided.");

		return await this.trelloRest.put(`${this.url}/${id}/pos`, args);
	}

	/**
	 * Rename a list
	 * @see https://developers.trello.com/reference/#listsidname
	 * @param  {string}  id   ID of the trello list
	 * @param  {object}  args Arguments possible on list update
	 */
	async renameList(id, args) {
		assert(id, NAME + " - id not provided.");
		assert(args, NAME + " - args not provided.");
		assert(args.value, NAME + " - args.value not provided.");

		return await this.trelloRest.put(`${this.url}/${id}/name`, args);
	}

	/**
	 * Archive or unarchive a list
	 * @see https://developers.trello.com/reference/#listsidclosed
	 * @param  {string}  id   ID of the trello list
	 * @param  {Boolean} [close=true] (Optional) should set state closed
	 */
	async closeList(id, close = true) {
		assert(id, NAME + " - id not provided.");
		return await this.trelloRest.put(`${this.url}/${id}/closed`, {
			value: close
		});
	}

	/**
	 * Subscribe or unsubscribe from a list
	 * @see https://developers.trello.com/reference/#listsidsubscribed
	 * @param  {string}  id   ID of the trello list
	 * @param  {Boolean} [subscribe=true] Should subscribe/unsubscribe
	 */
	async closeList(id, subscribe = true) {
		assert(id, NAME + " - id not provided.");
		return await this.trelloRest.put(`${this.url}/${id}/subscribed`, {
			value: subscribe
		});
	}

	/**
	 * List the cards in a list
	 * @see https://developers.trello.com/reference/#listsidcards
	 * @param  {string}  id   ID of the trello list
	 * @param  {[type]}  params (optional) Defaults to all fields, including attachments and comments.
	 */
	async getCards(id, params) {
		assert(id, NAME + " - id not provided.");
		var _params = params || [
			'fields=all',
			'attachments=true',
			'actions=commentCard'
		];
		return await this.trelloRest.get(`${this.url}/${id}/cards`, _params);
	}

	/**
	 * Atchive all Cards in a lists
	 * @see https://developers.trello.com/reference/#listsidarchiveallcards
	 * @param  {string}  id   ID of the trello list
	 */
	async archiveAllCards(id) {
		assert(id, NAME + " - id not provided.");

		return await this.trelloRest.post(`${this.url}/${id}/archiveAllCards`, args);
	}

	/**
	 * Move all cards in a list
	 * @see https://developers.trello.com/reference/#listsidmoveallcards
	 * @param  {string}  id   ID of the trello list
	 */
	async moveAllCards(id, args) {
		assert(id, NAME + " - id not provided.");
		assert(args, NAME + " - args not provided.");
		assert(args.idBoard, NAME + " - args.idBoard not provided.");
		assert(args.idList, NAME + " - args.idList not provided.");

		return await this.trelloRest.post(`${this.url}/${id}/moveAllCards`, args);
	}

}
