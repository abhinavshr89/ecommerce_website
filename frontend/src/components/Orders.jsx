import { useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const Orders = () => {
  const { orders, getOrders ,deleteOrder} = useOrderStore();
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  console.log(orders);
  if(orders.length===0){
    return (
      <div className="flex justify-center  h-screen">
        <h1 className="text-3xl font-semibold">No Orders</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6 lg:w-1/2 p-2 m-auto ">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col   justify-between items-center border border-gray-800 rounded-md p-2 gap-2 bg-gray-800"
          >
            <div className="flex max-sm:flex-col w-full gap-3">
              <div className="flex flex-col justify-start items-start bg-emerald-700 h-fit max-sm:mr-auto p-2 rounded-2xl">
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

            <button className="p-3 bg-red-700 rounded-lg ml-auto" 
            onClick={()=>deleteOrder(order._id)}>Delete Order</button>
    
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
