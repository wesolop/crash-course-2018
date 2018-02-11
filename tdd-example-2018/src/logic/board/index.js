export default {
  getWinner(board) {
    if (board[0].every(cell => cell === 'X')) {
      return 'X';
    } else if (board[0].every(cell => cell === 'O')) {
      return 'O';
    }
    return null;
  },
};
