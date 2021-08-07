import React from 'react';

import Header from './components/Header';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

import Orders from './pages/Orders';
export const AppContext = React.createContext({});
function App() {
  const [cardOpened, setCardOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cardItems, setCardItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const url = 'https://60ef5b67f587af00179d39e3.mockapi.io';
  React.useEffect(() => {
    async function fetchData() {
      try {
        const cardResponse = await axios.get(`${url}/cart`);
        const favoritesResponse = await axios.get(`${url}/favorite`);
        const itemResponse = await axios.get(`${url}/items`);
        setIsLoading(false);

        setCardItems(cardResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);
  const onRemoveItem = (id) => {
    axios.delete(`${url}/cart/${id}`);
    setCardItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };
  const addToCard = async (obj) => {
    console.log(obj);
    try {
      const findItem = cardItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCardItems((prev) => prev.filter((el) => Number(el.parentId) !== Number(obj.id)));
        await axios.delete(`${url}/cart/${findItem.id}`);
      } else {
        setCardItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`${url}/cart`, obj);
        setCardItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };
  const onFavorite = async (obj) => {
    try {
      if (favorites.find((el) => Number(el.id) === Number(obj.id))) {
        axios.delete(`https://60ef5b67f587af00179d39e3.mockapi.io/favorite/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://60ef5b67f587af00179d39e3.mockapi.io/favorite',
          obj,
        );

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('ne udalos` dobavit`');
    }
  };
  const isItemAdded = (id) => {
    return cardItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  console.log(cardItems);

  return (
    <AppContext.Provider
      value={{
        favorites,
        items,
        cardItems,
        isItemAdded,
        onFavorite,
        setCardOpened,
        setCardItems,
        addToCard,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cardItems}
          onOpenCard={() => setCardOpened(false)}
          onRemove={onRemoveItem}
          opened={cardOpened}
        />
        <Header onOpenCard={() => setCardOpened(true)} />
        <Route exact path="/">
          <Home
            cardItems={cardItems}
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            addToCard={addToCard}
            onFavorite={onFavorite}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
