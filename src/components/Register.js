import React from "react";
import {Link, useHistory } from 'react-router-dom'
import auth from "../utils/auth";
import InfoToolTip from "./InfoTooltip";

function Register() {

  const history = useHistory()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    auth.register(email, password)
      .then((res) => {
        return res;
      })
      .then(() => {
        /* setPassword('')
        setEmail('') */
        history.push('/sign-in')
      })
      .catch((err) => console.log(err));
      
  }



  return (
    <>
      <section className='sign-up'>
        <form className='form form_color_white' name='sign-in' onSubmit={handleSubmit} >
          <h2 className='form__title form__title_place_sign-in'>Регистрация</h2>
          <input className='form__item form__item_color_white' id='user-email' type='email' name='email' placeholder='Email' value={email || ''} onChange={handleEmailChange} required />
          {/* <span className="form__error">{!isValid && errors.email}</span> */}
          <input className='form__item form__item_color_white' id='password' type='password' name='password' placeholder='Пароль' value={password || ''} onChange={handlePasswordChange} required />
          {/* <span className="form__error form__error_type_password">{!isValid && errors.password}</span> */}
          <button className='form__button form__button_color_white' type='submit' /* disabled={props.disabledButton} */ >Зарегистрироваться</button>
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