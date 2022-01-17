import React from "react";

export function useScrollLock() {
  const lockScroll = React.useCallback(() => {

    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth; //ширина скролла 
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
  }, [])

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, [])

  return {
    lockScroll,
    unlockScroll
  }
}
