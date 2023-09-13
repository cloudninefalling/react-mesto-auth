import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место" />
      {props.email && (
        <div className="header__container">
          <p className="header__text">{props.email}</p>
          <button
            className="header__button"
            aria-label="Выйти"
            type="button"
            onClick={props.onLogout}
          >
            Выйти
          </button>
        </div>
      )}
      {props.linkText && (
        <Link to={props.linkPath} className="header__link">
          {props.linkText}
        </Link>
      )}
    </header>
  );
}
