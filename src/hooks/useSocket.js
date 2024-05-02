import { useState } from "react";
import { io } from "socket.io-client";

export const useSocket = ({ url, destination, onStart, onReceive }) => {
  const [socket, setSocket] = useState();
  if (!destination) {
    return;
  }

  if (!socket) {
    setSocket(
      io(url, {
        extraHeaders: {
          authorization: localStorage.getItem("jwt"),
        },
        query: { destination },
      })
        .on("start", onStart)
        .on("message:receive", onReceive)
    );
  }

  return {
    socket,
  };
};
