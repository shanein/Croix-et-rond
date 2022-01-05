var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
function getDiagonals(board) {
    return [board.map(function (row, y) { return row[y]; }), board.map(function (row, y) { return row[2 - y]; })];
}
function getColumns(board) {
    return board.map(function (row, y) { return row.map(function (_, x) { return board[x][y]; }); });
}
function getRows(board) {
    return board;
}
function getOwner(cells) {
    return cells.every(function (cell) { return cell !== null && cell === cells[0]; })
        ? cells[0]
        : null;
}
function getWinner(board) {
    var diagonals = getDiagonals(board);
    var columns = getColumns(board);
    var rows = getRows(board);
    return __spreadArray(__spreadArray(__spreadArray([], diagonals, true), columns, true), rows, true).reduce(function (winner, cells) {
        return winner || getOwner(cells);
    }, null);
}
function isEven(n) {
    return n % 2 === 0;
}
function getNextPlayer(board) {
    var getEmptyCellCount = function (row) {
        return row.filter(function (cell) { return cell === null; }).length;
    };
    var emptyCellsCount = board.reduce(function (sum, row) { return sum + getEmptyCellCount(row); }, 0);
    return isEven(emptyCellsCount) ? 2 : 1;
}
function play(board, x, y) {
    if (!getWinner(board) && !board[y][x]) {
        return board.map(function (row, rowY) {
            return rowY === y
                ? row.map(function (cell, cellX) { return (cellX === x ? getNextPlayer(board) : cell); })
                : row;
        });
    }
    return board;
}
var board = initialBoard;
var i = 0;
document.querySelectorAll('.event').forEach(function (item) {
    item.addEventListener('click', function (event) {
        if (item.classList.contains("event") == true && getWinner(board) == null) {
            var id = item.id;
            var x = parseInt(id.substr(0, 1));
            var y = parseInt(id.substr(1, 1));
            board = play(board, x, y);
            if (getNextPlayer(board) === 2) {
                item.classList.add("croix");
            }
            else {
                item.classList.add("rond");
            }
            item.classList.remove("event");
            console.log(board);
            console.log(getWinner(board));
            if (getWinner(board) != null) {
                document.querySelectorAll('.event').forEach(function (item) {
                    item.classList.remove("event");
                });
            }
            if (getWinner(board) === 1) {
                document.getElementsByClassName('victory')[0].classList.add("active");
                document.getElementsByClassName('restart')[0].classList.add("active");
                document.getElementsByClassName('victory-player')[0].textContent = "X";
            }
            if (getWinner(board) === 2) {
                document.getElementsByClassName('victory')[0].classList.add("active");
                document.getElementsByClassName('restart')[0].classList.add("active");
                document.getElementsByClassName('victory-player')[0].textContent = "0";
            }
            if (i === 8 && getWinner(board) == null) {
                console.log("draw");
                document.getElementsByClassName('draw')[0].classList.add("active");
                document.getElementsByClassName('restart')[0].classList.add("active");
            }
        }
        i++;
        console.log(i);
    });
});
//# sourceMappingURL=script.js.map