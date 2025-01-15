import  { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import {motion} from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';


const ProductsPage = () => {
    const {products,fetchAllProducts} = useProductStore();
    const {searchterm} = useParams();
    
    useEffect(()=>{
        fetchAllProducts();
    },[fetchAllProducts])
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchterm.toLowerCase())
    );

return (
     <div className='mt-[100px] p-5'>
            <motion.div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${Math.min(filteredProducts.length, 4)} gap-6 justify-items-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {filteredProducts?.length === 0 && (
                    <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                        No products found
                    </h2>
                )}

{filteredProducts?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </motion.div>
     </div>
)
}

export default ProductsPage