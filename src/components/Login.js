import React from 'react';

function Login() {

  return (
    <>
      <section className='sign-in'>
        <form className='form form_color_white' name='sign-in' /* onSubmit={props.onSubmit} */ noValidate>
          <h2 className='form__title form__title_place_sign-in'>Вход</h2>
          <input className='form__item form__item_color_white' id='user-email' type='email' name='email' placeholder='Email' /* value={values.email || ''} onChange={handleChange} */ required />
          {/* <span className="form__error">{!isValid && errors.email}</span> */}
          <input className='form__item form__item_color_white' id='password' type='password' name='password' placeholder='Пароль' /* value={values.password || ''} onChange={handleChange} */ required />
          {/* <span className="form__error form__error_type_password">{!isValid && errors.password}</span> */}
          <button className='form__button form__button_color_white' type='submit' /* disabled={props.disabledButton} */>Войти</button>
        </form>
      </section>
    </>
  )
}

export default Login