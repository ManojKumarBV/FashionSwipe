
import { useState, useRef, useEffect } from 'react';

type SwipeDirection = 'left' | 'right' | 'up' | null;
type SwipeHandlers = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
};

interface UseSwipeProps extends SwipeHandlers {
  threshold?: number;
}

interface SwipeState {
  direction: SwipeDirection;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeUp, threshold = 100 }: UseSwipeProps = {}) {
  const [swipe, setSwipe] = useState<SwipeState>({
    direction: null,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
  });
  
  const startX = useRef(0);
  const startY = useRef(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    startX.current = clientX;
    startY.current = clientY;
    setSwipe(prev => ({ ...prev, isDragging: true }));
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!swipe.isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const offsetX = clientX - startX.current;
    const offsetY = clientY - startY.current;
    
    // Determine which direction is dominant
    const absX = Math.abs(offsetX);
    const absY = Math.abs(offsetY);
    
    let direction: SwipeDirection = null;
    
    if (absX > absY && absX > 20) {
      direction = offsetX > 0 ? 'right' : 'left';
    } else if (absY > absX && absY > 20) {
      direction = offsetY < 0 ? 'up' : null; // Only track upward swipes
    }
    
    setSwipe({
      direction,
      offsetX,
      offsetY,
      isDragging: true
    });
  };

  const handleTouchEnd = () => {
    const { direction, offsetX, offsetY } = swipe;
    
    // Calculate distance to determine if swipe should complete
    const distance = direction === 'up' 
      ? Math.abs(offsetY) 
      : Math.abs(offsetX);
    
    if (distance >= threshold) {
      // Trigger the appropriate action based on swipe direction
      if (direction === 'left' && onSwipeLeft) {
        onSwipeLeft();
      } else if (direction === 'right' && onSwipeRight) {
        onSwipeRight();
      } else if (direction === 'up' && onSwipeUp) {
        onSwipeUp();
      }
    }
    
    // Reset state
    setSwipe({
      direction: null,
      offsetX: 0,
      offsetY: 0,
      isDragging: false
    });
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const opts = { passive: false };
    element.addEventListener('touchstart', handleTouchStart, opts);
    element.addEventListener('touchmove', handleTouchMove, opts);
    element.addEventListener('touchend', handleTouchEnd);
    
    element.addEventListener('mousedown', handleTouchStart);
    element.addEventListener('mousemove', handleTouchMove);
    element.addEventListener('mouseup', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      element.removeEventListener('mousedown', handleTouchStart);
      element.removeEventListener('mousemove', handleTouchMove);
      element.removeEventListener('mouseup', handleTouchEnd);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp]);

  return {
    elementRef,
    swipe,
    ...swipe,
    style: {
      transform: swipe.isDragging 
        ? `translate(${swipe.offsetX}px, ${swipe.offsetY}px) rotate(${swipe.offsetX * 0.1}deg)` 
        : 'translate(0, 0)',
      transition: swipe.isDragging ? 'none' : 'transform 0.3s ease'
    }
  };
}
