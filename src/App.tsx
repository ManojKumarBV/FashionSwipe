import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import useServerStatus from "./hooks/useServerStatus";
import ServerDown from "./pages/ServerDown";

const queryClient = new QueryClient();

const lockToPortrait = async () => {
  try {
    await ScreenOrientation.lock({ orientation: "portrait" });
  } catch (error) {
    console.error("Failed to lock orientation:", error);
  }
};

const App = () => {
  const isServerDown = useServerStatus();

  useEffect(() => {
    lockToPortrait();
  }, []);

  if (isServerDown) {
    return <ServerDown />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;