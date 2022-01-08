import React from 'react';
import headerLogo from '../images/logo.svg'
import {Link} from 'react-router-dom'

function Header(props) {

  function signOut(){
    props.signOutClick()
  }

  //вернули разметку
  return (
    <>
      <header className='header page__header'>
        <a className='logo link' href='https://tat-rs.github.io/mesto-react/'>
          <img className='header__logo' src={headerLogo} alt="Логотип" />
        </a>

        {props.isLoggedIn ? (
          <div className='header__container'>
          <p className='header__user'>{props.useremail}</p>
          <Link to='/sign-in' className='header__link-push' onClick={signOut}>Выйти</Link>
        </div>
        ) : ''}

      </header>
    </>
  );
}

export default Header;
