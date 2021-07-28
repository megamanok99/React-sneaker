import React from 'react';
import Card from '../components/Card';
import { AppContext } from '../App';
function Favorites() {
  const { favorites,onFavorite } = React.useContext(AppContext);
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои закладки </h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card key={index} onFavorite={onFavorite} favorited={true} {...item} />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
