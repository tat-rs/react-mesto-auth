import React from 'react';

function Footer() {

  const currentYear = new Date().getFullYear(); //сохранен текущий год в переменной
 
  return (
    <>
      <footer className='footer page__section'>
        <p className='footer__author'>&copy; {currentYear} Mesto Russia</p>
      </footer>
    </>
  );
}

export default Footer;