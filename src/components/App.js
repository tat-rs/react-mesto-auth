import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup ';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupConfirmation from './PopupConfirmation';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); //состояние попапа "обновить аватар"

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); //состояние попапа "редактировать профиль"

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); //состояние попапа "добавить карточку"

  const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false); //состояние попапа "подтвердить удаление карточки"

  const [selectedCard, setSelectedCard] = React.useState({}) //состояние попапа с изображением

  const [currentUser, setCurrentUser] = React.useState({}); //стейт текущих данных пользователя

  const [cards, setCards] = React.useState([]);//хук состояния карточки 
  
  //обработчик открытия попапа редактирования аватара профиля
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //обработчик открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  //обработчик открытия попапа добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  
  //обработчик клика по карточке
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  //обработчик открытия попапа подтверждения удаления карточки
  function handlePopupConfirmationClick() {
    setIsPopupConfirmationOpen(true)
  }

  //сброс состояний переменных
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setIsPopupConfirmationOpen(false)
  }
  //получили массив карточек
  React.useEffect(() => {
    // Отправляем запрос в API и получаем первоначальный массив карточек
    api.getAllCards()
    .then((cardData) => {
      setCards(cardData)
    })
    .catch(err => console.log(err))
  }, [])

  //получили данные пользователя
  React.useEffect(() => {
    // Отправляем запрос в API и получаем обновлённые данные пользователя
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData); //обновили данные текущего пользователя
    })
    .catch(err => console.log(err))
  }, [])

  //обновление данных пользователя(имя, описание)
  function handleUpdateUser(data) {
    // Отправляем запрос в API и получаем отредактированные данные пользователя
    api.setUserInfo(data)
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  //обновление аватара пользователя
  function handleUpdateAvatar(data) {
    // Отправляем запрос в API и получаем обновленный аватар пользователя
    api.setUserAvatar(data)
    .then((userData) => {
      setCurrentUser(userData); //обновили ccылку на аватар пользователя
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  //функция постановки лайка/дизлайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(element => element._id === currentUser._id); // проверяем, поставлен ли лайк пользователем на карточке
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((element) => element._id === card._id ? newCard : element));
    })
    .catch(err => console.log(err))
  }
  
  //функция удаления карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые массив карточек
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter(element => element._id !== card._id)) //отфильтровали карточки по которым айди не совпали при клике на удаление
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  //функция добавления карточки
  function handleAddPlaceSubmit(card) {
    // Отправляем запрос в API и получаем обновлённый массив карточек
    api.addNewCard(card)
    .then((newAddPlace) => {
      setCards([newAddPlace, ...cards]); //обновили стейт карточек
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='page__content'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onBtnDelete={handlePopupConfirmationClick}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} textOfButton='Сохранить'/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} textOfButton='Создать'/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} textOfButton='Сохранить' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <PopupConfirmation isOpen={isPopupConfirmationOpen} onClose={closeAllPopups} card={selectedCard} textOfButton="Да" removeCard={handleCardDelete}/>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
