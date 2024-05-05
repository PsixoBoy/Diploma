import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../../api";
import { useUser } from "../../hooks/useUser";
import "./index.css";

const Auth = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState('')
  const {getUser} = useUser();
  const navigate = useNavigate();

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
      setError('')
      await getUser();
      navigate('/')
    } catch (error) {
      setError('Email or password is wrong')
      console.log(error);
    }
  };

  const onRegistration = async () => {
    try {
      await signUp(values);
      setError('')
      await getUser();
      navigate('/')
    } catch (err) {
      setError("Email or password is wrong")
      console.log(err);
    }
  };

  const onSubmit = () => {
    if (isRegistration) {
      onRegistration();
      Navigate({to: "Main"})
    } else {
      onAuth();
    }
  }

  return (
    <div className="register">
      <div className="Registraion_Form">
        <div className="container">
          <div className="login form">
            <header>{isRegistration ? "Signup" : "Login"}</header>
            <form action="#">
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(e) => onChange("email", e)}
              />
             {isRegistration && <>
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
              </>}
              <input
                type="password"
                placeholder={isRegistration ? "Create a password" : "Enter your password"}
                onChange={(e) => onChange("password", e)}
              />
             {isRegistration && <input
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => onChange("passwordConfirm", e)}
              />}
              {!!error && <span>{error}</span>}
              <input
                type="button"
                className="button"
                value={isRegistration ? "Sign up" : "Login"}
                onClick={onSubmit}
              />
            </form>
            <div className="signup" onClick={() => setIsRegistration(!isRegistration)}>
              <span className="signup">
                {isRegistration ? "Already have an account?" : "Don't have an account?"}
                <label>Signup</label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
