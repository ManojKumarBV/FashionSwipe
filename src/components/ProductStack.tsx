import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../data/products";
import { Button } from "@/components/ui/button";
import { Heart, X, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useTouch } from "../hooks/useTouch";

interface ProductStackProps {
  onAddToCart?: (count: number) => void;
  onLike?: (count: number) => void;
}

export default function ProductStack({ onAddToCart, onLike }: ProductStackProps) {
  const { handleTouchStart, handleTouchEnd } = useTouch();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [exitDirection, setExitDirection] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handlePass = () => {
    setExitDirection(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = (product) => {
    setExitDirection(null);
    setLiked((prev) => [...prev, product]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAddToCart = (product) => {
    setExitDirection(null);
    setCart((prev) => [...prev, product]);
    setCurrentIndex((prev) => prev + 1);
  };

  const triggerPass = () => {
    setExitDirection("left");
    setTimeout(() => {
      handlePass();
    }, 300);
  };

  const triggerLike = () => {
    onLike?.(1);
    setExitDirection("right");
    setTimeout(() => {
      handleLike(currentProduct);
    }, 300);
  };

  const triggerAddToCart = () => {
    onAddToCart?.(1);
    setExitDirection("up");
    setTimeout(() => {
      handleAddToCart(currentProduct);
    }, 300);
  };

  if (loading) {
    return (
      <div className="card-container flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2">Loading products...</p>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];
  const hasMoreProducts = currentIndex < products.length;

  if (!hasMoreProducts) {
    return (
      <div className="card-container h-full flex justify-center items-center">
        <div className="text-center animate-fade-in bg-card p-6 rounded-xl max-w-md w-full shadow-lg">
          <h2 className="text-2xl font-bold mb-4">No More Products</h2>
          <p className="mb-6 text-muted-foreground">
            You've viewed all available products.
          </p>

          <div className="space-y-4">
            {liked.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Liked Products: {liked.length}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {liked.map((product) => (
                    <Badge
                      key={product.id}
                      variant="outline"
                      className="border-green-500"
                    >
                      {product.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {cart.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Cart: {cart.length} items
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {cart.map((product) => (
                    <Badge
                      key={product.id}
                      variant="outline"
                      className="border-primary"
                    >
                      {product.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={() => {
                setCurrentIndex(0);
                setLiked([]);
                setCart([]);
                onLike?.(-liked.length || 0);
                onAddToCart?.(-cart.length || 0);
              }}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              Back to shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-container relative h-full flex justify-center items-center">
      <ProductCard
        product={currentProduct}
        onSwipeLeft={handlePass}
        onSwipeRight={() => {
          handleLike(currentProduct);
          onLike?.(1);
          console.log('You have liked the product!')
        }}
        onSwipeUp={() => {
          handleAddToCart(currentProduct);
          onAddToCart?.(1);
          console.log('Added to cart!');
        }}
        exit={exitDirection}
      />

      <div className="fixed bottom-14 left-0 right-0 flex justify-center items-center gap-6">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              className="action-button w-14 h-14 bg-white border-4 border-red-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              onClick={triggerPass}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <X size={25} className="text-red-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pass</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              className="action-button w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              onClick={triggerAddToCart}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <ShoppingCart size={30} className="text-primary" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to Cart</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              className="action-button w-14 h-14 bg-white border-4 border-green-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              onClick={triggerLike}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Heart size={25} className="text-green-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Like</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
