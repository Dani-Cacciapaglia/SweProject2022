import React, { useState } from 'react';

import { Chessboard } from 'react-chessboard';
import Chess from 'chess.js';

export const ChessTab = () => {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    // attempt move
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
    });

    // illegal move made
    if (move === null) return false; // valid move made, make computer move
    return true;
  }

  return (
    <div>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
};
