import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useForm} from '../utils/useForm'

function EditAvatarPopup(props) {

  const [loader, setLoader] = React.useState(props.textOfButton); //начальное значение кнопки

  const {values, errors, isValid, handleChange, handleReset} = useForm();

  //очищаем значение инпутов при монтировании
  React.useEffect(() => {
    setLoader(props.textOfButton);
  }, [props.isOpen, props.textOfButton]);

  function close() {
    handleReset();
    props.onClose();
  }

  //обновляем аватар по сабмиту
  function handleSubmit(evt) {
    // отменяем действие браузера по умолчанию
    evt.preventDefault();
  
    props.onUpdateAvatar({
      avatar: values.avatar,
    });

    setLoader('Сохранение...')

    close()

  } 

  return (
    <>
    <PopupWithForm name='edit-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={close} onSubmit={handleSubmit} button={loader} disabledButton={!isValid}>

      <input className="form__item form__item_type_image-link" id="avatar-link" type="url" name="avatar" placeholder="Ссылка на фото профиля" value={values.avatar || ''} onChange={handleChange} required />
      <span className="form__error avatar-link-error">{!isValid && errors.avatar}</span>

    </PopupWithForm>
    </>
  )
}

export default EditAvatarPopup
