import { useCart } from "@/components/CartContext"; // Adjust the path as needed

const ProductCard = ({ product }:{product:any}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem:any = {
      id: product.id,
    productimg:product.productimg,
      productname: product.name,
      price: product.price,
      quantity: 1, // Default to adding 1 item
    };
    addToCart(cartItem);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: Rs {product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
