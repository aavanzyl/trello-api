'use strict';

const assert = require('assert');

const OAuth = require("./api/auth");
const TrelloBoards = require('./api/boards');
const TrelloCards = require('./api/cards');
const TrelloLists = require('./api/lists');
const TrelloTokens = require('./api/tokens');
const TrelloWebhooks = require('./api/webhooks');
const TrelloMembers = require('./api/members');
const TrelloOrganizations = require('./api/organizations');
const TrelloChecklists = require('./api/checklists');
const TrelloLabels = require('./api/labels');

/**
 * Name of the module
 * @type {String}
 */
const NAME = "trello-api";
const TRELLO_URL = 'https://api.trello.com';

/**
 * A Wrapping class for Trello API
 * @type {class}
 */
class Trello {

	/**
	 * Create a new Trello instance for handeling requests to trello.
	 * @param  {object} options     trelloKey and trelloToken
	 */
	constructor(options) {

		assert(options.trelloKey, NAME + " - options.trelloKey not provided.");
		assert(options.trelloToken, NAME + " - options.trelloToken not provided.");

		this.trelloKey = options.trelloKey;
		this.trelloToken = options.trelloToken;
		this.url = options.url || TRELLO_URL;
	}

	get boards() {
		return new TrelloBoards(this.url, this.trelloKey, this.trelloToken);
	}

	get cards() {
		return new TrelloCards(this.url, this.trelloKey, this.trelloToken);
	}

	get lists() {
		return new TrelloLists(this.url, this.trelloKey, this.trelloToken);
	}

	get tokens() {
		return new TrelloTokens(this.url, this.trelloKey, this.trelloToken);
	}

	get webhooks() {
		return new TrelloWebhooks(this.url, this.trelloKey, this.trelloToken);
	}

	get members() {
		return new TrelloMembers(this.url, this.trelloKey, this.trelloToken);
	}

	get organizations() {
		return new TrelloOrganizations(this.url, this.trelloKey, this.trelloToken);
	}

	get checklists() {
		return new TrelloChecklists(this.url, this.trelloKey, this.trelloToken);
	}

	get labels() {
		return new TrelloLabels(this.url, this.trelloKey, this.trelloToken);
	}

}

module.exports = Trello;
