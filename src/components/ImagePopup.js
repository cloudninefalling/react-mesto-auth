import React from "react";

export default function ImagePopup(props) {
  React.useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", props.handleEsc);
      document.addEventListener("click", props.handleClick);
    }
    return () => {
      document.removeEventListener("keydown", props.handleEsc);
      document.removeEventListener("click", props.handleClick);
    };
  }, [props.isOpen]);

  return (
    <div className={`popup ${props.isOpen && "popup_opened"} popup_image`}>
      <div className="popup__container popup__container_image">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__title">{props.card.name}</h2>
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
