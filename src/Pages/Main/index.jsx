import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../Assets/Images/profile.jpg";
import { getEvents, searchUser } from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";
import "./index.css";
import Menu from "./menu";
import mainimage from "../../Assets/Images/main.png";
const Main = () => {
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

  return (
    <>
      <Menu />

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
          <img className="mainimage" src={mainimage} />
        </div>
        {data && (
          <Carousel
            interval={6000}
            infiniteLoop
            autoPlay
            showIndicators={false}
            onClickItem={(_, item) => navigate(`events/${item.key}`)}
          >
            {data.map((event) => (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={getImageURL(event.image)}
                  style={{ objectFit: "contain", width: "50%" }}
                  alt="Event"
                />
                <p style={{ textAlign: "center", width: "75%" }}>
                  {event.description}
                </p>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default Main;
