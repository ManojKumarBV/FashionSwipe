import ProductStack from "../components/ProductStack";
import { Badge } from "@/components/ui/badge";
import { IonApp, IonContent } from "@ionic/react";

const Index = () => {
  // StatusBar.setOverlaysWebView({ overlay: false });

  return (
    <IonApp>
      <IonContent fullscreen={false}>
        <div className="pt-[env(safe-area-inset-top)] min-h-screen w-screen h-screen fixed top-0 left-0 bg-black/80 text-white">
          <div className="container px-4 py-2 mx-auto h-full flex flex-col">
            <header className="mb-4 px-4 py-2 flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-transparent border-pink-500 text-pink-500"
              >
                FashionSwipe
              </Badge>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold">MS</span>
                </div>
              </div>
            </header>
            <div className="flex-1">
              <ProductStack />
            </div>
          </div>
        </div>
      </IonContent>
    </IonApp>
  );
};

export default Index;
