import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  addToCard,
  onFavorite,
  cardItems,
  isLoading,
}) {
  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)]
        : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    ).map((item, index) => (
      <Card
        {...item}
        key={index}
        onPlus={(obj) => addToCard(obj)}
        onFavorite={(obj) => onFavorite(obj)}
        a
        loading={isLoading}
      />
    ));
  };
 
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        {searchValue ? (
          <h1 className="">Поиск по запросу: {searchValue}</h1>
        ) : (
          <h1 className="">Все кроссовки</h1>
        )}
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="поиск..." />
          {searchValue ? (
            <img
              src="img/delete.svg"
              onClick={() => {
                setSearchValue('');
              }}
              alt="delete"
            />
          ) : null}
        </div>
      </div>
      <div className="d-flex wrap-style">{renderItems()}</div>
    </div>
  );
}
export default Home;
