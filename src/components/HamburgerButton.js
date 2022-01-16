import React from "react";

function HamburgerButton(props) {
  return (
    <div className='button link' onClick={props.handleMenuClick}>
      <span className={`button__line ${props.isMenuOpen ? 'button__line_left' : '' }`}/>
      <span className={`button__line ${props.isMenuOpen ? 'button__line_hidden' : '' }`}/>
      <span className={`button__line ${props.isMenuOpen ? 'button__line_right' : '' }`}/>
    </div>
  )
}

export default HamburgerButton