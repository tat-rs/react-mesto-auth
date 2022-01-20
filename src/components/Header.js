import React from 'react';
import headerLogo from '../images/logo.svg';
import {Link, Route, Switch } from 'react-router-dom';
import HamburgerButton from './HamburgerButton';

function Header(props) {

  //выход из профиля
  function signOut(){
    props.signOutClick()
    props.closeAllPopups()
  };

  return (
    <>

      {props.isMenuOpen && (
        
        <div className='header__container header__container_type_burger-menu'>
          {props.isLoggedIn ? (<p className='header__user'>{props.useremail}</p>) : ''}
          <Link to='/sign-in' className='header__link-push link' onClick={signOut}>Выйти</Link>
        </div>
        )
      }

      <header className='header page__header'>
        <Link className='logo link' to='/'>
          <img className='header__logo' src={headerLogo} alt="Логотип" />
        </Link>

      <Switch>

        <Route exact path='/'>
          <div className='header__container header__container_type_profile-menu'>
            <p className='header__user'>{props.useremail}</p>
            <Link to='/sign-in' className='header__link-push link' onClick={signOut}>Выйти</Link>
          </div>

          <HamburgerButton handleMenuClick={props.handleMenuClick} isMenuOpen={props.isMenuOpen}/>
        
        </Route>

        <Route path='/sign-up'>
          <div className='header__container'>
            <Link to='/sign-in' className='header__link-push link' onClick={signOut}>Войти</Link>
          </div>
        </Route>

        <Route path='/sign-in'>
          <div className='header__container'>
            <Link to='/sign-up' className='header__link-push link header__link-push_color_grey' onClick={signOut}>Регистрация</Link>
          </div>
        </Route>

      </Switch>

      </header>

    </>
  );
}

export default Header;
