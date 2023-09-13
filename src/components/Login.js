import React from "react";
import AuthForm from "./AuthForm";
import auth from "../utils/Auth";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();

  function handleSubmit(values) {
    const { email, password } = values;
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          props.handleLogin(email);
          navigate("/", { replace: true });
        } else props.openTooltip("login");
      })
      .catch((err) => {
        console.log(err);
        props.openTooltip("login");
      });
  }

  return (
    <AuthForm
      title="Вход"
      submitBtnText="Войти"
      onSubmit={handleSubmit}
      name="login"
    />
  );
}
