import { Input } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "../../hooks/useUser";
import "./style.css";

const Chat = () => {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const params = useParams();
  const { search } = useLocation();
  const { users, messages, sendMsg } = useSocket({
    // url: "192.168.0.61:5000",
    url: "10.3.1.11:5000",
    destination: params.id,
    isEvent: new URLSearchParams(search).get("event"),
  });

  const onSubmit = () => {
    sendMsg(value);
    setValue("");
  };

  if (!messages) {
    return <span>Loading...</span>;
  }

  return (
    <div className="Chat">
      {/* {dialogs.map((user) => <p key={user.id}>{user.name} {user.lastName}</p>)} */}
      <div>
        {messages.map((msg, ind) => (
          <div
            key={ind}
            className={`message ${user?.id === msg?.author?.id ? "mine" : ""}`}
          >
            <h1>
              <a
                href={`/users/${user.id}`}
                style={{ "list-style-type": "none" }}
              >
                {msg.author.name}
              </a>
            </h1>
            {msg.value}
          </div>
        ))}
      </div>
      <div className="input-container">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-field"
        />
        <button onClick={onSubmit} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
