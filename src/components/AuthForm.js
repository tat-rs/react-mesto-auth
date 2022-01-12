import React from "react";
import {useForm} from "../hooks/useForm"

function AuthForm(props) {

  const {values, errors, isValid, handleChange} = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit(values.email, values.password);
      
  }
  
  return (
    <>
      <form className='form form_color_white' name='sign-in' onSubmit={handleSubmit} noValidate >
        <h2 className='form__title form__title_place_sign-in'>{props.title}</h2>
        <div className="form__items form__items_color_white">
          <input className='form__item form__item_color_white' id='user-email' type='email' name='email' placeholder='Email' value={values.email || ''} onChange={handleChange} required />
          <span className="form__error">{!isValid && errors.email}</span>
          <input className='form__item form__item_color_white' id='password' type='password' name='password' placeholder='Пароль' value={values.password || ''} onChange={handleChange} required />
          <span className="form__error">{!isValid && errors.password}</span>
        </div>
          <button className='form__button form__button_color_white' type='submit'>{props.textOfButton}</button>
      </form>
    </>
  )
}

export default AuthForm