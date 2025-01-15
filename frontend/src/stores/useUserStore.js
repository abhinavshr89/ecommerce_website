import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";


const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axiosInstance.post("/auth/signup", { name, email, password });
			console.log(res.data);
			
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
     
			toast.error(error.response.data.message);
		}
	},
	login:async({email,password})=>{
		set({loading:true});
		try{
			const res=await axiosInstance.post("/auth/login",{email,password});
			console.log(res.data);
			set({user:res.data,loading:false});
		}catch(error){
			set({loading:false});
			toast.error(error.response.data.message);
		}
	},
	logout:async()=>{
		set({loading:true});
		try{
			await axiosInstance.post("/auth/logout");
			set({user:null,loading:false});
		}catch(error){
			set({loading:false});
			toast.error(error.response.data.message);
		}
	},
	checkAuth:async()=>{
		set({checkingAuth:true});
	
		try{
			const res=await axiosInstance.get("/auth/profile");
			
			set({user:res.data,checkingAuth:false});
		}catch(error){
			set({checkingAuth:false});
			console.log(error.response.data.message);
		}
	}
	// TODO ; Implement the axios Interceptor for refreshing the token
	
}));

export default useUserStore;
