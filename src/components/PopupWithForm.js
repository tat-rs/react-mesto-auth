import React from "react";

function PopupWithForm(props) {

 return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' }`} onMouseDown ={props.onClose}>
        <div className='popup__container' onMouseDown ={(evt) => evt.stopPropagation()}>
          <button className='popup__close link' type='button' aria-label='Закрыть форму' onClick={props.onClose}></button>
          <form className={`popup__form form form_type_${props.name}`} name={`form-${props.name}`} onSubmit={props.onSubmit} noValidate>
            <h2 className="form__title">{`${props.title}`}</h2>
            {props.children}
            <button className={`form__button ${props.disabledButton ? 'form__button_disabled' : ''}`} type="submit" disabled={props.disabledButton}>{props.button}</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;