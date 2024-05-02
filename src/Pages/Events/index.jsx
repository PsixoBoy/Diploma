import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  //   useEffect(() => {}, []);

  if (isLoading) {
    return <span>LOADING...</span>;
  }
};

const EventFormFields = ({ onSubmit, onChange, event }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={event.name}
        onChange={onChange}
      />
      <input
        type="date"
        name="date"
        placeholder="Event Date"
        value={event.date}
        onChange={onChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Event Location"
        value={event.location}
        onChange={onChange}
      />
      {/* More form fields... */}
      <button type="submit">Submit</button>
    </form>
  );
};

const EventFormActions = ({ onCancel }) => {
  return (
    <div>
      <button onClick={onCancel}>Cancel</button>
      {/* More actions... */}
    </div>
  );
};

const App = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call, etc.)
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEvent({
      name: "",
      date: "",
      location: "",
    });
  };

  return (
    <div>
      <h1>Event Page</h1>
      {/* Existing event list and event details code... */}
      <EventForm
        event={event}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </div>
  );
};

const EventForm = ({ event, onSubmit, onChange }) => {
  return (
    <div>
      <h2>Create New Event</h2>
      <EventFormFields event={event} onSubmit={onSubmit} onChange={onChange} />
      {/* <EventFormActions onCancel={handleCancel} /> */}
    </div>
  );
};

export default App;
