type Player = 1 | 2;
type Cell = Player | null;
type Row = Cell[];
type Columns = Cell[];
type Diagonals = Cell[];
type Board = Row[];

let initialBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getDiagonals(board: Board): Diagonals[] {
  return [board.map((row, y) => row[y]), board.map((row, y) => row[2 - y])];
}
function getColumns(board: Board): Columns[] {
  return board.map((row, y) => row.map((_, x) => board[x][y]));
}
function getRows(board: Board): Row[] {
  return board;
}

function getOwner(cells: Cell[]): Player | null {
  return cells.every((cell) => cell !== null && cell === cells[0])
    ? cells[0]
    : null;
}

function getWinner(board: Board): Player | null {
  const diagonals = getDiagonals(board);
  const columns = getColumns(board);
  const rows = getRows(board);
  return [...diagonals, ...columns, ...rows].reduce<Player | null>(
    (winner, cells) => {
      return winner || getOwner(cells);
    },
    null
  );
}

function isEven(n: number): boolean {
  return n % 2 === 0;
}

function getNextPlayer(board: Board): Player {
  const getEmptyCellCount = (row: Row): number =>
    row.filter((cell) => cell === null).length;

  const emptyCellsCount = board.reduce(
    (sum, row) => sum + getEmptyCellCount(row),
    0
  );

  return isEven(emptyCellsCount) ? 2 : 1;
}

function play(board: Board, x: number, y: number): Board {
  if (!getWinner(board) && !board[y][x]) {
    return board.map((row, rowY) =>
      rowY === y
        ? row.map((cell, cellX) => (cellX === x ? getNextPlayer(board) : cell))
        : row
    );
  }
  return board;
}

let board = initialBoard
let i = 0

document.querySelectorAll('.event').forEach(item => {
  item.addEventListener('click', event => {
    if (item.classList.contains("event") == true && getWinner(board) == null) {

      var id = item.id;
      var x = parseInt(id.substr(0, 1))
      var y = parseInt(id.substr(1, 1))
      board = play(board, x, y)
      if (getNextPlayer(board) === 2) {
        item.classList.add("croix")
      } else {
        item.classList.add("rond")
      }
      item.classList.remove("event");
      console.log(board)
      console.log(getWinner(board))
      if (getWinner(board) != null) {
        document.querySelectorAll('.event').forEach(item => {
          item.classList.remove("event")
        })
      }

      if (getWinner(board) === 1) {
        document.getElementsByClassName('victory')[0].classList.add("active")
        document.getElementsByClassName('restart')[0].classList.add("active")
        document.getElementsByClassName('victory-player')[0].textContent = "X"
      }

      if (getWinner(board) === 2) {
        document.getElementsByClassName('victory')[0].classList.add("active")
        document.getElementsByClassName('restart')[0].classList.add("active")
        document.getElementsByClassName('victory-player')[0].textContent = "0"
      }
      if (i === 8 && getWinner(board) == null) {
        console.log("draw")
        document.getElementsByClassName('draw')[0].classList.add("active")
        document.getElementsByClassName('restart')[0].classList.add("active")
      }
    }

    i++
    console.log(i)
  })

})
