import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, respondToRequest } from "../../api";
import { useUser } from "../../hooks/useUser";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const RequestList = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const { user } = useUser();
  const isAdminOrOrganizer =
    user?.isAdmin ||
    data?.participants?.some(
      (participant) =>
        participant.id === user?.id && participant.status === "organizer"
    );

  const getData = async () => {
    try {
      const res = await getEvent(id);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRespondToRequest = async (userId, approve) => {
    try {
      await respondToRequest({ eventId: id, userId, approve });
      alert(approve ? "User added to event" : "Request denied");
      getData();
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  if (!isAdminOrOrganizer) {
    return <span>Unauthorized</span>;
  }

  return (
    <div className="request-list">
      <h1>Join Requests</h1>
      <List>
        {data?.requests?.map((request) => (
          <ListItem key={request}>
            <ListItemText primary={request} />
            <Button
              onClick={() => handleRespondToRequest(request, true)}
              variant="outlined"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleRespondToRequest(request, false)}
              variant="outlined"
            >
              Deny
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RequestList;
