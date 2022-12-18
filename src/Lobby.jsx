import PocketBase from "pocketbase";
import React, { useState } from "react";

import { create2d } from "./util";

export const Lobby = () => {
  const pb = new PocketBase("https://cpsc349project4.fly.dev");
  const [roomId, setRoomId] = useState("");

  const createRoom = async (e) => {
    await pb.collection("games").create({
      board_state: JSON.stringify(create2d(3)),
      player_1: [pb.authStore.model.id],
    });
    //go to gameboard after creating room
  };

  //Join room btn
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //if this works go to gameboard
      await pb.collection("games").getOne(roomId);
      console.log("Join into room");
    } catch (error) {
      alert("Sorry, no room exists");
      console.log("Caught the Error");
      throw Error(error);
    }
  };

  return (
    <div className="bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 flex flex-col justify-center items-center">
      <button className="btn" onClick={createRoom}>
        Create Room
      </button>
      <form onSubmit={handleSubmit}>
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          className="form-input"
        />
        <input type="submit" id="submitBtn" value="Submit" className="btn" />
      </form>
    </div>
  );
};
