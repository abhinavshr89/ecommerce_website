import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    // check if featuredProducts is present in the redis
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not present in the redis then fetch from the database
    // lean() -> will return plain javascript object instead of mongoose document
    // which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "Featured Products not found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const createProduct = async (req, res) => {
  try{
    const {name , description , price , image , category} = req.body;
    let cloudinaryResponse = null;
    if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:"products"});
    }
    const product = Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url? cloudinaryResponse.secure_url : "",
      category
    });

    res.status(201).json(product);

  }catch(error){
    console.log("Error in createProduct",error);
    res.status(500).json({message:"Server Error"});
  }
}

export const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try{
                await cloudinary.uploader.destroy(`products/${publicId}`);
            }catch(error){
                console.log("Error in deleting image from cloudinary",error);

            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted successfully"});

    }catch(error){
        console.log("Error in deleteProduct",error);
        res.status(500).json({message:"Server Error"});
    }

}


export const getRecommendedProducts = async (req, res) => {
    try{
        const products = await Product.aggregate([
            { $sample: { size: 5 } }
        ],{
            $project:{
                _id:1,
                name:1,
                image:1,
                description:1,
                price:1
            }
        });

        res.json(products);
    }
    catch(error){
        console.log("Error in getRecommendedProducts",error);
        res.status(500).json({message:"Server Error"});
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try{
        const products = await Product.find({category});
        res.json(products);
    }catch(error){
        console.log("Error in getProductsByCategory",error);
        res.status(500).json({message:"Server Error"});
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();
        await updatedFeatureProductsCache();

        res.json(updatedProduct)

    } catch (error) {
        console.log("Error in toggleFeaturedProduct", error);
        res.status(500).json({ message: "Server Error" });
    }
}

async function updatedFeatureProductsCache(){
    try{
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products",JSON.stringify(featuredProducts));
    }catch(error){
        console.log("Error in updatedFeatureProductsCache",error);
    }
}
