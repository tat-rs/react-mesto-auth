import React from "react";

function ImagePopup(props) {
  
  return (
    <>
      <div className={`popup popup_type_image ${props.card.link && 'popup_opened'}`} onClick={props.onClose}>
        <div className="popup__container popup__container_transparent" onClick={(evt) => evt.stopPropagation()}>
          <button className="popup__close link" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <h2 className="popup__subtitle">{props.card.name}</h2>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;