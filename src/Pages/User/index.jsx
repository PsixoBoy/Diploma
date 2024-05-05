import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from '../../Assets/Images/profile.jpg';
import { getUser } from "../../api";
import { getImageURL } from "../../utils";
import "./index.css";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      if (!params.id) return;
      const { data } = await getUser(params.id);

      setData(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading || !data) {
    return <span>LOADING...</span>;
  }

  const { name, lastName, email, image } = data;

  return (
    <>
      <section className="main">
        <div className="profile-card">
          <div className="image">
            <img src={image ? getImageURL(image) : Avatar} alt="" className="profile-pic" />
          </div>
          <div className="data">
            <h2>
              {name} {lastName}
            </h2>
            <span>Статус</span>
          </div>
          <div className="events">
            <h3>Мероприятия</h3>
            <div>Список мероприятий</div>
          </div>
          <div className="row">
            <div className="info">
              <h3>Информация</h3>
              <span>{email}</span>
            </div>
            <div className="info">
              <h3>Теги</h3>
              <span>Список тегов</span>
            </div>
          </div>
          <div className="buttons">
            <a href={`/chat/${params.id}`} className="btn">
              чат
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
