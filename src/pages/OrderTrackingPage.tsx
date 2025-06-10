import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import OrderStatusNavigator from '@/components/OrderStatusNavigator';
import { Button } from '@/components/ui/button';
import MapPlaceholderComponent from '@/components/MapPlaceholderComponent';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, HelpCircle, Home } from 'lucide-react';

const orderSteps = ['Order Confirmed', 'Preparing Food', 'Out for Delivery', 'Delivered'];

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');
  // Simulate fetching order data and loading state
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed
  const [estimatedDelivery, setEstimatedDelivery] = useState("Calculating...");
  const [orderId, setOrderId] = useState("CMD-12345XYZ"); // Example order ID

  useEffect(() => {
    // Simulate API call to fetch order status
    const timer = setTimeout(() => {
      setCurrentStep(1); // Example: Order is now 'Preparing Food'
      setEstimatedDelivery("Approx. 25-35 minutes");
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate order progress
  useEffect(() => {
    if (!isLoading && currentStep < orderSteps.length -1) {
        const progressInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < orderSteps.length -1) {
                    return prev + 1;
                }
                clearInterval(progressInterval);
                return prev;
            });
        }, 15000); // Update status every 15 seconds
        return () => clearInterval(progressInterval);
    }
  }, [isLoading, currentStep]);


  const handleRefreshStatus = () => {
    setIsLoading(true);
    // Simulate re-fetching
    setTimeout(() => {
      // Potentially update currentStep or estimatedDelivery here from a "refreshed" API call
      console.log("Order status refreshed.");
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavigationMenu />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Skeleton className="h-12 w-1/2 mb-6" /> {/* Title Skeleton */}
          <Card className="mb-8">
            <CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader>
            <CardContent><Skeleton className="h-20 w-full" /></CardContent> {/* OrderStatusNavigator Skeleton */}
          </Card>
          <Card className="mb-8">
            <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent> {/* MapPlaceholder Skeleton */}
          </Card>
          <div className="flex justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
          <p className="text-gray-600">Order ID: {orderId}</p>
        </header>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Current Status: {orderSteps[currentStep]}</CardTitle>
            <CardDescription>Estimated Delivery: {estimatedDelivery}</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderStatusNavigator steps={orderSteps} currentStep={currentStep} />
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Delivery Location</CardTitle>
          </CardHeader>
          <CardContent>
            <MapPlaceholderComponent
              statusText={currentStep === orderSteps.length - 1 ? "Your order has been delivered!" : "Driver's location will appear here."}
            />
          </CardContent>
        </Card>

        <section className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button variant="outline" onClick={handleRefreshStatus} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => alert('Redirect to help page')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Need Help?
            </Button>
            <Button onClick={() => window.location.href='/'}> {/* Simple navigation for example */}
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </section>

        {currentStep === orderSteps.length - 1 && (
          <Card className="mt-8 bg-green-50 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">Order Delivered!</CardTitle>
              <CardDescription className="text-green-600">Thank you for your order. We hope you enjoy your meal!</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => alert('Rate your order / Reorder')}>
                Rate Your Order or Reorder
              </Button>
            </CardContent>
          </Card>
        )}

      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t bg-white">
        FoodApp Tracking Services
      </footer>
    </div>
  );
};

export default OrderTrackingPage;