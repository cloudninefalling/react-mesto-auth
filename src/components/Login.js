import React from "react";
import AuthForm from "./AuthForm";
import auth from "../utils/Auth";
import tooltipImage from "../images/tooltip__error.svg";

export default function Login({ openTooltip, handleLogin }) {
  function showErrorTooltip() {
    openTooltip({
      image: tooltipImage,
      text: "Что-то пошло не так! Попробуйте ещё раз.",
    });
  }

  function handleSubmit(values) {
    const { email, password } = values;
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          handleLogin(email);
        } else showErrorTooltip();
      })
      .catch((err) => {
        console.log(err);
        showErrorTooltip();
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
