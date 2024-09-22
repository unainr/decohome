"use client";
import React, { useState } from "react";
import { useCart } from "@/components/CartContext";
import { products, products1, products2 } from "../../../components/ProductData";
import { Button } from "@/components/ui/button";

const Page = ({ params }: any) => {
  const { slug } = params; 
  const { addToCart } = useCart(); 
  const [quantity, setQuantity] = useState(1); 

  // Combine all product arrays into one
  const allProducts = [...products, ...products1, ...products2];


  const product = allProducts.find((item) => item.id === parseInt(slug));

 
  const relatedProducts = allProducts
    .filter((item) => item.id !== product?.id) 
    .sort(() => 0.5 - Math.random()) 
    .slice(0, 3); 

  if (!product) {
    return <div>Product not found</div>;
  }

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      productimg: product.productimg,
      productname: product.productname,
      price: product.price,
      quantity,
    });
  };

 
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle decreasing quantity
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
      
        <div className="flex justify-center lg:justify-end">
          <img
            src={product.productimg}
            alt={product.productname}
            className="w-full max-w-lg object-cover rounded-xl shadow-lg"
          />
        </div>
      
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6">{product.productname}</h1>
          
        
          <div className="flex items-center mb-6 space-x-4">
            <span className="text-3xl font-bold ">Rs {product.price}</span>
            {product.compare > product.price && (
              <span className="text-xl line-through">Rs {product.compare}</span>
            )}
          </div>

         
          <p className="leading-relaxed mb-8">
            Enhance your home with this elegant {product.productname}. It's crafted with premium quality materials
            and designed for long-lasting beauty.
          </p>

      
          <div className="flex items-center space-x-6 mb-8">
            <button
              onClick={decreaseQuantity}
              className="font-medium px-4 py-2 rounded-lg"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="font-medium px-4 py-2 rounded-lg"
            >
              +
            </button>
          </div>

        
          <Button variant={"outline"} onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
  <h2 className="text-4xl font-bold mb-8  text-center">Related Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {relatedProducts.map((relatedProduct) => (
      <div
        key={relatedProduct.id}
        className="bg-gradient-to-b  border  rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:-translate-y-2"
      >
        <div className="relative">
          <img
            src={relatedProduct.productimg}
            alt={relatedProduct.productname}
            className="w-full h-64 object-cover"
          />
         
            <span className="absolute top-2 right-2 bg-red-600  text-xs font-bold py-1 px-2 rounded-full">
              New
            </span>
         
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{relatedProduct.productname}</h3>
          <p className=" text-sm mb-3">Rs {relatedProduct.price}</p>
          <p className="text-sm mb-4">A brief description of the product goes here.</p>
          <Button
            variant={"outline"}
             onClick={() =>
              addToCart({
                id: relatedProduct.id,
                productimg: relatedProduct.productimg,
                productname: relatedProduct.productname,
                price: relatedProduct.price,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default Page;
