describe('Check if chess works', () => {
	it('passes', async () => {

		let gameId;
		let response;

		/* check game creation */
		response = await cy.request('POST', '/api/chess/games');

		expect(response.status).to.eq(200);
		expect(response.body).to.have.property('gameId');
		gameId = response.body.gameId.toString();

		expect(response.body).to.have.property('lastMoveLegal');
		expect(response.body.lastMoveLegal).to.be.true;
		expect(response.body).to.have.property('gameOver');
		expect(response.body.gameOver).to.be.false;
		expect(response.body).to.have.property('gameResult');
		expect(response.body.gameResult).to.eq('u');
		expect(response.body).to.have.property('fen');
		expect(response.body).to.have.property('turn');
		expect(response.body.turn).to.eq('w');

		/* try to play a move in a game that not exist */
		cy.request({
			method: 'POST',
			url: '/api/chess/games/BADGAMEID/move',
			failOnStatusCode: false
		}).then((response) => {
			expect(response.status).to.eq(400);
		});

		/* play a random game */
		let whiteMoves = [ ["e2", "e4"], ["d1", "h5"], ["f1", "c4"] ];
		let blackMoves = [ ["e7", "e5"], ["b8", "c6"], ["b7", "b5"] ];

		for (let i = 0; i < whiteMoves.length; i++) {
			cy.request(
				'POST', 
				`/api/chess/games/${gameId}/move`, 
				{ "from": whiteMoves[i][0], "to": whiteMoves[i][1] }
			)
			.then((response) => {
				expect(response.status).to.eq(200);

				expect(response.body).to.have.property('gameId');
				expect(response.body.gameId).to.eq(gameId);

				expect(response.body).to.have.property('lastMoveLegal');
				expect(response.body.lastMoveLegal).to.be.true;

				expect(response.body).to.have.property('gameOver');
				expect(response.body.gameOver).to.false;

				expect(response.body).to.have.property('gameResult');
				expect(response.body.gameResult).to.eq('u');

				expect(response.body).to.have.property('fen');
				expect(response.body).to.have.property('turn');
				expect(response.body.turn).to.eq('b');
			});

			cy.request(
				'POST', 
				`/api/chess/games/${gameId}/move`, 
				{ "from": blackMoves[i][0], "to": blackMoves[i][1] }
			)
			.then((response) => {
				expect(response.status).to.eq(200);

				expect(response.body).to.have.property('gameId');
				expect(response.body.gameId).to.eq(gameId);

				expect(response.body).to.have.property('lastMoveLegal');
				expect(response.body.lastMoveLegal).to.be.true;

				expect(response.body).to.have.property('gameOver');
				expect(response.body.gameOver).to.false;

				expect(response.body).to.have.property('gameResult');
				expect(response.body.gameResult).to.eq('u');

				expect(response.body).to.have.property('fen');
				expect(response.body).to.have.property('turn');
				expect(response.body.turn).to.eq('w');
			});
		}

		/* white to move, play some bad move */

		cy.request({
			method: 'POST',
			url: `/api/chess/games/${gameId}/move`,
			body: { "to": "e2" },
			failOnStatusCode: false

		}).then((response) => {
			expect(response.status).to.eq(400);
		});

		cy.request({
			method: 'POST',
			url: `/api/chess/games/${gameId}/move`,
			body: { "from": "e2" }, 
			failOnStatusCode: false
		}).then((response) => {
			expect(response.status).to.eq(400);
		});
		 
		const BadMoves = [ ["h5", "h5"], ["a1", "h1"], ["e1", "f9"], ["d5", "z0"] ];

		for (const BadMove of BadMoves) {
			cy.request(
				'POST', 
				`/api/chess/games/${gameId}/move`, 
				{ "from": BadMove[0], "to": BadMove[1] }
			)
			.then((response) => {
				expect(response.status).to.eq(200);

				expect(response.body).to.have.property('gameId');
				expect(response.body.gameId).to.eq(gameId);

				expect(response.body).to.have.property('lastMoveLegal');
				expect(response.body.lastMoveLegal).to.be.false;

				expect(response.body).to.have.property('gameOver');
				expect(response.body.gameOver).to.false;

				expect(response.body).to.have.property('gameResult');
				expect(response.body.gameResult).to.eq('u');

				expect(response.body).to.have.property('fen');
				expect(response.body).to.have.property('turn');
				expect(response.body.turn).to.eq('w');
			});
		}

		/* white to move and checkmate */
		cy.request(
			'POST', 
			`/api/chess/games/${gameId}/move`, 
			{ "from": "h5", "to": "f7" }
		)
		.then((response) => {
			expect(response.status).to.eq(200);

			expect(response.body).to.have.property('gameId');
			expect(response.body.gameId).to.eq(gameId);

			expect(response.body).to.have.property('lastMoveLegal');
			expect(response.body.lastMoveLegal).to.be.true;

			expect(response.body).to.have.property('gameOver');
			expect(response.body.gameOver).to.true;

			expect(response.body).to.have.property('gameResult');
			expect(response.body.gameResult).to.eq('w');

			expect(response.body).to.have.property('fen');
			expect(response.body).to.have.property('turn');
			expect(response.body.turn).to.eq('b');
		});

	});
});
