import React from "react";
import {Link} from 'react-router-dom'

function Register() {
  return (
    <>
      <section className='sign-up'>
        <form className='form form_color_white' name='sign-in' /* onSubmit={props.onSubmit} */ noValidate>
          <h2 className='form__title form__title_place_sign-in'>Регистрация</h2>
          <input className='form__item form__item_color_white' id='user-email' type='email' name='user-email' placeholder='Email' /* value={values.name || ''} onChange={handleChange} */ required />
          <input className='form__item form__item_color_white' id='password' type='password' name='password' placeholder='Пароль' /* value={values.about || ''} onChange={handleChange} */ required />
          <button className='form__button form__button_color_white' type='submit' /* disabled={props.disabledButton} */>Зарегистрироваться</button>
        </form>
        <div className="sign-up__container">
          <p className='sign-up__text'>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="sign-up__link link">Войти</Link>
        </div>
      </section>
    </>
  )
}

export default Register