import { useCartStore } from "../stores/useCartStore";
import { useOrderStore } from "../stores/useOrderStore";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, total } = useCartStore();
  const { placeOrder } = useOrderStore();
 
  const products = cart.map(({_id,price,quantity})=>{
    return {
      product:_id,
      price,
      quantity
    }
  })


  const handlePlaceOrder = async () => {
    await placeOrder(products, total);
  };

  return (
    <div className="my-[100px] max-lg:px-[30px] flex items-center justify-center bg-em">
      <div className="space-y-6 lg:w-1/2">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} checkout={"checkout"} />
          ))}
        </div>
        <hr />
        <div className="flex justify-between text-xl font-semibold">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
        <hr />
        <div className="flex justify-between">
            <Link to="/cart">
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
            Cancel
          </button>
            </Link>
       
          <button
            onClick={handlePlaceOrder}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
