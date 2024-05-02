import React from "react";
import { ChatEngine } from "react-chat-engine";
import chats from "./chats";
import "./style.css";

const ChatPages = () => {
  return (
    <div className="chat-page">
      <h1>Chats</h1>
      <div className="chats">
        {chats.map((chat) => (
          <div key={chat.id} className="chat">
            <h2>{chat.name}</h2>
            <ChatEngine
              height="300px"
              projectID="YOUR_PROJECT_ID"
              userName="YOUR_USER_NAME"
              userSecret="YOUR_USER_SECRET"
              renderChatFeed={(chatAppProps) => (
                <ChatEngine {...chatAppProps} />
              )}
              renderChatList={(chatListProps) => (
                <ChatEngine {...chatListProps} />
              )}
              renderNewChatForm={(creds) => <ChatEngine {...creds} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPages;
