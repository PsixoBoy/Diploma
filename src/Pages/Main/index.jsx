import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../Assets/Images/profile.jpg';
import { getEvents, searchUser } from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";

const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState()
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const {user} = useUser();

  useEffect(() => {
    const getData = async () => {
      if (!data) {
        const res = await getEvents();
        setData(res.data);
      }
    }
    getData()
  }, [])

  const startSearch = async () => {
    try {
      const {data} = await searchUser(search)
      setSearchResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  const goToProfile = (id) => {
    navigate(`users/${id}`)
  }
  
    return (
        <>        
        <header>
          <div className="wrap">
            <div>
              <div>
                <ul style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Link href="#">Главная</Link>
                    <Link href="#">Тарифы</Link>
                    <Link to="event/create">Создать мероприятие</Link>
                    {user ? <Link to={`profile`}>Профиль</Link> : <Link to="Auth">Вход</Link>}
                </ul>
              </div>
            </div>
          </div>
        </header>
        {user &&
          <div style={{alignSelf: 'center'}}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={startSearch}>Искать</button>
            {searchResult.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: 1,  borderColor: '#000',}}>
                {searchResult.map(user =>( 
                <div onClick={() => goToProfile(user.id)} style={{display: 'flex', alignItems: 'center', backgroundColor: '#fff', minWidth: 350, justifyItems: 'center', border: 'solid', marginBottom: 10}}>
                  <img src={user.image ? getImageURL(user.image) : Avatar} style={{width: 50, height: 50, borderRadius: 25, marginRight: 20}} />
                  <span>{user.name}</span>
                  <span> {user.lastName}</span>
                </div>))}
              </div>
            )}
          </div>}
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
          {data && <Carousel interval={6000} infiniteLoop autoPlay showIndicators={false} onClickItem={(_, item) => navigate(`events/${item.key}`)}>
            {data.map(event => (
            <div key={event.id} style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <img src={getImageURL(event.image)} style={{objectFit: 'contain'}} />
              <p style={{textAlign: 'center', width: '100%'}}>{event.description}</p>
            </div>))}
          </Carousel>}
        </div></>
)}

export default Main;