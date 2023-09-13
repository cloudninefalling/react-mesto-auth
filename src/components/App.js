import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

function App() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [editProfileOpen, setEditProfileOpen] = React.useState(false);
  const [editAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [addPlaceOpen, setAddPlaceOpen] = React.useState(false);
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [infoTooltipOpen, setInfotooltipOpen] = React.useState(false);
  const [infoTooltipType, setInfotooltipType] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    //check token
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .validateToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/", { replace: true });
          setCurrentEmail(res.data.email);
        })
        .catch(console.log);
    }

    //set initial profile
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //set initial cards
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => console.log(err));
  }, []);

  function handleLogin(email) {
    setLoggedIn(true);
    setCurrentEmail(email);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentEmail("");
    navigate("/sign-in", { replace: true });
  }

  //popups open-close funtions

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleDeleteBtnClick(card) {
    setConfirmDeleteOpen(true);
    setSelectedCard(card);
  }

  function handleOpenTooltip(type) {
    setInfotooltipType(type);
    setInfotooltipOpen(true);
  }

  function closeAllPopups() {
    setAddPlaceOpen();
    setImagePopupOpen();
    setEditAvatarOpen();
    setEditProfileOpen();
    setConfirmDeleteOpen();
    setInfotooltipOpen();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (likedUser) => likedUser._id === currentUser._id
    );

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardInState) => {
            return cardInState._id === newCard._id ? newCard : cardInState;
          })
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    api
      .deleteImage(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((cardInState) => {
            return cardInState._id != card._id;
          })
        );
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setProfileInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleAddPlace({ "image-name": name, "image-link": link }) {
    api
      .uploadImage({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  const handleEsc = (e) => {
    if (e.key === "Escape") closeAllPopups();
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("popup")) closeAllPopups();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <>
                    <Header email={currentEmail} onLogout={handleLogout} />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteBtnClick}
                      cards={cards}
                    />

                    <Footer />

                    <EditProfilePopup
                      isOpen={editProfileOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      handleEsc={handleEsc}
                      handleClick={handleClick}
                    />

                    <AddPlacePopup
                      isOpen={addPlaceOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlace}
                      handleEsc={handleEsc}
                      handleClick={handleClick}
                    />

                    <EditAvatarPopup
                      isOpen={editAvatarOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      handleEsc={handleEsc}
                      handleClick={handleClick}
                    />

                    <ConfirmDeletePopup
                      isOpen={confirmDeleteOpen}
                      onClose={closeAllPopups}
                      currentCard={selectedCard}
                      onDeleteCard={handleCardDelete}
                      handleEsc={handleEsc}
                      handleClick={handleClick}
                    />

                    <ImagePopup
                      card={selectedCard}
                      isOpen={imagePopupOpen}
                      onClose={closeAllPopups}
                      handleEsc={handleEsc}
                      handleClick={handleClick}
                    />
                  </>
                }
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header linkText="Регистрация" linkPath="/sign-up" />
                <Login
                  handleLogin={handleLogin}
                  openTooltip={handleOpenTooltip}
                />
                <InfoTooltip
                  isOpen={infoTooltipOpen}
                  type={infoTooltipType}
                  onClose={closeAllPopups}
                />
              </>
            }
          />
          <Route
            path="sign-up"
            element={
              <>
                <Header linkText="Войти" linkPath="/sign-in" />
                <Register openTooltip={handleOpenTooltip} />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
