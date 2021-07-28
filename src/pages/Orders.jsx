import Card from '../components/Card';
function Orders() {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои заказы </h1>
      </div>

      <div className="d-flex flex-wrap">
        {[].map((item, index) => (
          <Card key={index} onFavorite={false} favorited={true} {...item} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
