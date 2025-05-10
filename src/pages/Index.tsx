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
          <div className="pt-[env(safe-area-inset-top)] min-h-screen w-screen h-screen fixed top-0 left-0 bg-dark text-white">
            <div className="container px-4 py-2 mx-auto h-full flex flex-col">
              <header className="mb-4 px-4 py-2 flex items-center justify-between">
                {/* Branding Badge */}
                <Badge
                  variant="outline"
                  className="bg-transparent border-pink-500 text-pink-500 font-semibold text-sm"
                >
                  <span className="font-serif">F</span>
                  ashion {" "}
                  <span className="font-serif">S</span>
                  wipe
                </Badge>
                {/* Action Icons and Profile */}
                <div className="flex gap-4 items-center xl:gap-6">
                  {/* Like Icon with Counter */}
                  <div className="relative">
                    <Heart className="w-6 h-6 text-white transition-transform transform hover:scale-110" />
                    {likeCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                      >
                        {likeCount}
                      </motion.span>
                    )}
                  </div>

                  {/* Cart Icon with Counter */}
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-white transition-transform transform hover:scale-110" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>

                  {/* Profile Icon */}
                  <div className="w-8 h-8 rounded-full flex items-center bg-white justify-center shadow-lg">
                    <span className="text-sm font-semibold text-black font-serif">FS</span>
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
