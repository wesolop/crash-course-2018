import {getWinner} from './';
import {expect} from 'chai';

describe('getWinner', () => {
  const generateBoard = () => {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  };

  const winBoardOnRow = (board, rowIndex, winner) => {
    return board.map((row, otherRowIndex) => {
      if (otherRowIndex === rowIndex) {
        return [winner, winner, winner];
      } else {
        return row;
      }
    });
  };

  const winBoardOnColumn = (board, columnIndex, winner) => {
    return board.map(row => {
      return row.map((cell, otherColumnIndex) => {
        if (otherColumnIndex === columnIndex) {
          return winner;
        } else {
          return cell;
        }
      });
    });
  };

  it('should win with rows', () => {
    const board = generateBoard();

    expect(getWinner(winBoardOnRow(board, 0, 'X'))).to.be.equal('X');
    expect(getWinner(winBoardOnRow(board, 1, 'X'))).to.be.equal('X');
    expect(getWinner(winBoardOnRow(board, 2, 'X'))).to.be.equal('X');

    expect(getWinner(winBoardOnRow(board, 0, 'O'))).to.be.equal('O');
    expect(getWinner(winBoardOnRow(board, 1, 'O'))).to.be.equal('O');
    expect(getWinner(winBoardOnRow(board, 2, 'O'))).to.be.equal('O');
  });

  it('should win with column', () => {
    const board = generateBoard();

    expect(getWinner(winBoardOnColumn(board, 0, 'X'))).to.be.equal('X');
    expect(getWinner(winBoardOnColumn(board, 1, 'X'))).to.be.equal('X');
    expect(getWinner(winBoardOnColumn(board, 2, 'X'))).to.be.equal('X');

    expect(getWinner(winBoardOnColumn(board, 0, 'O'))).to.be.equal('O');
    expect(getWinner(winBoardOnColumn(board, 1, 'O'))).to.be.equal('O');
    expect(getWinner(winBoardOnColumn(board, 2, 'O'))).to.be.equal('O');
  });

  it('should win with column', () => {
    const diag1 = p => [
      [p, '', ''],
      ['', p, ''],
      ['', '', p]
    ];
    expect(getWinner(diag1('X'))).to.be.equal('X');
    expect(getWinner(diag1('O'))).to.be.equal('O');

    const diag2 = p => [
      ['', '', p],
      ['', p, ''],
      [p, '', '']
    ];
    expect(getWinner(diag2('X'))).to.be.equal('X');
    expect(getWinner(diag2('O'))).to.be.equal('O');


  });


});


