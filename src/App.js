import "./App.css";
import { Link } from "react-router-dom";
import React from "react";
import Carousel from "./Components/Carousel/Carousel";
import eventsData from "./Components/Carousel/eventsdata";

function App() {
  return (
    <div className="App">
      <header>
        <div className="wrap">
          <div>
            <div>
              <Link href="#">
                <img src="logo.png" alt="" />
              </Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link href="#">Главная</Link>
                </li>
                <li>
                  <Link href="#">Тарифы</Link>
                </li>
                <li>
                  <Link href="#">О нас</Link>
                </li>
                <li>
                  <Link to="Auth">Регистрация</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="wrapper">
        <div className="content">
          <div className="headline">
            Найди себя
            <br />
            Своих друзей
            <br />
            Своих партнёров
            <br />
          </div>
        </div>

        <div className="sidebar">
          Боковая панель она может распологаться как слева так и справа
        </div>
        <Carousel data={eventsData} />
      </div>
    </div>
  );
}

export default App;
