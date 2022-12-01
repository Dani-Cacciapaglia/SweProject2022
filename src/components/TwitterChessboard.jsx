import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { TwitterShareButton, TwitterIcon } from 'react-share';

const TwitterChessboard = () => {
  const [gameStatus, setGameStatus] = useState({
    gameId: null,
    lastMoveLegal: true,
    gameOver: true,
    gameResult: '',
    turn: '',
    fen: '',
  });

  function createGame() {
    fetch(`${window.$apiUrl}/chess/games/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

  function onDrop(sourceSquare, targetSquare, piece) {
    // do not pick up pieces if the game is over
    if (gameStatus.gameOver) return false;

    // only pick up pieces for the side to move
    if (
      (gameStatus.turn === 'w' && piece.search(/^b/) !== -1) ||
      (gameStatus.turn === 'b' && piece.search(/^w/) !== -1)
    ) {
      return false;
    }

    //check promotion
    let promotion = null;
    if (
      (piece === 'wP' && targetSquare[1] === '8') ||
      (piece === 'bP' && targetSquare[1] === '1')
    )
      promotion = 'q';

    playMove(sourceSquare, targetSquare, promotion);
  }

  async function playMove(from, to, promotion) {
    let move = {
      from: from,
      to: to,
    };

    if (promotion != null) move['promotion'] = promotion;

    let response = await fetch(
      `${window.$apiUrl}/chess/games/${gameStatus.gameId}/move`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(move),
      }
    );
    if (!response.ok) return false;
    const gs = await response.json();
    setGameStatus(gs);

    return gs.lastMoveLegal;
  }

  async function playTwitterMove() {
    let response;
    let tweetReplays;

    response = await fetch(
      `${window.$apiUrl}/search/%23chessGame${gameStatus.gameId}`
    );
    if (!response.ok) return;
    const tweets = await response.json();
    if (tweets.length === 0) return;

    /* I tweet sono orinati dal più recente al più vecchio. */
    const tweet = tweets[0];
    const tweetId = tweet.id;

    response = await fetch(
      `${window.$apiUrl}/search/conversation_id%3A${tweetId}`
    );
    if (!response.ok) return;
    tweetReplays = await response.json();
    if (tweetReplays.length === 0) return;

    let moveVotes = {};
    for (let i = 0; i < tweetReplays.length; i++) {
      const text = tweetReplays[i].text;
      const move = text.match(
        /[abcdefgh][12345678]-[abcdefgh][12345678](?:-q)?/
      );
      if (move != null) {
        if (!(move in moveVotes)) {
          moveVotes[move] = 0;
        }

        moveVotes[move] += 1;
      }
    }

    const moveVotesList = Object.keys(moveVotes).map((key) => {
      return [key, moveVotes[key]];
    });

    moveVotesList.sort((first, second) => {
      return second[1] - first[1];
    });

    for (let i = 0; i < moveVotesList.length; i++) {
      const fromToProm = moveVotesList[i][0].split('-');
      let promotion = null;
      if (fromToProm.length > 2) promotion = fromToProm[2];

      const success = await playMove(fromToProm[0], fromToProm[1], promotion);
      if (success) break;
    }
  }

  return (
    <div>
      <Chessboard position={gameStatus.fen} onPieceDrop={onDrop} />

      <div className="flex flex-row gap-2 pt-3 justify-center">
        <div className="flex items-center">
          <button
            className="border-2 border-sky-500 rounded-xl p-2 flex flex-row justify-center items-center gap-1"
            onClick={createGame}
          >
            Inizia partita
          </button>
        </div>

        <TwitterShareButton
          title={'Commenta con la prossima mossa!\n Visualizza la posizione: '}
          url={`https://fen2png.com/api/?fen=${encodeURIComponent(
            gameStatus.fen
          )} \n\n`}
          hashtags={[`chessGame${gameStatus.gameId}`]}
          disabled={gameStatus.gameOver}
        >
          <div className="border-2 border-sky-500 rounded-xl p-2 flex flex-row justify-center items-center gap-1">
            <TwitterIcon size={32} round={true} />
            <span>Condividi con Twitter</span>
          </div>
        </TwitterShareButton>

        <div className="flex items-center">
          <button
            className="border-2 border-sky-500 rounded-xl p-2 flex flex-row justify-center items-center gap-1 disabled:opacity-60"
            onClick={playTwitterMove}
            disabled={gameStatus.gameOver}
          >
            <span>Mossa da Twitter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwitterChessboard;
