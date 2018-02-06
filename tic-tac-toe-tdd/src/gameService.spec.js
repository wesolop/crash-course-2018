
import {expect} from 'chai';
import {gameStatus} from './gameService';

describe('Board Service', () => {
  describe('X should win', () => {
    it('for first row', () => {
      const board = [['X', 'X', 'X'], ['', '', ''], ['', '', '']];
      expect(gameStatus(board)).to.eq('X');
    });
    it('for second row', () => {
      const board = [['', '', ''], ['X', 'X', 'X'], ['', '', '']];
      expect(gameStatus(board)).to.eq('X');
    });
    it('for first column', () => {
      const board = [['X', '', ''], ['X', '', ''], ['X', '', '']];
      expect(gameStatus(board)).to.eq('X');
    });
    it('for first diagonal', () => {
      const board = [['X', '', ''], ['', 'X', ''], ['', '', 'X']];
      expect(gameStatus(board)).to.eq('X');
    });
    it('for second diagonal', () => {
      const board = [['', '', 'X'], ['', 'X', ''], ['X', '', '']];
      expect(gameStatus(board)).to.eq('X');
    });
  });
  it('should be a tie', () => {
    const board = [['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'O']];
    expect(gameStatus(board)).to.eq('-');
  });
});
