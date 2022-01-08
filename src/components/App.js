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
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import auth from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); //состояние попапа "обновить аватар"

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); //состояние попапа "редактировать профиль"

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); //состояние попапа "добавить карточку"

  const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false); //состояние попапа "подтвердить удаление карточки"

  const [selectedCard, setSelectedCard] = React.useState({}) //состояние попапа с изображением

  const [currentUser, setCurrentUser] = React.useState({}); //стейт текущих данных пользователя

  const [cards, setCards] = React.useState([]);//хук состояния карточки 

  const [isLoggedIn, setLoggedIn] = React.useState(false); //стейт, содержащий инф-ию о статусе пользователя

  const [email, setEmail] = React.useState(''); //стейт, эл. почты пользователя

  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false); //состояние попапа результата регистрации

  const [isSuccess, setSuccess] = React.useState(false);

  const history = useHistory()
  
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

  function handleLogin() {
    setLoggedIn(true)
  }

  //сброс состояний переменных
  function closeAllPopups() {
    setInfoToolTipOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setIsPopupConfirmationOpen(false)
  }

  React.useEffect(() => {
    tokenCheck()
    // Отправляем запрос в API и получаем первоначальный массив карточек
    api.getAllCards()
    .then((cardData) => {
      setCards(cardData)
    })
    .catch(err => console.log(err))

    //Отправляем запрос в API и получаем обновлённые данные пользователя
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData); //обновили данные текущего пользователя
    })
    .catch(err => console.log(err))
    
  }, [])

  function tokenCheck() {
    const token = localStorage.getItem('token')
    if(token){
      auth.getContent(token)
        .then((data) => data)
        .then((res) => {
          setEmail(res.data.email)
          handleLogin()
          history.push('/')
        })
    }
  }

  function handleInfoTooltipClick() {
    setInfoToolTipOpen(true)
  }

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

  function signOutClick(){
    localStorage.removeItem('token');
    setLoggedIn(false)
    history.push('/sign-in');
  }

  return (
    <div className='page__content'>
      <CurrentUserContext.Provider value={currentUser}>

      <Header isLoggedIn={isLoggedIn} useremail={email} signOutClick={signOutClick} />
      
        <Switch>

          <ProtectedRoute
            exact path='/'
            isLoggedIn={isLoggedIn}
            component={() => <Main 
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onBtnDelete={handlePopupConfirmationClick}
            />}
          />

          <ProtectedRoute
            exact path='/'
            isLoggedIn={isLoggedIn}
            component={Footer}
          />

          <Route path='/sign-up'>
            <Register handleClick={handleInfoTooltipClick} setSuccess={setSuccess}/>          
          </Route>

          <Route path='/sign-in'>
            <Login handleLogin={handleLogin}/>
          </Route>

          {/* <Route exact path='/'>
            { isLoggedIn ? <Redirect to='/my-profile' /> : <Redirect to='sign-in' /> }
          </Route> */}

          {/* <Route path='*'>
            <div style={{color: "#FF8C00"}}>404</div>
          </Route> */}

        </Switch>

        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} isSuccess={isSuccess}/>

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
