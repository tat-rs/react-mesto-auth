import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConfirmation(props) {

  const [loader, setLoader] = React.useState(props.textOfButton) //текст кнопки сабмита

  React.useEffect(() => {
    setLoader(props.textOfButton)
  }, [props.isOpen, props.textOfButton])

  //функция удаления карточки
  function removeCard(evt) {
    evt.preventDefault()
    props.removeCard(props.card) //передаем текущую карточку в функцию удаления
    setLoader('Удаление...')
  }

  return (
    <>
      <PopupWithForm name="delete-confirmation" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} button={loader} onSubmit={removeCard} />
    </>
  )

}

export default PopupConfirmation