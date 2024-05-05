import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, joinEvent, leaveEvent } from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";


const Event = () => {  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const {id} = useParams();
  const {user, getUser} = useUser();
  const isJoined = !!user?.events?.find(event => event._id === id)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await getEvent(id);
      setData(res.data)
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  const handleClick = async () => {
    if (isJoined) {
      await leaveEvent(id);
    } else {
      await joinEvent(id)
    }
    await getUser();
  }


  if (isLoading) {
    return <span>LOADING...</span>;
  }

  return (
    <div>
      <h1>Event Page</h1>
      <img src={getImageURL(data?.image)} style={{width: '50%', maxWidth: '100rem'}} />
      <p>Location: {data?.location}</p>
      <p>Date: {data?.date}</p>
      <p>Description: {data?.description}</p>
      <Button variant="outlined" onClick={handleClick}>{isJoined ? 'Leave' : 'Join'}</Button>
    </div>
  );
};


export default Event;
