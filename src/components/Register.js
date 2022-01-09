import React from "react";
import {Link, useHistory } from 'react-router-dom'
import auth from "../utils/auth";
import { useForm } from "../utils/useForm";

function Register(props) {

  const history = useHistory()

  const {values, errors, isValid, handleChange, setValues} = useForm();

  function handleSubmit(evt) {
    evt.preventDefault()
    auth.register(values.email, values.password)
      .then((res) => {
        return res;
      })
      .then((res) => {
        if(res) {
          props.handleClick();
          props.setSuccess(true);
          setValues({})
          history.push('/sign-in')
        } else {
          props.handleClick();
          props.setSuccess(false)
        }
      })
      .catch((err) => console.log(err));
      
  }

  return (
    <>
      <section className='sign-up'>
        <form className='form form_color_white' name='sign-in' onSubmit={handleSubmit} noValidate>
          <h2 className='form__title form__title_place_sign-in'>Регистрация</h2>
          <div className="form__items form__items_color_white">
            <input className='form__item form__item_color_white' id='user-email' type='email' name='email' placeholder='Email' value={values.email || ''} onChange={handleChange} required />
            <span className="form__error">{!isValid && errors.email}</span>
            <input className='form__item form__item_color_white' id='password' type='password' name='password' placeholder='Пароль' value={values.password || ''} onChange={handleChange} required />
            <span className="form__error form__error_type_password">{!isValid && errors.password}</span>
          </div>
          <button className='form__button form__button_color_white' type='submit' >Зарегистрироваться</button>
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