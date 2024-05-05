import axios from "axios";

export const BASE_URL = "http://192.168.1.75:5000";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    req.headers.Authorization = `bearer ${token}`;
  }
  return req;
});

instance.interceptors.response.use((res) => {
  if (
    (res.config.url === "/login" || res.config.url === "/sign") &&
    res.data.token
  ) {
    localStorage.setItem("jwt", res.data.token);
  }
  return res;
});

export const signUp = ({
  name,
  lastName,
  email,
  password,
  passwordConfirm,
}) => {
  return instance.post("/sign", {
    name,
    lastName,
    email,
    password,
    passwordConfirm,
  });
};

export const login = ({ email, password }) => {
  return instance.post("/login", {
    email,
    password,
  });
};

export const getEvents = () => {
  return instance.get("/events");
};

export const getEvent = (id) => {
  return instance.get(`/event/${id}`);
};

export const createEvent = (data) => {
  return instance.post('/events', data);
};

export const addEventImage = (id, file) => {
  const formData = new FormData();
  formData.append('file',file);
  formData.append('fileName',file.name);
  return instance.post(`/event_image/${id}`, formData, {
    headers: {"Content-Type": "multipart/form-data"}
  });
};

export const joinEvent = (eventId) => {
  return instance.post('/event-join', {eventId})
}

export const leaveEvent = (eventId) => {
  return instance.post('/event-leave', {eventId})
}

export const getMe = async () => {
  return instance.get('/me')
}

export const searchUser = (value) => {
  return instance.post("/users/search", {value});
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append('file',file);
  formData.append('fileName',file.name);
  return instance.post('/me/photo', formData, {
    headers: {"Content-Type": "multipart/form-data"}
  })
}

export const getUser = async (id) => {
  return instance.get(`/users/${id}`);
};
