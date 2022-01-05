import React from "react";
import { useForm } from "../utils/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [loader, setLoader] = React.useState(props.textOfButton); //начальное значение кнопки

  const {values, errors, isValid, handleChange, handleReset} = useForm();
  
  //очищаем значение инпутов при монтировании
  React.useEffect(() => {
    setLoader(props.textOfButton);
  }, [props.isOpen, props.textOfButton]);

  function close() {
    handleReset();
    props.onClose()
  }

  //передаем новые значения инпутов по сабмиту
  function handleSubmit(evt) {
    // отменяем действие браузера по умолчанию
    evt.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик (название и ссылка на изображение)
    props.onAddPlace({
      subtitle: values.subtitle,
      link: values.link,
    });

    setLoader('Создание...');
    
    close()

  }

  return (
    <>
      <PopupWithForm name='new-card' title='Новое место' textOfButton='Создать' isOpen={props.isOpen} onClose={close} onSubmit={handleSubmit} button={loader} disabledButton={!isValid}>

        <input className="form__item form__item_type_image-subtitle" id="image-subtitle" type="text" name="subtitle" placeholder="Название" minLength="2" maxLength="30" value={values.subtitle || ''} onChange={handleChange} required />
        <span className="form__error image-subtitle-error">{!isValid && errors.subtitle}</span>
        <input className="form__item form__item_type_image-link" id="image-link" type="url" name="link" placeholder="Ссылка на картинку" value={values.link || ''} onChange={handleChange} required />
        <span className="form__error image-link-error">{!isValid && errors.link}</span>

      </PopupWithForm>
    </>
  )
}

export default AddPlacePopup