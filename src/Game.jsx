import PocketBase from "pocketbase";
import { useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";

import { GameSquare } from "./GameSquare";
import "./index.css";
import { checkWin, create2d, index1d, isFilled } from "./util";

const pb = new PocketBase("https://cpsc349project4.fly.dev");

const authData = await pb
  .collection("users")
  .authWithPassword("email@email.com", "poggers123");

console.log(pb.authStore.isValid);
console.log(pb.authStore.token);
console.log(pb.authStore.model.id);
console.log(pb.authStore.model);

export function Game() {
  const [board, setBoard] = useState(create2d(3));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const updateBoard = (i, j, newItem) => {
    let copy = [...board];
    copy[i][j] = newItem;
    setBoard(copy);
    return copy;
  };

  const toggleTurn = () => {
    const newTurn = turn == "O" ? "X" : "O";
    setTurn(newTurn);
    return newTurn;
  };

  const updateTile = async (i, j) => {
    const gameState = await getGameState();
    if (turn == "X" && gameState.player_1[0] != pb.authStore.model.id) return;
    if (turn == "O" && gameState.player_2[0] != pb.authStore.model.id) return;
    if (!isFilled(board) && winner == null && !board[i][j]) {
      const newBoard = updateBoard(i, j, turn);
      const win = checkWin(board);
      setWinner(checkWin(board));
      if (win) alert(`${win} is the winner`);
      else if (isFilled(board)) alert("Tie");
      else {
        const newTurn = toggleTurn();
        await uploadGameState(newBoard, newTurn);
      }
    }
  };

  const resetGame = async () => {
    setTurn("X");
    setWinner(null);
    setBoard(create2d(3));
    await uploadGameState(create2d(3), "X");
  };

  const uploadGameState = async (board, turn) => {
    await pb.collection("games").update("3h8eqcyy8hklsx1", {
      turn: turn,
      board_state: JSON.stringify(board),
    });
  };

  const getGameState = async () => {
    return await pb.collection("games").getOne("3h8eqcyy8hklsx1", {
      turn: turn,
      board_state: JSON.stringify(board),
    });
  };

  useEffect(() => {
    pb.collection("games").subscribe("3h8eqcyy8hklsx1", function (e) {
      setBoard(JSON.parse(e.record.board_state));
      setTurn(e.record.turn);
    });
  }, []);

  return (
    <div className="flex justify-center items-center content-center h-screen bg-cyan-700">
      <div className="bg-amber-100 outline outline-amber-900 outline-8 text-center w-5/6 sm:w-2/3">
        <div className="flex justify-center content-center">
          <div className="w-64 grid grid-cols-3 gap-2 grid-rows-3 m-4">
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              TIC
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              X
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              O
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              O
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              TAC
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              X
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              X
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              O
            </p>
            <p className="outline outline-amber-900 rounded font-bold text-3xl">
              TOE
            </p>
          </div>
        </div>
        <br />
        {/* <!-- Game Instructions --> */}
        <div className="flex flex-col items-center">
          <p className="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
            Authenticated as: {pb.authStore.model.name}
          </p>
          <p className="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
            Tap a box to start the game
          </p>
          <p className="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
            Current Player: <span id="currentPlayer">{turn}</span>
          </p>
        </div>

        {/* <!-- 3*3 grid of Boxes --> */}
        <div className="flex justify-center">
          <div id="game-grid" className="grid grid-cols-3 w-96 content-center">
            {[...Array(9).keys()].map((e) => {
              const [i, j] = index1d(e);
              const square = (
                <GameSquare
                  key={e}
                  onClick={() => {
                    updateTile(i, j);
                  }}
                >
                  {board[i][j]}
                </GameSquare>
              );
              return square;
            })}
          </div>
        </div>

        {/* <!-- Grid end here  --> */}
        <br />
        {/* <!-- Button to reset game --> */}
        <button
          id="but"
          className="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white py-2 px-4 border border-amber-900 hover:border-transparent rounded"
          onClick={async () => {
            await resetGame();
          }}
        >
          RESET
        </button>

        <br />
        <br />
        {/* <!-- Space to show player turn --> */}
        <p id="DisplayMessage"></p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
