import { useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const Orders = () => {
  const { orders, getOrders, deleteOrder } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  
  if (orders.length === 0) {
    return (
      <div className="flex justify-center  h-screen">
        <h1 className="text-3xl font-semibold">No Orders</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="space-y-6 lg:w-2/3 p-4 m-auto bg-gray-800 rounded-lg shadow-lg">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col justify-between items-center border border-gray-700 rounded-md p-4 gap-4 bg-gray-700 shadow-md"
          >
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col justify-start items-start bg-emerald-600 h-fit p-4 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-white border-b-2">
                  Order ID: {order._id}
                </h3>
                <h3 className="text-xl font-semibold text-white">
                  User Id: {order.user._id}
                </h3>
                <h4 className="font-semibold text-white">
                  User Name : {order.user.name}
                </h4>
                <p className="text-lg text-white">
                  Total: ₹{order.totalAmount}
                </p>
              </div>
              <div>
                <table className="min-w-full border  overflow-hidden ">
                  <thead>
                    <tr className="bg-gray-600 text-white">
                      <th className="py-2 px-4">Product Name</th>
                      <th className="py-2 px-4">Price</th>
                      <th className="py-2 px-4">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr
                        key={product.product}
                        className="bg-gray-700 text-white"
                      >
                        <td className="border px-4 py-2">
                          {product.product.name}
                        </td>
                        <td className="border px-4 py-2">₹{product.price}</td>
                        <td className="border px-4 py-2">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              className="p-3 bg-red-900 rounded-lg ml-auto hover:bg-red-900 transition duration-300 shadow-lg transform hover:translate-y-1 hover:shadow-2xl"
              onClick={() => deleteOrder(order._id)}
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
