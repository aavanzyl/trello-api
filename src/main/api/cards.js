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

		this.url = url + "/1/cards";
		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;

		this.trelloRest = new TrelloRest(this.trelloKey, this.trelloToken);
	}

	async getCard(card_id, args) {
		assert(card_id, NAME + " - card_id not provided.");

		args = args || [];

		return await this.trelloRest.get(`${this.url}/${card_id}`, args);
	}

	async createCard(card) {

		assert(card, NAME + " - card not provided.");
		assert(card.name, NAME + " - card.name not provided.");
		assert(card.idList, NAME + " - card.idList not provided.");
		assert(card.idBoard, NAME + " - card.idBoard not provided.");

		return await this.trelloRest.post(this.url, card);
	}

	async updateCard(card_id, card) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(card, NAME + " - card not provided.");

		var _args = card;

		return await this.trelloRest.put(`${this.url}/${card_id}`, _args);
	}

	async moveCard(card_id, list_id) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(list_id, NAME + " - list_id not provided.");

		var _args = { idList: list_id };

		return await this.trelloRest.put(`${this.url}/${card_id}`, _args);
	}

	async deleteCard(id) {
		assert(id, NAME + " - id not provided.");
		return await this.trelloRest.delete(this.url, id);
	}

	//##################### Labels #####################

	/**
	 * Add a board label to a Cards
	 * @see https://trello.readme.io/reference#cardsididlabels
	 * @param  {[type]}  card_id  Card Id
	 * @param  {[type]}  label_id Board Label ID
	 * @return {Promise}
	 */
	async addLabel(card_id, label_id) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(label_id, NAME + " - label_id not provided.");

		var _args = {
			value: label_id
		};

		return await this.trelloRest.post(this.url + "/" + card_id + '/idLabels', _args);
	}

	async removeLabel(card_id, label_id) {
		assert(card_id, NAME + " - card_id not provided.");
		assert(label_id, NAME + " - label_id not provided.");

		return await this.trelloRest.delete(this.url + "/" + card_id + '/idLabels', label_id);
	}


	async addCustomLabel(card_id, color, label) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(label, NAME + " - label not provided.");

		if(color) {
			assert(VALID_LABEL_COLOR.includes(color), "Not A valid label color");
		}

		var _args = {
			color: color,
			name: label
		};

		return await this.trelloRest.post(this.url + "/" + card_id + '/labels', _args);

	}



	//##################### Comments #####################

	async getComments(card_id) {

		assert(card_id, NAME + " - card_id not provided.");

		return await this.trelloRest.get(`${this.url}/${card_id}/actions`, ['filter=commentCard']);
	}

	async addComment(card_id, text) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(text, NAME + " - text not provided.");

		var _args = {
			text: text
		};

		return await this.trelloRest.post(this.url + "/" + card_id + '/actions/comments', _args);
	}

	/**
	 * Update a comment actions
	 * @see https://trello.readme.io/reference#cardsidactionsidactioncomments
	 * @param  {[type]}  card_id    Card ID
	 * @param  {[type]}  comment_id Comment Action ID
	 * @param  {[type]}  text       Updated text to replace current text
	 * @return {Promise}
	 */
	async updateComment(card_id, comment_id, text) {
		assert(card_id, NAME + " - card_id not provided.");
		assert(comment_id, NAME + " - comment_id not provided.");

		let _args = {
			text: text
		};

		return await this.trelloRest.put(`${this.url}/${card_id}/actions/${comment_id}/comments`, _args);
	}

	/**
	 * Removes a comment on a cards
	 * @see https://trello.readme.io/reference#cardsidactionsidactioncomments-1
	 * @param  {[type]}  card_id    Card ID
	 * @param  {[type]}  comment_id Comment Action ID
	 * @return {Promise}
	 */
	async removeComment(card_id, comment_id) {
		assert(card_id, NAME + " - card_id not provided.");
		assert(comment_id, NAME + " - comment_id not provided.");

		return await this.trelloRest.delete(`${this.url}/${card_id}/actions/${comment_id}/comments`);
	}

	//##################### Attachments #####################

	async getAttachment(card_id) {

		assert(card_id, NAME + " - card_id not provided.");

		var _args = ["fields=all", "filter=false"];

		return await this.trelloRest.get(`${this.url}/${card_id}/attachments`, _args);
	}


	async addAttachment(card_id, attachment_url) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(attachment_url, NAME + " - attachment_url not provided.");

		var _args = {
			url: attachment_url
		};

		return await this.trelloRest.post(`${this.url}/${card_id}/attachments`, _args);
	}

	/**
	 * Delete a specific attachment
	 * @see https://trello.readme.io/reference#cardsidattachmentsidattachment-1
	 * @param  {[type]}  card_id       Card ID
	 * @param  {[type]}  attachment_id Attachment ID
	 * @return {Promise}
	 */
	async deleteAttachment(card_id, attachment_id) {

		assert(card_id, NAME + " - card_id not provided.");
		assert(attachment_id, NAME + " - attachment_id not provided.");

		return await this.trelloRest.delete(`${this.url}/${card_id}/attachments`, attachment_id);
	}



}
