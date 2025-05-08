import React, { useState } from "react";
import { useSwipe } from "../hooks/useSwipe";
import { SwipeActions } from "./SwipeActions";
import { Product } from "../data/products";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Check, Star } from "lucide-react";
import Toast from "@/components/ui/moblie-toast";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

interface ProductCardProps {
  product: Product;
  onSwipeLeft?: (product: Product) => void;
  onSwipeRight?: (product: Product) => void;
  onSwipeUp?: (product: Product) => void;
  exit?: "left" | "right" | "up" | null;
  onAddToCart?: (product: Product) => void;
  onLike?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  exit = null,
  onAddToCart,
  onLike,
}: ProductCardProps) {
  const { toast } = useToast();
  const [isExiting, setIsExiting] = useState(false);

  const handleSwipeLeft = () => {
    setIsExiting(true);
    setTimeout(() => {
      onSwipeLeft?.(product);
    }, 300);
  };

  const handleSwipeRight = async () => {
    setIsExiting(true);
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      setTimeout(() => {
        onSwipeRight?.(product);
        toast({
          title: "Product Liked",
          description: `${product.name} has been added to your favorites.`,
        });
      }, 300);
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  };

  const handleSwipeUp = async () => {
    setIsExiting(true);
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
      setTimeout(() => {
        onSwipeUp?.(product);
        Toast({message: `${product.name} has been added to your cart.`, type: "success"})
      }, 300);
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  };

  const { elementRef, swipe, style } = useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    onSwipeUp: handleSwipeUp,
  });

  // If triggered programmatically (from buttons)
  let animationClass = "";
  if (exit === "left") animationClass = "animate-swipe-left";
  if (exit === "right") animationClass = "animate-swipe-right";
  if (exit === "up") animationClass = "animate-swipe-up";

  const {
    name,
    price,
    originalPrice,
    discountPercentage,
    description,
    imageUrl,
    image,
    brand,
    category,
    rating,
  } = product;

  // Use imageUrl if available, otherwise fall back to image
  const productImage = imageUrl || image;

  return (
    <div
      ref={elementRef}
      className={`swipe-card ${animationClass}`}
      style={animationClass ? {} : style}
    >
      <img src={productImage} alt={name} className="swipe-image" />
      <SwipeActions direction={swipe.direction} isDragging={swipe.isDragging} />
      {discountPercentage && discountPercentage > 0 && (
        <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
          -{discountPercentage}%
        </div>
      )}

      <div className="swipe-content">
        <span className="bg-primary/80 text-white text-xs px-2 py-0.5 rounded-full">
          {brand}
        </span>
        <span className="bg-secondary/50 hover:bg-secondary/70 capitalize border-secondary text-xs px-2 py-0.5 m-2 gap-2 rounded-full">
        {category || "Fashion"}
        </span>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold line-clamp-1 capitalize">
            {name ?? "Unnamed Product"}
          </h2>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-white">
            ₹{price.toLocaleString()}
          </span>

          {originalPrice && originalPrice > price && (
            <span className="text-sm line-through text-gray-400">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* {rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        )} */}

        {/* {description && (
          <p className="text-sm line-clamp-2 opacity-90 mb-3">{description}</p>
        )} */}


      </div>
    </div>
  );
}
