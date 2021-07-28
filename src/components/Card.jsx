import React from 'react';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../App';
function Card({
  id,
  price,
  url,
  title,
  index,
  onPlus,
  onFavorite,
  favorited = false,

  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isAddedFavorite, setIsAddedFavorite] = React.useState(favorited);
  const onClickPlus = () => {
    onPlus({ price, url, title, id });
  };
  const onAddFavorite = () => {
    onFavorite({ price, url, title, id });
    setIsAddedFavorite(!isAddedFavorite);
  };

  return (
    <>
      {loading ? (
        <ContentLoader
          className="card"
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <div className="card" key={index}>
          <div className="favorite">
            <img
              onClick={onAddFavorite}
              alt="like"
              src={isAddedFavorite ? 'img/heart-liked.svg' : 'img/heart-unliked.svg'}
            />
          </div>
          <img src={url} width={133} height={112} alt="botinok" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            <img
              className="button"
              onClick={onClickPlus}
              src={isItemAdded(id) ? 'img/btn.svg' : 'img/btn-plus.svg'}
              width={11}
              height={11}
              alt="plus"
            />
          </div>
        </div>
      )}
    </>
  );
}
export default Card;
