import React from "react";
import SocketContext from "./SocketContext";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyitems: "center"
};

export default function Player() {
  const [playerName, setPlayerName] = React.useState("");
  const { send } = React.useContext(SocketContext);

  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        height: "80vh"
      }}
    >
      <form style={styles}>
        <input
          name="name"
          placeholder="Enter Player Name"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />
        <button
          type="button"
          onClick={() => send({ type: "login", name: playerName })}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
