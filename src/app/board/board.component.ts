import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  public grid: any[][];
  public boardSize: number = 8;
  public queensOnBoard: any[]; // [A1, B8, G3... 8 queens total]
  public gameSuccess: boolean;

  constructor() { }

  ngOnInit(): void {
    this.newBoard();
  }

  newBoard() {
    this.grid = Array(this.boardSize).fill(null).map(() => Array(this.boardSize));
    this.queensOnBoard = [];
    this.gameSuccess = false;
  }

  checkGameSuccess() {
    if (this.queensOnBoard.length == 8) {
      this.gameSuccess = true;
      return;
    }

  }

  getRowLetter(row: number): string {
    return (row + 10).toString(36);
  }

  parseQueenPosition(position: string) {
    return [parseInt(position[0]), parseInt(position[1])];
  }

  placeQueen(row: number, col: number) {
    if (this.queensOnBoard.indexOf(`${row}${col}`) !== -1) {
      this.removeQueen(row, col);
      return;
    }

    if (this.isQueenSafe(row, col, this.queensOnBoard)) {
      this.queensOnBoard.push(`${row}${col}`);
      this.grid[row][col] = true;
      console.log(this.queensOnBoard);
      this.checkGameSuccess();
    }

  }

  removeQueen(row: number, col: number) {
    let index = this.queensOnBoard.indexOf(`${row}${col}`);

    if (index > -1) {
      this.queensOnBoard.splice(index, 1);
      this.grid[row][col] = false;
    }

  }


  isQueenSafe(row: number, col: number, queensOnBoard) {
    return this.checkIfHorizontalValid(row, queensOnBoard) && this.checkIfVerticalValid(col, queensOnBoard) && this.checkIfDiagonalValid(row, col, queensOnBoard);
  }

  checkIfHorizontalValid(row: number, queensOnBoard): boolean {
    for (let i = 0; i < queensOnBoard.length; i++) {
      if (queensOnBoard[i][0] == row) {
        return false

      }
    }
    return true

  }

  checkIfVerticalValid(col: number, queensOnBoard) {
    for (let i = 0; i < queensOnBoard.length; i++) {
      if (queensOnBoard[i][1] == col) {
        return false

      }

    }
    return true

  }

  checkIfDiagonalValid(row: number, col: number, queensOnBoard) {
    //abs(Q1.row - Q2.row) == abs(Q1.col - Q2.col)

    for (let i = 0; i < queensOnBoard.length; i++) {
      let position = queensOnBoard[i];
      let positionRow = parseInt(position[0]);
      let positionCol = parseInt((position[1]));

      if (Math.abs(positionRow - row) == Math.abs(positionCol - col)) {
        return false;
      }

    }
    return true;

  }

}
