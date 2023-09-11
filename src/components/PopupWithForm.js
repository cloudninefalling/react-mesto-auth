import React from "react";

export default function PopupWithForm(props) {
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
    <div
      className={`popup ${props.isOpen && "popup_opened"} popup_${props.name}`}
    >
      <div className="popup__container">
        <form
          className="edit-form"
          name={props.name}
          autoComplete="off"
          onSubmit={props.onSubmit}
        >
          <h2 className="edit-form__title">{props.title}</h2>
          {props.children}

          <button
            className="edit-form__submit"
            type="submit"
            aria-label={props.submitBtnText}
          >
            {props.submitBtnText}
          </button>
        </form>
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
