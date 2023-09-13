import registerSuccessImage from "../images/tooltip__success.svg";
import loginErrorImage from "../images/tooltip__error.svg";

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div
          className="popup__tooltip-image"
          style={
            props.type === "register"
              ? { backgroundImage: `url(${registerSuccessImage})` }
              : { backgroundImage: `url(${loginErrorImage})` }
          }
        />
        <h2 className="popup__tooltip-title">
          {props.type === "register"
            ? `Вы успешно зарегистрировались!`
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
