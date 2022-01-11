import React from 'react';
import { useForm } from '../hooks/useForm';

function Login(props) {

  const {values, errors, isValid, handleChange} = useForm();

  //вход в систему по клику на сабмит
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onLogin(values.email, values.password);
      
  }

  return (
    <>
      <section className='sign-in'>
        <form className='form form_color_white' name='sign-in'  onSubmit={handleSubmit} noValidate >
        <h2 className='form__title form__title_place_sign-in'>Вход</h2>
        <div className="form__items form__items_color_white">
          <input className='form__item form__item_color_white' id='user-email' type='email' name='email' placeholder='Email' value={values.email || ''} onChange={handleChange} required />
          <span className="form__error">{!isValid && errors.email}</span>
          <input className='form__item form__item_color_white' id='password' type='password' name='password' placeholder='Пароль' value={values.password || ''} onChange={handleChange} required />
          <span className="form__error">{!isValid && errors.password}</span>
        </div>
          <button className='form__button form__button_color_white' type='submit'>Войти</button>
        </form>
      </section>
    </>
  )
}

export default Login