import React, { useState } from "react";
import "./index.css";
import { getEvents, login, signUp } from "../../api";

const Auth = () => {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (field, event) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const onAuth = async () => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onRegistration = async () => {
    try {
      const result = await signUp(values);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="Registraion_Form">
        <div className="container">
          <input type="checkbox" id="check" />
          <div className="login form">
            <header>Login</header>
            <form action="#">
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(e) => onChange("email", e)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => onChange("password", e)}
              />
              <a href="#">Forgot password?</a>
              <input
                type="button"
                className="button"
                value="Login"
                onClick={onAuth}
              />
            </form>
            <div className="signup">
              <span className="signup">
                Don't have an account?
                <label for="check">Signup</label>
              </span>
            </div>
          </div>
          <div className="registration form">
            <header>Signup</header>
            <form action="#">
              <input
                type="text"
                placeholder="Enter your email"
                value={values.email}
                onChange={(e) => onChange("email", e)}
              />
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => onChange("name", e)}
              />
              <input
                type="text"
                placeholder="LastName"
                onChange={(e) => onChange("lastName", e)}
              />
              <input
                type="password"
                placeholder="Create a password"
                onChange={(e) => onChange("password", e)}
              />
              <input
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => onChange("passwordConfirm", e)}
              />
              <input
                type="button"
                disabled={Object.values(values).some((str) => !str)}
                onClick={onRegistration}
                className="button"
                value="Signup"
              />
            </form>
            <div className="signup">
              <span className="signup">
                Already have an account?
                <label for="check">Login</label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
