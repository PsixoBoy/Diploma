import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from '../../Assets/Images/profile.jpg';
import { updateAvatar } from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";
import "./index.css";

const Profile = () => {
  const {user} = useUser();
  const [isLoading, setIsLoading] = useState(true)
  const uploadRef = useRef();

  if (!user) {
    return <p>LOADING...</p>
  }

  const onAvatarChange = async (event) => {
    try {
      setIsLoading(true);
      await updateAvatar(event.target.files[0])
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const { name, lastName, email, image } = user;

  return (
    <>
      <section className="main">
        <div className="profile-card">
          <div className="image" onClick={() => uploadRef.current?.click()}>
            <input type="file" ref={uploadRef} formEncType="multipart/form-data" accept=".png" onChange={onAvatarChange} style={{display: 'none'}} />
            <img src={image ? getImageURL(image) + `?t=${new Date().getTime()}` : Avatar} className="profile-pic" />
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
            <Link to={'/chat'}>Чат</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
