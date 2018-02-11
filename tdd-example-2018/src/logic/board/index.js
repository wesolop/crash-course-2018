export function getWinner(board) {
  if (board.some(boardRow => boardRow.every(cell => cell === 'X'))) {
    return 'X';
  } else if (board.some(boardRow => boardRow.every(cell => cell === 'O'))) {
    return 'O';
  }

  for (let col = 0; col < 3; col++) {
    if (board.every(boardRow => boardRow[col] === 'X')) {
      return 'X';
    }

    if (board.every(boardRow => boardRow[col] === 'O')) {
      return 'O';
    }
  }

  const diag1Wins = p => {
    return board[0][0] === p &&
        board[1][1] === p &&
        board[2][2] === p;
  };

  const diag2Wins = p => {
    return board[0][2] === p &&
        board[1][1] === p &&
        board[2][0] === p;
  };

  if (diag1Wins('X') || diag2Wins('X')) {
    return 'X';
  }

  if (diag1Wins('O') || diag2Wins('O')) {
    return 'O';
  }



  return null;
}

