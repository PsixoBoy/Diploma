import React, { useEffect, useState } from "react";
import "./menu.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../Assets/Images/profile.jpg";
import { getEvents, searchUser } from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";

const Menu = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      if (!data) {
        const res = await getEvents();
        setData(res.data);
      }
    };
    getData();
  }, []);
  const startSearch = async () => {
    try {
      const { data } = await searchUser(search);
      setSearchResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const goToProfile = (id) => {
    navigate(`users/${id}`);
  };
  return (
    <header>
      <div className="navbar">
        <div>
          <div ClassName="menu">
            <ul className="header-links">
              <li>
                <Link to="#">Главная</Link>
              </li>
              <li>
                <Link to="BadgeEditor">Бейджы</Link>
              </li>
              <li>
                <Link to="event/create">Создать мероприятие</Link>
              </li>
              {user ? (
                <li>
                  <Link to={`profile`}>Профиль</Link>
                </li>
              ) : (
                <li>
                  <Link to="Auth">Вход</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {user && (
        <div className="search-bar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск"
          />
          <button onClick={startSearch}>Искать</button>
          {searchResult.length > 0 && (
            <div className="search-results">
              {searchResult.map((user) => (
                <div
                  key={user.id}
                  onClick={() => goToProfile(user.id)}
                  className="search-result"
                >
                  <img
                    src={user.image ? getImageURL(user.image) : Avatar}
                    alt="Profile"
                  />
                  <span>{`${user.name} ${user.lastName}`}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
export default Menu;
