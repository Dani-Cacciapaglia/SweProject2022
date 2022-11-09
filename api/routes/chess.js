const { Chess } = require('chess.js');
const express = require('express');
const router = express.Router();

let matches = {};
let id = 0;


router.get('/games/newGame', async (req, res) => {
	try {
		const newMatch = new Chess();
		const newMatchID = id;
		id += 1;
		matches[newMatchID] = newMatch;

		const matchInfo = { 
			'gameID': newMatchID
		};
	
		res.status(200).send(matchInfo);
	}
	catch (err) {
		res.status(400).send(err);
	}
});

router.post('/games/:gameID/makeMove', async (req, res) => {
	try {
		const gameID  = req.params.gameID;
		if (!gameID in matches) 
			throw new Error(`Game with id: ${gameID} not exist`);
		if (!('from' in req.body)) 
			throw new Error('Missing "from" field in request body');
		if (!('to' in req.body)) 
			throw new Error('Missing "to" field in request body');

		const turn = matches[gameID].turn();

		let moveObject = {
			'from': req.body.from,
			'to': req.body.to,
		};

		if ('promotion' in req.body)
			moveObject['promotion'] = req.body.promotion;

		const lastMove = matches[gameID].move(moveObject);
		const gameOver = matches[gameID].isGameOver();
		const fen      = matches[gameID].fen();

		const responseData = {
			'lastMoveLegal': true,
			'gameOver': gameOver,
			'gameResult': 'u', 
			'fen': fen
		};

		if (gameOver) {
			if (matches[gameID].isDraw()) {
				responseData['gameResult'] = 'd';
			}
			else if (matches[gameID].isCheckmate()) {
				responseData['gameResult'] = turn;
			}

			//close game
			delete matches[gameID];
		}

		if (lastMove === null) 
			responseData['lastMoveLegal'] = false;

		res.status(200).send(responseData);
	}
	catch (err) {
		res.status(400).send({ 'error': err.message });
	}
});

module.exports = router;

