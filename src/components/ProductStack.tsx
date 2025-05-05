import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product, getProducts } from "../data/products";
import { Button } from "@/components/ui/button";
import { Heart, X, ShoppingCart } from "lucide-react";

export default function ProductStack() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [exitDirection, setExitDirection] = useState<
    "left" | "right" | "up" | null
  >(null);

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

  const handlePass = (product: Product) => {
    setExitDirection(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = (product: Product) => {
    setExitDirection(null);
    setLiked((prev) => [...prev, product]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleAddToCart = (product: Product) => {
    setExitDirection(null);
    setCart((prev) => [...prev, product]);
    setCurrentIndex((prev) => prev + 1);
  };

  const triggerPass = () => {
    setExitDirection("left");
    setTimeout(() => {
      handlePass(currentProduct);
    }, 300);
  };

  const triggerLike = () => {
    setExitDirection("right");
    setTimeout(() => {
      handleLike(currentProduct);
    }, 300);
  };

  const triggerAddToCart = () => {
    setExitDirection("up");
    setTimeout(() => {
      handleAddToCart(currentProduct);
    }, 300);
  };

  if (loading) {
    return (
      <div className="card-container flex items-center justify-center">
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
      <div className="card-container">
        <div className="text-center animate-fade-in bg-card p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">No More Products</h2>
          <p className="mb-6 text-gray-400">
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
    <div className="card-container">
      <ProductCard
        product={currentProduct}
        onSwipeLeft={handlePass}
        onSwipeRight={handleLike}
        onSwipeUp={handleAddToCart}
        exit={exitDirection}
      />

      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-6">
        <button
          className="action-button w-14 h-14 bg-white border-4 border-red-500 flex items-center justify-center"
          onClick={triggerPass}
        >
          <X size={25} className="text-red-500" />
        </button>

        <button
          className="action-button w-16 h-16 bg-white border-4 border-primary flex items-center justify-center"
          onClick={triggerAddToCart}
        >
          <ShoppingCart size={30} className="text-primary" />
        </button>

        <button
          className="action-button w-14 h-14 bg-white border-4 border-green-500 flex items-center justify-center"
          onClick={triggerLike}
        >
          <Heart size={25} className="text-green-500" />
        </button>
      </div>
    </div>
  );
}

function Badge({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant || "default"]} ${
        className || ""
      }`}
    >
      {children}
    </span>
  );
}
