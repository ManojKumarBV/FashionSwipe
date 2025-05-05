
import React from 'react';
import { Heart, X, ShoppingCart } from 'lucide-react';

interface SwipeActionsProps {
  direction: 'left' | 'right' | 'up' | null;
  isDragging: boolean;
}

export function SwipeActions({ direction, isDragging }: SwipeActionsProps) {
  if (!isDragging || !direction) return null;
  
  return (
    <>
      {direction === 'left' && (
        <div className="swipe-overlay bg-red-500/20 flex items-center justify-center">
          <div className="swipe-action-hint pass-hint">
            <X size={32} />
          </div>
        </div>
      )}
      
      {direction === 'right' && (
        <div className="swipe-overlay bg-green-500/20 flex items-center justify-center">
          <div className="swipe-action-hint like-hint">
            <Heart size={32} />
          </div>
        </div>
      )}
      
      {direction === 'up' && (
        <div className="swipe-overlay bg-primary/20 flex items-center justify-center">
          <div className="swipe-action-hint cart-hint">
            <ShoppingCart size={32} />
          </div>
        </div>
      )}
    </>
  );
}
