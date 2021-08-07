import Info from '../Info';
import React from 'react';
import { AppContext } from '../../App';

import axios from 'axios';
import styles from './Drawer.module.scss';
const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ onOpenCard, items = [], onRemove, opened }) {
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoad, setIsLoad] = React.useState(null);
  const { setCardItems, cardItems } = React.useContext(AppContext);

  const totalPrice = cardItems.reduce((sum, obj) => Number(obj.price) + sum, 0);
  const onClickOrder = async () => {
    try {
      setIsLoad(true);
      const { data } = await axios.post('https://60ef5b67f587af00179d39e3.mockapi.io/orders', {
        items: cardItems,
      });

      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCardItems([]);
      for (let i = 0; i < cardItems.length; i++) {
        const item = cardItems[i];
        await axios.delete('https://60ef5b67f587af00179d39e3.mockapi.io/cart/' + item.id);

        await delay();
      }
    } catch {
      alert('не удалось');
    }
    setIsLoad(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h3 className="mb-30 d-flex justify-between ">
          корзина
          <img onClick={onOpenCard} src="img/delete.svg" className="removeBtn cu-p" alt="" />
        </h3>
        {items.length > 0 ? (
          <>
            <div className="d-flex flex-column flex">
              <div className="items flex">
                {items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                    <div
                      style={{ backgroundImage: `url(${obj.url})` }}
                      className="cartItemImg"></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      src="img/delete.svg"
                      className="removeBtn"
                      onClick={() => onRemove(obj.id)}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.ceil(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoad} className="greenButton " onClick={onClickOrder}>
                оформить заказ
                <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            image={isOrderCompleted ? 'img/complete-order.png' : 'img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
