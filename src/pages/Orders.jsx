import axios from 'axios';
import React from 'react';
import { AppContext } from '../App';

import Card from '../components/Card';
function Orders() {
  const { onFavorite, addToCard } = React.useContext(AppContext);
  const url = 'https://60ef5b67f587af00179d39e3.mockapi.io';
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${url}/orders`);
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои заказы </h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card {...item} key={index} loading={isLoading} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
