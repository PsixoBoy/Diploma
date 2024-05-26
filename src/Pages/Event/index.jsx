import {
  Button,
  Input,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEvent,
  joinEvent,
  leaveEvent,
  generateBadgePDF,
  inviteUser,
  requestToJoin,
  respondToRequest,
  searchUser,
} from "../../api";
import { useUser } from "../../hooks/useUser";
import { getImageURL } from "../../utils";
import Avatar from "../../Assets/Images/profile.jpg";
import "./index.css";

const Event = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();
  const { user, getUser } = useUser();
  const [inviteEmail, setInviteEmail] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await getEvent(id);
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const isJoined = data?.participants?.some(
    (participant) => participant.id === user?.id
  );
  const isAdminOrOrganizer =
    user?.isAdmin ||
    data?.participants?.some(
      (participant) =>
        participant.id === user?.id && participant.status === "organizer"
    );

  const handleClick = async () => {
    try {
      if (isJoined) {
        await leaveEvent(id);
      } else {
        await joinEvent(id);
      }
      await getUser();
      getData();
    } catch (error) {
      console.error("Error joining/leaving event:", error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await generateBadgePDF({ eventId: id, userId: user.id });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleInvite = async (userId) => {
    try {
      await inviteUser({ eventId: id, userId });
      alert("Invitation sent");
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };

  const handleRequestToJoin = async () => {
    try {
      await requestToJoin({ eventId: id });
      alert("Request to join sent");
    } catch (error) {
      console.error("Error requesting to join:", error);
    }
  };

  const handleRespondToRequest = async (userId, approve) => {
    try {
      await respondToRequest({ eventId: id, userId, approve });
      alert(approve ? "User added to event" : "Request denied");
      getData();
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  const startSearch = async () => {
    try {
      console.log("Search value:", inviteEmail);
      const { data } = await searchUser(inviteEmail);
      setSearchResult(data);
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (isLoading) {
    return <span>LOADING...</span>;
  }

  const renderUsersByStatus = (status) => {
    return data?.participants
      ?.filter((participant) => participant.status === status)
      ?.map((participant) => (
        <ListItem
          key={participant.id}
          onClick={() => goToProfile(participant.id)}
        >
          <img
            src={participant.image ? getImageURL(participant.image) : Avatar}
            alt="Profile"
            className="avatar"
          />
          <ListItemText
            primary={`${participant.name} ${participant.lastName}`}
          />
        </ListItem>
      ));
  };
  const goToProfile = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="event-page">
      <h1>Event Page</h1>
      <img src={getImageURL(data?.image)} alt="Event" />
      <p>Location: {data?.location}</p>
      <p>Date: {data?.date}</p>
      <p>Description: {data?.description}</p>
      <Button variant="outlined" onClick={handleClick} className="chat-button">
        {isJoined ? "Leave" : "Join"}
      </Button>
      {isJoined && (
        <>
          <Button href={`/chat/${id}?event=true`} className="chat-button">
            Go to chat
          </Button>
          <Button
            variant="outlined"
            onClick={handleGeneratePDF}
            className="chat-button"
          >
            Get Badge PDF
          </Button>
        </>
      )}
      {isAdminOrOrganizer && (
        <>
          <Button
            href={`/badgeEditor/${id}`}
            variant="contained"
            className="chat-button"
          >
            Edit Badge
          </Button>
          <div>
            <Input
              placeholder="Search user to invite"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={startSearch} variant="outlined">
              Search
            </Button>
          </div>
          {searchResult.length > 0 && (
            <div className="search-results">
              {searchResult.map((user) => (
                <div key={user.id} className="search-result">
                  <img
                    src={user.image ? getImageURL(user.image) : Avatar}
                    alt="Profile"
                  />
                  <span>{`${user.name} ${user.lastName}`}</span>
                  <Button
                    onClick={() => handleInvite(user.id)}
                    variant="outlined"
                  >
                    Invite
                  </Button>
                </div>
              ))}
            </div>
          )}
          {data?.requests?.map((request) => (
            <div key={request}>
              <span>{request}</span>
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
            </div>
          ))}
        </>
      )}
      {data?.isPrivate && !isJoined && (
        <Button onClick={handleRequestToJoin} variant="outlined">
          Request to Join
        </Button>
      )}
      <Button onClick={toggleDrawer} variant="outlined">
        Show Participants
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <div className="drawer">
          <h2>Organizers</h2>
          <List>{renderUsersByStatus("organizer")}</List>
          <h2>Guests</h2>
          <List>{renderUsersByStatus("guest")}</List>
        </div>
      </Drawer>
    </div>
  );
};

export default Event;
