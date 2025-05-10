import React, { useState } from "react";
import { useSwipe } from "../hooks/useSwipe";
import { SwipeActions } from "./SwipeActions";
import { Product } from "../data/products";
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

  let animationClass = "";
  if (exit === "left") animationClass = "animate-swipe-left";
  if (exit === "right") animationClass = "animate-swipe-right";
  if (exit === "up") animationClass = "animate-swipe-up";

  const {
    name,
    price,
    originalPrice,
    discountPercentage,
    imageUrl,
    image,
    brand,
    category,
  } = product;

  const productImage = imageUrl || image;

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div
        ref={elementRef}
        className={`swipe-card ${animationClass} w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[450px] sm:h-[550px] md:h-[650px] lg:h-[500px] xl:h-[650px] mx-auto relative rounded-xl overflow-hidden shadow-lg`}
        style={animationClass ? {} : style}
      >

        <img
          src={productImage}
          alt={name}
          className="w-full h-full object-cover"
        />

        <SwipeActions
          direction={swipe.direction}
          isDragging={swipe.isDragging}
        />

        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
          <div className="flex gap-2 mt-1">
            <span className="bg-primary/80 text-xs px-2 py-0.5 rounded-full">
              {brand}
            </span>
            <span className="bg-secondary/50 capitalize border-secondary text-xs px-2 py-0.5 rounded-full">
              {category || "Fashion"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold line-clamp-1 capitalize">
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

        </div>
      </div>
    </div>



  );
}
