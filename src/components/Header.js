import React from 'react';
import headerLogo from '../images/logo.svg'
import {Link, useLocation} from 'react-router-dom'

function Header(props) {

  const location = useLocation();

  const link = (location.pathname === '/' || location.pathname === '/sign-up') ? '/sign-in' : '/sign-up'; //адрес ссылки
  const textLink = (location.pathname === '/') ? 'Выйти' : (location.pathname === '/sign-up') ? 'Войти' : 'Регистрация'; //заголовок ссылки
  const classLink = (`header__link-push ${props.isLoggedIn ? 'header__link-push_color_grey' : ''}`); //класс ссылки

  //выход из профиля
  function signOut(){
    props.signOutClick()
  };

  
  //вернули разметку
  return (
    <>
      <header className='header page__header'>
        <a className='logo link' href='https://tat-rs.github.io/mesto-react/'>
          <img className='header__logo' src={headerLogo} alt="Логотип" />
        </a>

        <div className='header__container'>
          {props.isLoggedIn ? (<p className='header__user'>{props.useremail}</p>) : ''}
          <Link to={link} className={classLink} onClick={signOut}>{textLink}</Link>
        </div>

      </header>
    </>
  );
}

export default Header;
