import React from "react";
import Tetris from "react-tetris";
import SocketContext from "./SocketContext";

const boardStyles = {
  display: "grid",
  gridTemplateAreas: "'hold  game queue' 'score game queue'",
  gridGap: "2em"
};

export default () => {
  const [playing, setPlaying] = React.useState(false);
  const { on, off } = React.useContext(SocketContext);

  React.useEffect(() => {
    const handler = () => setPlaying(true);
    on("start", handler);
    return () => off("loggedIn", handler);
  }, [on, off]);

  return (
    <div
      style={{ display: "grid", alignItems: "center", justifyItems: "center" }}
    >
      {playing && (
        <Tetris>
          {({ HeldPiece, Gameboard, PieceQueue, points, linesCleared }) => {
            // Render it however you'd like
            return (
              <div style={boardStyles}>
                <div style={{ gridArea: "hold" }}>
                  <HeldPiece />
                </div>
                <div style={{ gridArea: "score" }}>
                  <p>Points: {points}</p>
                  <p>Lines Cleared: {linesCleared}</p>
                </div>
                <div style={{ gridArea: "game" }}>
                  <Gameboard />
                </div>
                <div style={{ gridArea: "queue" }}>
                  <PieceQueue />
                </div>
              </div>
            );
          }}
        </Tetris>
      )}
    </div>
  );
};
