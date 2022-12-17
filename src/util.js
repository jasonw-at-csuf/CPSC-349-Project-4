/**
 * Utility function to map 2d array indices to a 1d array. Given the number of
 * columns and the 2d array index to map, returns the index of the
 * element in the 1d array
 */
export function index2d(i, j) {
  return 3 * i + j;
}

/**
 * The inverse function of index2d(), given the index on a 1d array and the
 * number of columns, return its index in the 2d array as a tuple
 */
export function index1d(x) {
  const i = Math.floor(x / 3);
  const j = x % 3;
  return [i, j];
}

/**
 * Checks whether a given board is in a winning state
 * @param board
 * @returns 'X' or 'O' if either is the winner, null otherwise
 */
export function checkWin(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }

  // Check diagonals
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }

  // No win found
  return null;
}

/**
 * Checks if a given board is filled (contains no empty strings)
 * @param board
 * @returns true if the there exists no empty space in the board false otherwise
 */
export function isFilled(board) {
  return board.map((e) => e.some((e) => e == "")).every((e) => e == false);
}

/**
 * Creates a 2d matrix of n*n dimensions with initial values
 * @param n
 * @param initial (Optional) default = ""
 * @returns
 */
export function create2d(n, initial = "") {
  return [...Array(n)].map((_) => Array(n).fill(initial));
}
