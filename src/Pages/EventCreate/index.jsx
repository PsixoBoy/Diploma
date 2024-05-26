import { Button, Input, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { addEventImage, createEvent } from "../../api";
import { useUser } from "../../hooks/useUser";

const EventCreate = () => {
  const [file, setFile] = useState();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const { user } = useUser();

  const onFileChose = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const { data } = await createEvent({
        date,
        location,
        description,
        isPrivate,
        id: user.id,
      });

      if (file) {
        await addEventImage(data.id, file);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", margin: "10% 30%" }}
    >
      <input type="file" accept=".png" onChange={onFileChose} />
      <Input
        variant="outlined"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        variant="outlined"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        variant="outlined"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        }
        label="Private Event"
      />
      <Button variant="outlined" onClick={onSubmit}>
        Create Event
      </Button>
    </div>
  );
};

export default EventCreate;
