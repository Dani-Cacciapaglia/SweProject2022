describe('Check if chess works', () => {
	it('passes', async () => {

		let gameId;
		let response;

		/* start a game that ends with a draw */
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

		let whiteMoves = [ ["h2", "h4"], ["h4", "h5"], ["h5", "h6"], ["h6", "g7"] ];
		let blackMoves = [ ["a7", "a5"], ["a5", "a4"], ["a4", "a3"], ["a3", "b2"] ];

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
		
		/* play promotion moves */
		cy.request(
			'POST', 
			`/api/chess/games/${gameId}/move`, 
			{ "from": "g7", "to": "h8", "promotion": "q" }
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
			{ "from": "b2", "to": "a1", "promotion": "q" }
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

		whiteMoves = [ ["g1", "f3"], ["f3", "g1"], ["g1", "f3"], ["f3", "g1"] ];
		blackMoves = [ ["g8", "f6"], ["f6", "g8"], ["g8", "f6"] ];

		for (let i = 0;; i++) {

			if (i == whiteMoves.length) break;
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

			if (i == blackMoves.length) break;
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

		/* draw by repetition  */
		cy.request(
			'POST', 
			`/api/chess/games/${gameId}/move`, 
			{ "from": "f6", "to": "g8" }
		)
		.then((response) => {
			expect(response.status).to.eq(200);

			expect(response.body).to.have.property('gameId');
			expect(response.body.gameId).to.eq(gameId);

			expect(response.body).to.have.property('lastMoveLegal');
			expect(response.body.lastMoveLegal).to.be.true;

			expect(response.body).to.have.property('gameResult');
			expect(response.body.gameResult).to.eq('d');

			expect(response.body).to.have.property('gameOver');
			expect(response.body.gameOver).to.be.true;

			expect(response.body).to.have.property('fen');
			expect(response.body).to.have.property('turn');
			expect(response.body.turn).to.eq('w');
		});

	});
});


