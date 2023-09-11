import successImage from "../images/tooltip__success.svg";
import errorImage from "../images/tooltip__error.svg";

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div
          className="popup__tooltip-image"
          style={
            props.success
              ? { backgroundImage: `url(${successImage})` }
              : { backgroundImage: `url(${errorImage})` }
          }
        />
        <h2 className="popup__tooltip-title">
          {props.success
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
