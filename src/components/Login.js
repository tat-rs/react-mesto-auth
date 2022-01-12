import React from 'react';
import AuthForm from './AuthForm';

function Login(props) {

  return (
    <>
      <section className='authorize'>
        <AuthForm title={props.title} onSubmit={props.onLogin} textOfButton={props.textOfButton}/>
      </section>
    </>
  )
}

export default Login