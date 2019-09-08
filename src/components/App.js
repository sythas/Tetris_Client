import React from "react";
import Gameboard from "./Gameboard";
import Player from "./Player";
import SocketContext, { handlers } from "./SocketContext";

export default () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  console.log(loggedIn);

  React.useEffect(() => {
    console.log("Use Effect");
    const handler = () => {
      console.log("Loggedin");
      setLoggedIn(true);
    };
    handlers.on("loggedIn", handler);
    return () => handlers.off("loggedIn", handler);
  }, []);

  return (
    <SocketContext.Provider value={handlers}>
      <h1 style={{ textAlign: "center" }}>Wausau.js Tetris Challenge</h1>
      {loggedIn ? <Gameboard /> : <Player />}
    </SocketContext.Provider>
  );
};
