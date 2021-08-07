import React from 'react';
import { AppContext } from '../App';

function Info({ title, description, image }) {
  const { setCardOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="empty" />
      <h2>{title}</h2>
      <p className="pacity-6">{description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="img/left-arrow.png" alt="arrow" />
        вернуться назад
      </button>
    </div>
  );
}
export default Info;
