import { useState } from "react";

export function useTouch() {
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsTouching(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsTouching(false);
  };

  return {
    isTouching,
    handleTouchStart,
    handleTouchEnd,
  };
}
