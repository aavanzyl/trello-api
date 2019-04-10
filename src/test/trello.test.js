const test = require('tape');
const http = require('http-debug').http;
const assert = require('assert');

http.debug = 0; // 1 debug, 2 verbose

const Trello = require('../main');

//##################### Global Config ############
const BOARD_CLIENT_ID = "<board>";
const BOARD_DEVELOPER_ID = "<board>";

const options = {
	trelloKey: "<key>",
	trelloToken: "<token>",
};


let _trello = new Trello(options);

//##################### Tests ####################
test('Test Trello - Boards', async function(tape) {
	try {

		let _board = await _trello.boards.createBoard({
			name: "Trello Test Board",
			idBoardSource: BOARD_DEVELOPER_ID
		});

		let _get_board = await _trello.boards.get(BOARD_CLIENT_ID);
		assert(BOARD_CLIENT_ID === _get_board.id, `Id does not match [expected=${BOARD_CLIENT_ID};received=${_get_board.id}]`);

		await _trello.boards.deleteBoard(_board.id);
	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Lists ', async function(tape) {
	try {
		let _client_board = await _trello.boards.get(BOARD_CLIENT_ID);
		assert(_client_board.id === BOARD_CLIENT_ID, `Id does not match [expected=${BOARD_CLIENT_ID};received=${_client_board.id}]`);
		let _id = _client_board.id;

		let _lists = await _trello.boards.getLists(_id);

		let _list = await _trello.lists.get(_lists[0].id);
		let _cards = await _trello.lists.getCards(_list.id);

		let _new_list = await _trello.lists.createList({
			name: "Test List",
			idBoard: _id
		});

		await _trello.lists.renameList(_new_list.id, {
			value: "Test List Updated"
		});
		await _trello.lists.closeList(_new_list.id);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Cards ', async function(tape) {
	try {
		let _client_board = await _trello.boards.get(BOARD_CLIENT_ID);
		assert(_client_board.id === BOARD_CLIENT_ID, `Id does not match [expected=${BOARD_CLIENT_ID};received=${_client_board.id}]`);
		let _id = _client_board.id;

		let _lists = await _trello.boards.getLists(_id);
		let _list = _lists[0];

		let _card = {
			"name": 'Unit Test Card',
			"idList": _list.id,
			"idBoard": _id,
			"desc": 'This is a card created by the unit test',
		}

		let _created_card = await _trello.cards.createCard(_card);

		await _trello.cards.getCard(_created_card.id);
		await _trello.cards.moveCard(_created_card.id, _lists[1].id);

		//Label
		await _trello.cards.addCustomLabel(_created_card.id, "purple", "Important");

		//Comments
		let _comment = await _trello.cards.addComment(_created_card.id, "This is a test comment");
		let _comments = await _trello.cards.getComments(_created_card.id);
		assert(_comments.length === 1, `Comments is not correct number [expected=1;received=${_comments.length}]`);

		await _trello.cards.updateComment(_created_card.id, _comment.id, "This is a updated test comment");

		await _trello.cards.removeComment(_created_card.id, _comment.id);

		//Attachments
		let _attachment = await _trello.cards.addAttachment(_created_card.id, 'https://p4.zdassets.com/hc/settings_assets/72937/200125679/nr5RZWbmde1d9064leYIhQ-journeyapps_logo-600x150.png');
		let _attachments = await _trello.cards.getAttachment(_created_card.id);
		assert(_attachments.length === 1, `Attachments is not correct number [expected=1;received=${_attachments.length}]`);

		await _trello.cards.deleteAttachment(_created_card.id, _attachment.id);

		//Delete the card now
		await _trello.cards.deleteCard(_created_card.id);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Checklists ', async function(tape) {
	try {
		let _client_board = await _trello.boards.get(BOARD_CLIENT_ID);
		assert(_client_board.id === BOARD_CLIENT_ID, `Id does not match [expected=${BOARD_CLIENT_ID};received=${_client_board.id}]`);
		let _id = _client_board.id;

		let _lists = await _trello.boards.getLists(_id);

		let _list = _lists[0];

		let _created_card = await _trello.cards.createCard({
			"name": 'Unit Test Card',
			"idList": _list.id,
			"idBoard": _id,
			"desc": 'This is a card created by the unit test',
		});

		let _checklist = await _trello.checklists.createCheckList(_created_card.id, {});

		let _checklists = await _trello.checklists.getCheckLists(_created_card.id);
		assert(_checklists.length === 1, `Checklist is not correct number [expected=1;received=${_checklists.length}]`);

		let _checkItem = await _trello.checklists.createCheckListItem(_checklist.id, {
			name: "I wana be checked"
		});

		_checkItem = await _trello.checklists.getCheckListItem(_created_card.id, _checkItem.id);

		await _trello.checklists.updateCheckListItem(_created_card.id, _checkItem.id, {
			name: "I am checked",
			state: "complete"
		});

		await _trello.checklists.deleteCheckListItem(_created_card.id, _checkItem.id);

		await _trello.checklists.deleteCheckList(_created_card.id, _checklist.id);

		_checklists = await _trello.checklists.getCheckLists(_created_card.id);
		assert(_checklists.length === 0, `Checklist is not correct number [expected=0;received=${_checklists.length}]`);

		//Delete the card now
		// await _trello.cards.deleteCard(_created_card.id);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Labels ', async function(tape) {
	try {
		let _client_board = await _trello.boards.get(BOARD_CLIENT_ID);
		assert(_client_board.id === BOARD_CLIENT_ID, `Id does not match [expected=${BOARD_CLIENT_ID};received=${_client_board.id}]`);
		let _id = _client_board.id;

		let _lists = await _trello.boards.getLists(_id);

		let _list = _lists[0];

		let _card = {
			"name": 'Unit Test Card',
			"idList": _list.id,
			"idBoard": _id,
			"desc": 'This is a card created by the unit test',
		}

		let _created_card = await _trello.cards.createCard(_card);

		let _label = await _trello.labels.createLabel({
			name: "Test Label",
			color: "yellow",
			idBoard: _id
		});

		let _labels = await _trello.boards.getLabels(_id);

		_label = await _trello.labels.getLabel(_label.id);

		await _trello.labels.updateLabel(_label.id, {
			name: "Test Label Updated"
		});





		//Label
		await _trello.cards.addLabel(_created_card.id, _label.id);


		await _trello.labels.deleteLabel(_label.id);
		//Delete the card now
		await _trello.cards.deleteCard(_created_card.id);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Tokens ', async function(tape) {
	try {

		let _token = await _trello.tokens.getTokenInfo(options.trelloToken);
		let _token_member = await _trello.tokens.getTokenMember(options.trelloToken);
		let _token_webhooks = await _trello.tokens.getTokenWebhooks(options.trelloToken);

		assert(_token.id === '5a72b572c01b84323393ec60', `Id does not match [expected=5a72b572c01b84323393ec60;received=${_token.id}]`);
		assert(_token_member.id === _token.idMember, `Id does not match [expected=${_token.idMember};received=${_token_member.id}]`);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Webhooks ', async function(tape) {
	try {

		let _board = await _trello.boards.createBoard({
			name: "Trello Test Board",
			idBoardSource: BOARD_DEVELOPER_ID
		});

		let _web_hook = await _trello.webhooks.create({
			description: "This is a test webhook",
			callbackURL: "https://moove-testing.poweredbyjourney.com/webhook_trello_incomming",
			idModel: _board.id
		});

		_web_hook = await _trello.webhooks.get(_web_hook.id);

		await _trello.webhooks.update(_web_hook.id, {
			description: "This is a test webhook updated"
		});

		await _trello.webhooks.delete(_web_hook.id);

		await _trello.boards.deleteBoard(_board.id);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});

test('Test Trello - Members ', async function(tape) {
	try {

		let _token_member = await _trello.tokens.getTokenMember(options.trelloToken);

		let _member = await _trello.members.get(_token_member.id);
		assert(_member.email === 'anton@journeyapps.com', `Email does not match [expected=anton@journeyapps.com;received=${_member.email}]`);

		let _organization = await _trello.members.getOrganization(_token_member.id);

	} catch(err) {
		console.error(err);
		tape.fail(err);
	}
	tape.end();
});
