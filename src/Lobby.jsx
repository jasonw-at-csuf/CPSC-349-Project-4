import PocketBase from "pocketbase";
import React, { useState } from "react";

import { create2d } from "./util";

export const Lobby = () => {
  const pb = new PocketBase("https://cpsc349project4.fly.dev");
  const [roomId, setRoomId] = useState("");

  const createRoom = async (e) => {
    const game = await pb.collection("games").create({
      board_state: JSON.stringify(create2d(3)),
      player_1: [pb.authStore.model.id],
      turn: "X",
    });
    //go to gameboard after creating room
    window.location.href = `game.html?gameId=${game.id}`;
  };

  //Join room btn
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //if this works go to gameboard
      const game = await pb.collection("games").getOne(roomId);
      console.debug(`Joining room ${game.id}`);
      console.log(game);
      // room is not full
      if (
        game.player_2.length == 0 ||
        game.player_1[0] == pb.authStore.model.id
      ) {
        // check if player isnt already player 1
        if (game.player_1[0] != pb.authStore.model.id) {
          await pb.collection("games").update(game.id, {
            player_2: [pb.authStore.model.id],
          });
        }
        window.location.href = `game.html?gameId=${game.id}`;
      } else throw Error("Room is full");
    } catch (error) {
      alert(`An error occured while joining room: ${error}`);
    }
  };

  return (
    <div className="bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 flex flex-col justify-center items-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <p className="text-m font-bold outline rounded outline-amber-900 w-64 my-5">
          Authenticated as: {pb.authStore.model.email}
        </p>
        <button
          className="btn w-full m-0"
          onClick={(e) => {
            e.preventDefault();
            createRoom();
          }}
        >
          Create Room
        </button>
        <div className="text-xl my-2">OR</div>
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          className="form-input w-full mx-0"
        />
        <input
          type="submit"
          id="submitBtn"
          value="Join with code"
          className="btn w-full mx-0"
        />

        <button
          className="btn w-full m-0 bg-transparent text-xs"
          onClick={(e) => {
            e.preventDefault();
            pb.authStore.clear();
            window.location.href = `/`;
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
};
