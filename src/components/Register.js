import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

export default function Register(props) {
  function onSubmit() {}

  return (
    <AuthForm
      title="Регистрация"
      submitBtnText="Зарегистрироваться"
      onSubmit={onSubmit}
      name="register"
    >
      <p className="auth-form__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth-form__link">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}
