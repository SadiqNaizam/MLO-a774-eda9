import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import new pages
import HomePageRestaurantDiscoveryPage from "./pages/HomePageRestaurantDiscoveryPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import CartCheckoutPage from "./pages/CartCheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* Ensure this is distinct if both are used, or choose one */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageRestaurantDiscoveryPage />} />
          <Route path="/restaurant-menu/:restaurantId" element={<RestaurantMenuPage />} /> {/* Added :restaurantId param */}
          <Route path="/restaurant-menu" element={<RestaurantMenuPage />} /> {/* Fallback if no ID */}
          <Route path="/cart-checkout" element={<CartCheckoutPage />} />
          <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} /> {/* Added :orderId param */}
          <Route path="/order-tracking" element={<OrderTrackingPage />} /> {/* Fallback if no ID */}
          <Route path="/profile" element={<UserProfilePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;