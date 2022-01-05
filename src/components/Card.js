import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    
  //сохранение данных карточки при клике
  function handleClick() {
    props.onCardClick({
      name: props.card.name, 
      link: props.card.link
    })
  }
  //функция постановки лайка/дизлайка
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  //функция открытия удаления карточки
  function handleDeleteClick() {
    props.onBtnDelete() //открытие попапа подтверждения
    //сохраняем id карточки по которой был клик
    props.onCardClick({
      _id: props.card._id,
    })
  }

  const currentUserData = React.useContext(CurrentUserContext); // подписались на контекст текущих данных пользователя
  
  const isOwner = props.card.owner._id === currentUserData._id; // определяем является ли пользователем текущим

  const cardDeleteButtonClassName = (`cards__delete ${isOwner ? 'cards__delete_visible' : ''}`); // определяем класс кнопки удаления

  const isLiked = props.card.likes.some(i => i._id === currentUserData._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  const cardLikeButtonClassName = (`cards__button ${isLiked ? 'cards__button_active' : ''}`); // определяем класс для кнопки лайка
  
  return (
    <>
      <li className='cards__item'>
        <button className={cardDeleteButtonClassName} type='button' aria-label='Удалить' onClick={handleDeleteClick}></button>
        <img className='cards__image' src={`${props.card.link}`} alt={`${props.card.name}`} onClick={handleClick} />
        <div className='cards__desc'>
          <h2 className='cards__subtitle'>{props.card.name}</h2>
          <div className='cards__container-likes'>
            <button className={cardLikeButtonClassName} type='button' aria-label='Лайк' onClick={handleLikeClick} ></button>
            <p className='cards__sum-likes'>{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;