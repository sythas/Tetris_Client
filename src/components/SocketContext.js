import React from "react";

const registry = {};
const socket = new WebSocket("wss://3uu2s.sse.codesandbox.io/");

socket.onmessage = e => {
  const body = JSON.parse(e.data);
  console.log(body);
  const listeners = registry[body.type];
  console.log(listeners, registry);
  if (listeners) {
    listeners.forEach(listener => {
      console.log("Calling Listener");
      listener(body);
    });
  }
};

export default React.createContext();
export const handlers = {
  send: msg => socket.send(JSON.stringify(msg)),
  on: (type, fn) => {
    if (!registry[type]) {
      registry[type] = [];
    }
    registry[type].push(fn);
  },
  off: (type, fn) => {
    if (registry[type] && registry[type].includes(fn))
      registry[type].splice(registry[type].indexOf(fn), 1);
  }
};
