import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import "./style.css";

const Chat = () => {
  const [data, setData] = useState();
  const [value, setValue] = useState("");
  const params = useParams();

  const onStart = (messages) => {
    setData(messages);
  };

  const onReceive = (message) => {
    setData((prev) => [...prev, message]);
  };

  const { socket } = useSocket({
    url: "192.168.1.75:5000",
    destination: params.id,
    onStart,
    onReceive,
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMsg = () => {
    socket.emit("message:send", { value });
  };

  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <div className="Chat">
      <div className="messages">
        {data.map((msg, ind) => (
          <div key={ind} className="message">
            {msg.value}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-field"
        />
        <button onClick={sendMsg} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
