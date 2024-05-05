import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";
import Event from "./Pages/Event";
import EventCreate from "./Pages/EventCreate";
import Main from "./Pages/Main";
import Profile from "./Pages/Profile";
import User from "./Pages/User";
import { UserProvider } from "./hooks/useUser";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="auth" element={<Auth />} />
            <Route path="users/:id" element={<User />} />
            <Route path="profile" element={<Profile />} />
            <Route path="events/:id" element={<Event />} /> 
            <Route path="event/create" element={<EventCreate />} /> 
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
