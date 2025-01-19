import { useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const Orders = () => {
  const { orders, getOrders } = useOrderStore();
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  console.log(orders);

  return (
    <div>
      
      <div className="space-y-6 sm:w-1/2 m-auto ">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex max-sm:flex-col   justify-between items-center border rounded-md p-2 gap-2 bg-gray-800"
          >
            <div className="flex flex-col justify-start items-start bg-emerald-700 max-sm:mr-auto p-2 rounded-2xl">
              <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
              <p className="text-lg">Total: ₹{order.totalAmount}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Products</h3>
              <ul>
                {order.products.map((product) => (
                  <li key={product.product}>
                    {product.quantity} x {product.product.name} - ₹
                    {product.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
