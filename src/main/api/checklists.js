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

		this.cardsUrl = url + "/1/cards";
		this.checklistUrl = url + "/1/checklists";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}

	/**
	 * Gets a checklist by card ID
	 * @see https://developers.trello.com/reference/#cardsidchecklists
	 * @param  {[type]}  cardId      Card ID
	 * @return {Promise}
	 */
	async getCheckLists(cardId) {
		assert(cardId, NAME + " - cardId not provided.");

		return await this.trelloRest.get(`${this.cardsUrl}/${cardId}/checklists`, []);
	}

	/**
	 * Creates a check lists
	 * @see https://developers.trello.com/reference/#cardsidchecklists-1
	 * @param  {[type]}  cardId      Card ID
	 * @param  {[type]}  args   		 Create Argumens
	 * @return {Promise}
	 */
	async createCheckList(cardId, args) {
		assert(cardId, NAME + " - cardId not provided.");
		assert(args, NAME + " - args not provided.");

		return await this.trelloRest.post(`${this.cardsUrl}/${cardId}/checklists`, args);
	}

	/**
	 * Deletes a Check List
	 * @see https://developers.trello.com/reference/#cardsidchecklistsidchecklist
	 * @param  {[type]}  cardId      Card ID
	 * @param  {[type]}  checklistId Check List ID
	 * @return {Promise}
	 */
	async deleteCheckList(cardId, checklistId) {
		assert(cardId, NAME + " - cardId not provided.");
		assert(checklistId, NAME + " - checklistId not provided.");

		return await this.trelloRest.delete(`${this.cardsUrl}/${cardId}/checklists`, checklistId);
	}


	//######################## Check Items ######################################

	/**
	 * Get a Check List Check Item by ID
	 * @see https://developers.trello.com/reference/#cardsidcheckitemidcheckitem
	 * @param  {[type]}  cardId      Card ID
	 * @param  {[type]}  checkItemId Check Item ID
	 * @return {Promise}
	 */
	async getCheckListItem(cardId, checkItemId) {
		assert(cardId, NAME + " - cardId not provided.");
		assert(checkItemId, NAME + " - checkItemId not provided.");

		return await this.trelloRest.get(`${this.cardsUrl}/${cardId}/checkItem/${checkItemId}`, []);
	}

	/**
	 * Create a Checklist check item
	 * @see https://developers.trello.com/reference/#checklistsidcheckitems
	 * @param  {[type]}  checkItemId Check Item ID
	 * @param  {[type]}  args        Create Arguments
	 * @return {Promise}
	 */
	async createCheckListItem(checkListId, args) {
		assert(checkListId, NAME + " - checkListId not provided.");
		assert(args, NAME + " - args not provided.");
		assert(args, NAME + " - args.name not provided.");

		return await this.trelloRest.post(`${this.checklistUrl}/${checkListId}/checkItems`, args);
	}

	/**
	 * Update a checklist check item
	 * @see https://developers.trello.com/reference/#cardsidcheckitemidcheckitem-1
	 * @param  {[type]}  cardId      Card ID
	 * @param  {[type]}  checkItemId Check Item ID
	 * @param  {[type]}  args        Update Arguments
	 * @return {Promise}
	 */
	async updateCheckListItem(cardId, checkItemId, args) {
		assert(cardId, NAME + " - cardId not provided.");
		assert(checkItemId, NAME + " - checkItemId not provided.");
		assert(args, NAME + " - args not provided.");

		return await this.trelloRest.put(`${this.cardsUrl}/${cardId}/checkItem/${checkItemId}`, args);
	}

	/**
	 * Delete a checklist check item from a card
	 * @see https://developers.trello.com/reference/#cardsidcheckitemidcheckitem-2
	 * @param  {[type]}  cardId      Card ID
	 * @param  {[type]}  checkItemId Check Item ID
	 * @return {Promise}
	 */
	async deleteCheckListItem(cardId, checkItemId) {
		assert(cardId, NAME + " - cardId not provided.");
		assert(checkItemId, NAME + " - checkItemId not provided.");

		return await this.trelloRest.delete(`${this.cardsUrl}/${cardId}/checkItem`, checkItemId);
	}

}
