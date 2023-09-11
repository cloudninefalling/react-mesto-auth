import React from "react";
import AuthForm from "./AuthForm";

export default function Login() {
  function onSubmit() {}

  return (
    <AuthForm
      title="Вход"
      submitBtnText="Войти"
      onSubmit={onSubmit}
      name="login"
    />
  );
}
