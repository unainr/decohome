"use client";
import React, { useState } from "react";
import { Eye, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

interface MainCardPProps {
  id: number;
  productimg: string;
  productname: string;
  price: number;
  compare: number;
  selectedProduct?: any;
  onProductSelect: () => void;
  onQuantityChange: (productId: number, newQuantity: number) => void;
}

const MainCardP: React.FC<MainCardPProps> = ({
  id,
  productimg,
  productname,
  price,
  compare,
  selectedProduct,
  onProductSelect,
  onQuantityChange,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(
    selectedProduct ? selectedProduct.quantity : 1
  );

  const handleAddToCart = () => {
    addToCart({
      id,
      productimg,
      productname,
      price,
      quantity,
    });
    setQuantity(1); // Reset quantity after adding to cart
  };

  const increaseQuantity = () => {
    setQuantity((prev:any) => {
      const newQuantity = prev + 1;
      onQuantityChange(id, newQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev:any) => {
      const newQuantity = Math.max(prev - 1, 1); // Prevent quantity from going below 1
      onQuantityChange(id, newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="flex flex-col rounded-lg shadow-lg max-w-sm w-full mx-auto mb-6 transition-transform transform hover:translate-y-2 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
        <img
          src={productimg}
          alt={productname}
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{productname}</h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold">Rs {price}</p>
          {compare > price && (
            <p className="text-sm text-gray-500 line-through">Rs {compare}</p>
          )}
        </div>

        {/* Quantity Control & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/shop/${id}`}>
              <Button
                variant="default"
                className="flex items-center justify-center rounded-full w-12 h-12 transition duration-200 ease-in-out shadow-lg"
              >
                <Eye className="w-6 h-6" />
              </Button>
            </Link>
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 border rounded-lg focus:outline-none transition"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 border rounded-lg focus:outline-none transition"
            >
              +
            </button>
          </div>

          <Button variant="destructive" onClick={handleAddToCart}>
            <ShoppingBasket className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainCardP;
