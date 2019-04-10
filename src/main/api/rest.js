'use strict';

const fetch = require('node-fetch');
const assert = require('assert');
const base64 = require('base-64');
const querystring = require('querystring');

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
	constructor(trelloKey, trelloToken) {

		assert(trelloKey, NAME + " - trelloKey not provided.");
		assert(trelloToken, NAME + " - trelloToken not provided.");

		this.trelloKey = trelloKey;
		this.trelloToken = trelloToken;
	}

	async get(url, params) {

		assert(url, NAME + " - url not provided.");
		assert(params, NAME + " - params not provided.");

		params.push('key=' + this.trelloKey);
		params.push('token=' + this.trelloToken);

		var _options = {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			let _response = await fetch(url + "?" + params.join('&'), _options);

			try {
				let _json = await _response.json();
				return _json;
			} catch(error) {
				console.log("Request [GET]:", url + "?" + params.join('&'));
				console.log("Response:", _response);
				throw error;
			}

		} catch(error) {
			console.error(NAME + " - " + error);
			throw error;
		}
	}

	async post(url, args) {

		assert(url, NAME + " - url not provided.");
		assert(args, NAME + " - args not provided.");

		args.key = this.trelloKey;
		args.token = this.trelloToken;

		let post_data = querystring.stringify(args);

		var _options = {
			method: 'POST',
			body: post_data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': post_data.length
			}
		};

		try {
			let _response = await fetch(url, _options);

			try {
				let _json = await _response.json();
				return _json;
			} catch(error) {
				console.log("Request [POST]:", url, post_data);
				console.log("Response:", _response);
				throw error;
			}

		} catch(error) {
			console.error(NAME + " - " + error);
			throw error;
		}

	}

	async put(url, args) {
		assert(url, NAME + " - url not provided.");
		assert(args, NAME + " - args not provided.");

		args.key = this.trelloKey;
		args.token = this.trelloToken;

		let post_data = querystring.stringify(args);
		var _options = {
			method: 'PUT',
			body: post_data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': post_data.length
			}
		};

		try {
			let _response = await fetch(`${url}`, _options);

			try {
				let _json = await _response.json();
				return _json;
			} catch(error) {
				console.log("Request [PUT]:", url, post_data);
				console.log("Response:", _response);
				throw error;
			}

		} catch(error) {
			console.error(NAME + " - " + error);
			throw error;
		}
	}

	async delete(url, id) {

		assert(url, NAME + " - url not provided.");

		var params = [];
		params.push('key=' + this.trelloKey);
		params.push('token=' + this.trelloToken);

		var _options = {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
			},
		};

		let _url = id ? `${url}/${id}?${params.join('&')}` : `${url}?${params.join('&')}`;

		try {
			let _response = await fetch(_url, _options);

			try {
				let _json = await _response.json();
				return _json;
			} catch(error) {
				console.log("Request [DELETE]:", _url);
				console.log("Response:", _response);
				throw error;
			}

		} catch(error) {
			console.error(NAME + " - " + error);
			throw error;
		}
	}

}
