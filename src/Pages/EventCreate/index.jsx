import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { addEventImage, createEvent } from "../../api";


const EventCreate = () => {
  const [file, setFile] = useState();
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  

  const onFileChose = (e) => {
   setFile(e.target.files[0]);
  }

  const onSubmit = async () => {
    const {data} = await createEvent({
      date,
      location,
      description
    })
    await addEventImage(data.id, file);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', margin: '10% 30%'}}>
      <input type="file" accept='.png' onChange={onFileChose} />
      <Input variant="outlined" placeholder="Локация" value={location} onChange={(e) => setLocation(e.target.value)} />
      <Input variant="outlined" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input variant="outlined" placeholder="Дата" value={date} onChange={(e) => setDate(e.target.value)}/>
      <Button variant="outlined" onClick={onSubmit}>Создать</Button>
    </div>
  );
};


export default EventCreate;
