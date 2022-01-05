import React from 'react';
import headerLogo from '../images/logo.svg'

function Header() {

  //вернули разметку
  return (
    <>
      <header className='header page__header'>
        <a className='logo link' href='https://tat-rs.github.io/mesto-react/'>
          <img className='header__logo' src={headerLogo} alt="Логотип" />
        </a>
      </header>
    </>
  );
}

export default Header;
