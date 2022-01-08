import React from 'react';
import headerLogo from '../images/logo.svg'
import {Link} from 'react-router-dom'

function Header(props) {

  //вернули разметку
  return (
    <>
      <header className='header page__header'>
        <a className='logo link' href='https://tat-rs.github.io/mesto-react/'>
          <img className='header__logo' src={headerLogo} alt="Логотип" />
        </a>
        <div>
          {/* {!props.isloggedIn && <Link to='/sign-up' className='header__link link'>Регистрация</Link>} */}
          <h3>{props.useremail}</h3>
        </div>
      </header>
    </>
  );
}

export default Header;
