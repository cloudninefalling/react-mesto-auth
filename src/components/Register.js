import React from "react";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/Auth";

export default function Register(props) {
  const navigate = useNavigate();

  function onSubmit(values) {
    const { email, password } = values;
    auth
      .register(email, password)
      .then(props.openTooltip("register"))
      .then(navigate("/sign-in", { replace: true }));
  }

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
