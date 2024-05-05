import { useEffect, useRef, useState } from "react";
import { useBeforeUnload } from "react-router-dom";
import { io } from "socket.io-client";

export const useSocket = ({ url, destination }) => {
  const [users,setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(url, {
      extraHeaders: {
        authorization: localStorage.getItem("jwt"),
      },
      query: {destination}
    });

    socketRef.current.on("dialog:start", ({users, messages}) => {
      setUsers(users);
      setMessages(messages);
    });
    socketRef.current.on("message:receive", (message) => {
      console.log(message);
      setMessages(prev => [...prev, message])
    })
  }, [destination])

  useBeforeUnload(() => {
    socketRef.current.disconnect();
  })

  const sendMsg = (value) => {
    socketRef.current.emit("message:send", { value, destination });
  };

  return {
    messages, 
    users,
    sendMsg,
  };
};
