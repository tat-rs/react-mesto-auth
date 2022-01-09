import React from 'react';
import { useHistory } from 'react-router-dom'
import { useForm } from '../utils/useForm';
import auth from '../utils/auth';

function Login(props) {

  const history = useHistory()

  const {values, errors, isValid, handleChange, setValues} = useForm();

  function handleSubmit(evt) {
    evt.preventDefault()
    auth.authorize(values.email, values.password)
      .then((data) => {
        if (data.token){
          localStorage.setItem('token', data.token);
          return data;
        }
      })
      .then((data) => {
        if(data.token) {
          setValues({})
          props.handleLogin()
          history.push('/')
        }
      })
      .catch(() => {
        props.handleClick();
        props.setSuccess(false)
      })
      
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