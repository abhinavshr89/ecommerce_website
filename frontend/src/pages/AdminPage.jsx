import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";


const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
];
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const {fetchAllProducts,products} = useProductStore();


  useEffect(() => {
	fetchAllProducts();
  }, [fetchAllProducts]);

  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 mt-[100px]">
      <motion.h1
					className='text-4xl font-bold  text-emerald-400 text-center mt-4'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>
      </div>

      <div className='flex justify-center mt-4 mb-6'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-emerald-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>

        {activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList  />}
    </div>
  );
};

export default AdminPage;
