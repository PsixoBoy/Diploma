import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../Assets/Images/profile.jpg";
import { updateAvatar } from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";

import "./index.css";
import { Button } from "@mui/material";
import ShareButton from "./Share/ShareButton";

const Profile = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const uploadRef = useRef();
  const navigate = useNavigate();

  // ReactDOM.render(
  //   <QRCodeSVG value="https://reactjs.org/" />,
  //   document.getElementById('mountNode')
  // );

  if (!user) {
    return <p>LOADING...</p>;
  }

  const onAvatarChange = async (event) => {
    try {
      setIsLoading(true);
      await updateAvatar(event.target.files[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const onLogout = () => {
    localStorage.clear();
    navigate("/Auth");
  };
  const { name, lastName, email, image } = user;

  return (
    <>
      <section className="main">
        <div className="profile-card">
          <div className="image" onClick={() => uploadRef.current?.click()}>
            <input
              type="file"
              ref={uploadRef}
              formEncType="multipart/form-data"
              accept=".png"
              onChange={onAvatarChange}
              style={{ display: "none" }}
            />
            <img
              src={
                image
                  ? getImageURL(image) + `?t=${new Date().getTime()}`
                  : Avatar
              }
              className="profile-pic"
            />
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
          <div>
            <Button className="ExitProfile" onClick={onLogout}>
              Выйти
            </Button>
          </div>
          <div>
            <ShareButton userId={"s"} userName={name} userProfileUrl={"ff"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
