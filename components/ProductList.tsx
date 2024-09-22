"use client";
import React, { useState } from "react";
import MainCardP from "./MainCardP";
import { products, products1, products2 } from "./ProductData";

const ProductList = ({ productsArrayName }: { productsArrayName: string }) => {
  const [cart, setCart] = useState<any[]>([]);

  // Select the correct product array
  const selectedProducts =
    productsArrayName === "products"
      ? products
      : productsArrayName === "products1"
      ? products1
      : products2;

  // Handle adding product to cart
  const handleProductSelect = (product: any) => {
    const existingProduct = cart.find((item: any) => item.id === product.id);
    if (!existingProduct) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Handle quantity change in cart
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {selectedProducts.map((product: any) => (
        <MainCardP
          key={product.id} // Use the product's unique ID here
          id={product.id} // Pass the actual product ID
          productimg={product.productimg}
          productname={product.productname}
          price={product.price}
          compare={product.compare}
          selectedProduct={cart.find((item) => item.id === product.id)} // Use product.id to match
          onProductSelect={() => handleProductSelect(product)} // Pass the actual product
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </section>
  );
};

export default ProductList;
