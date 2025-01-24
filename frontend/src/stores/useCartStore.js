import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  guestCart: [],
  total: 0,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  clearCart: async () => {
    set({ cart: [], total: 0, subtotal: 0 });
  },
  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  addToGuestCart: async (product) => {
    try {
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });

      localStorage.setItem("cart", JSON.stringify(get().cart));
      console.log("cart", get().cart);
      toast.success("Product added to cart");
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  updateGuestCartQuantity: async (productId, quantity) => {
    set((prevState) => ({
      cart: prevState.cart
        .map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0), // Remove items with quantity 0
    }));
    localStorage.setItem("cart", JSON.stringify(get().cart));
    get().calculateTotals();
  },
  removeFromCart: async (productId) => {
    await axios.delete(`/cart`, { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));
    localStorage.setItem("cart", JSON.stringify(get().cart));
    get().calculateTotals();
  },
  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },
  setLocalCart: (cart) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    set({ cart: localCart });
  },
  calculateTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    set({ total: subtotal });
  },
  syncCart: async () => {
    try {
      const localCart = get().cart;
      if (localCart) {
        for (const item of localCart) {
          const { _id, quantity } = item;
          for (let i = 0; i < quantity; i++) {
            await axios.post("/cart", { productId: _id });
          }
        }
      }
      set({ cart: [] }); 
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
