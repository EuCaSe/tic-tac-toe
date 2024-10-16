import React, { useState } from 'react';
import './App.css'; // Make sure to import the CSS file

function App() {
  const initialBoard = Array(3).fill(null).map(() => Array(3).fill(''));
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (board[row][col] === '' && !winner) {
      const newBoard = board.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? player : c))
      );
      setBoard(newBoard);
      checkWinner(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  // Check for winner or draw
  const checkWinner = (board) => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0]) {
        setWinner(board[i][0]);
        return;
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i]) {
        setWinner(board[0][i]);
        return;
      }
    }
    if (
      (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0]) ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2])
    ) {
      setWinner(board[0][0]);
      return;
    }

    if (board.flat().every(cell => cell)) {
      setWinner('Draw');
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setPlayer('X');
  };

  return (
    <div className="game">
      <h2>Tic-Tac-Toe</h2>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <button key={j} className="cell" onClick={() => handleClick(i, j)}>
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <div>
          <h3 className="result">{winner === 'Draw' ? 'It\'s a draw!' : `Winner: ${winner}`}</h3>
          <button className="play-again" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
