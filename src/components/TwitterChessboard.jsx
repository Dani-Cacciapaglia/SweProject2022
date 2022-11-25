import { useState } from 'react';
import { Chessboard } from 'react-chessboard';

const TwitterChessboard = () => {

  const [gameStatus, setGameStatus] = useState(
  	{
		'gameId': 0,
		'gameOver': true,
		'gameResult': '',
		'turn': '',
		'fen': ''
	});

	function createGame()
	{
		fetch('http://localhost:8000/api/chess/games/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then((res) => {
			if (!res.ok) throw new Error(`HTTP error: code ${res.status}`);
			return res.json();
		})
		.then((res) => {
			setGameStatus(res);
		})
		.catch((err) => {
			console.error(err);
		});
	}

	function onDrop(sourceSquare, targetSquare, piece)
	{
		// do not pick up pieces if the game is over
	  	if (gameStatus.gameOver) return false;

	  	// only pick up pieces for the side to move
	  	if ((gameStatus.turn === 'w' && piece.search(/^b/) !== -1) ||
			(gameStatus.turn === 'b' && piece.search(/^w/) !== -1)) {
			return false;
	  	}

		let move = {
			from: sourceSquare,
			to: targetSquare
		}

		//check promotion
		if (piece === 'wP' && targetSquare[1] === '8')
			move['promotion'] = 'q';
		else if (piece === 'bP' && targetSquare[1] === '1')
			move['promotion'] = 'q';

		fetch(`http://localhost:8000/api/chess/games/${gameStatus.gameId}/move`, {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(move)
		})
		.then((res) => {
			if (!res.ok) throw new Error(`HTTP error: code ${res.status}`);
			return res.json();
		})
		.then((res) => {
			setGameStatus(res);
		})
		.catch((err) => {
			console.error(err);
		});
	}


	
  return (
    <div>
      <Chessboard 
	  	position={gameStatus.fen}
		onPieceDrop={onDrop}
	  />
	  <button 
          className="rounded-full bg-neutral-200 hover:bg-neutral-300 aspect-square ml-2 p-2 self-center"
	  		onClick={createGame}
		>
	  	Inizia partita
	  </button>
    </div>
  );
};

export default TwitterChessboard;
