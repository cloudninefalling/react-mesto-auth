import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место" />
      {props.emailText && <p className="header__text">{props.emailText}</p>}
      {props.linkText && (
        <Link to={props.linkPath} className="header__link">
          {props.linkText}
        </Link>
      )}
    </header>
  );
}
