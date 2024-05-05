import { Input } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "../../hooks/useUser";
import "./style.css";


const Chat = () => {
  const {user} = useUser()
  const [value, setValue] = useState("");
  const params = useParams();
  
  const onDialogStart = (data) => {
    console.log('msg',data);
    setMsgs(data)
  }

  const onReceive = (msg) => {
    setMsgs((prev) => [...prev, msg]);
  };

  const {users, messages, sendMsg } = useSocket({
    url: "192.168.1.75:5000",
    destination: params.id
  });
  
  const onSubmit = () => {
    sendMsg(value);
    setValue('')
  };
  
  if (!messages) {
    return <span>Loading...</span>;
  }
  
  return (
    <div className="Chat">
      {/* {dialogs.map((user) => <p key={user.id}>{user.name} {user.lastName}</p>)} */}
      <div>
        {messages.map((msg, ind) => (
          <div key={ind} className={`message ${user.id === msg.author.id ? "mine" : ""}`}>
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
