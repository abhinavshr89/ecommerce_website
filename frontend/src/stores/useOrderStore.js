import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderStore = create((set, get) => ({
  orders: [],
  userOrders:[],
  getOrders: async () => {
    try {
      const res = await axios.get("/orders");
      set({ orders: res.data });
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  placeOrder: async (products, totalAmount) => {
    try {
      await axios.post("/orders", { products, totalAmount });
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  deleteOrder: async(id)=>{
    try {
      await axios.delete(`/orders/${id}`);
      toast.success("Order deleted successfully");
      get().getOrders();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  getOrderByUser: async()=>{
    try {
      const res = await axios.get("/orders/user-order");
      
      
      set({ userOrders: res.data });
      
      
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  }
}));
