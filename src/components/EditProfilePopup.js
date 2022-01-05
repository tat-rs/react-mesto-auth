import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {useForm} from '../utils/useForm'

function EditProfilePopup(props) {

  const currentUserData = React.useContext(CurrentUserContext); //подписываемся на контекст

  const [loader, setLoader] = React.useState(props.textOfButton); //начальное значение кнопки


  const {values, errors, isValid, handleChange, handleReset} = useForm();

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    values.name = currentUserData.name;
    values.about = currentUserData.about;
    setLoader(props.textOfButton);
  }, [currentUserData, props.isOpen, props.textOfButton]); 

  function close() {
    handleReset();
    props.onClose()
  }

  //функция обновления данных пользователя по сабмиту
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
  
    // Передаём значения имени и описания во внешний обработчик
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });

    setLoader('Сохранение...');
    
  }

  return (
    <>
      <PopupWithForm name='edit' title='Редактировать профиль' textOfButton='Сохранить' isOpen={props.isOpen} onClose={close} onSubmit={handleSubmit} button={loader} disabledButton={!isValid}>

        <input className="form__item form__item_type_name" id="name-profile" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" value={values.name || ''} onChange={handleChange} required />
        <span className="form__error name-profile-error">{!isValid && errors.name}</span>
        <input className="form__item form__item_type_desc" id="desc-profile" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" value={values.about || ''} onChange={handleChange} required />
        <span className="form__error desc-profile-error">{!isValid && errors.about}</span>

      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup