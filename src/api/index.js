import axios from "axios";

const BASE_URL = "http://192.168.1.75:5000";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwt");
  console.log(token);
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

export const getUser = async (id) => {
  return instance.get(`/users/${id}`);
};
