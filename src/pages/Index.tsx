import ProductStack from "../components/ProductStack";
import { Badge } from "@/components/ui/badge";
import { IonApp, IonContent } from "@ionic/react";
import AnimatedPlaneBanner from "@/components/AnimatedBanner";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [cartCount, setCartCount] = useState(0); 
  const [likeCount, setLikeCount] = useState(0);


  const handleAddToCart = (count: number) => {
    setCartCount(prev => prev + count);
  };

  const handleLike = (count: number) => {
    setLikeCount(prev => prev + count);
  };

  return (
    <IonApp>
      <IonContent fullscreen={false}>
        <div className="container mx-auto">
          <div className="pt-[env(safe-area-inset-top)] min-h-screen w-screen h-screen fixed top-0 left-0 bg-black/80 text-white">
            <div className="container px-4 py-2 mx-auto h-full flex flex-col">
              <header className="mb-4 px-4 py-2 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="bg-transparent border-pink-500 text-pink-500"
                >
                  FashionSwipe
                </Badge>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <span className="text-xs font-bold">MK</span>
                  </div>
                  <div className="relative">
                    <Heart className="w-6 h-6 text-white" />
                    {likeCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-3 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {likeCount}
                      </motion.span>
                    )}
                  </div>
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-white" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-3 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                </div>
              </header>
              <div className="md:hidden">
                <AnimatedPlaneBanner />
              </div>
              <div className="justify-center items-center">
                <ProductStack onAddToCart={handleAddToCart} onLike={handleLike} />
              </div>

              
            </div>
          </div>
        </div>
      </IonContent>
    </IonApp>
  );
};

export default Index;
