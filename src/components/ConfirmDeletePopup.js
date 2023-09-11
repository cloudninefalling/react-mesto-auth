import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  function handleCardDelete(e) {
    e.preventDefault();
    props.onDeleteCard(props.currentCard);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"confirm-delete"}
      title={"Вы уверены?"}
      submitBtnText={"Да"}
      onSubmit={handleCardDelete}
      onClose={props.onClose}
      handleEsc={props.handleEsc}
      handleClick={props.handleClick}
    />
  );
}
