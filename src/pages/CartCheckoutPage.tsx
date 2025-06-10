import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import DishCard from '@/components/DishCard'; // Or a simplified version for cart items
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form'; // Assuming form setup
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, CreditCard, Truck } from 'lucide-react';

// Sample Cart Data
const initialCartItems = [
  { id: 'd1', name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=300&auto=format&fit=crop', quantity: 1 },
  { id: 'd6', name: 'Garlic Bread', description: 'Toasted with garlic butter', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?q=80&w=300&auto=format&fit=crop', quantity: 2 },
];

const deliveryFee = 3.00;
const taxRate = 0.08; // 8%

// Form Schema
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code." }),
  paymentMethod: z.enum(['card', 'paypal', 'cod'], { required_error: "Please select a payment method." }),
  promoCode: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CartCheckoutPage = () => {
  console.log('CartCheckoutPage loaded');
  const [cartItems, setCartItems] = useState(initialCartItems.map(item => ({ ...item, onAddToCart: () => {}, onCustomize: () => {} }))); // Add dummy functions for DishCard props
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      zipCode: '',
      promoCode: '',
    },
  });

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * taxRate;
  const total = subtotal + deliveryFee + taxes;

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout submitted:', data);
    // Simulate order placement
    setShowOrderConfirmation(true);
    // Potentially clear cart or navigate after confirmation
  };
  
  const handleOrderConfirmed = () => {
    setShowOrderConfirmation(false);
    setCartItems([]); // Clear cart
    form.reset(); // Reset form
    // Navigate to order tracking page - window.location.href = '/order-tracking';
    alert("Order placed! Navigating to tracking page (simulation).");
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Cart & Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items & Checkout Form Section (Left/Main) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Review Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Review Your Order</CardTitle>
                <CardDescription>Manage items in your cart before proceeding.</CardDescription>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">Your cart is empty. Add some delicious food!</p>
                ) : (
                  <ScrollArea className="max-h-[400px] pr-4"> {/* Scroll for many items */}
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg bg-white shadow-sm">
                           <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                          <div className="flex-grow">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-4 w-4" /></Button>
                            <span>{item.quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-4 w-4" /></Button>
                          </div>
                          <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Checkout Form Card */}
            {cartItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center"><Truck className="mr-2 h-6 w-6"/> Delivery & Payment</CardTitle>
                <CardDescription>Enter your details to complete the purchase.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Delivery Address Fields */}
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="zipCode" render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl><Input placeholder="12345" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    {/* Payment Method */}
                    <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="card" /></FormControl>
                              <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="paypal" /></FormControl>
                              <FormLabel className="font-normal">PayPal</FormLabel>
                            </FormItem>
                             <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="cod" /></FormControl>
                              <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     {/* Promo Code */}
                    <FormField control={form.control} name="promoCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Promo Code (Optional)</FormLabel>
                        <FormControl><Input placeholder="ENTERCODE20" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Submit Button will be in Order Summary Card if on same page, or separate */}
                  </form>
                </Form>
              </CardContent>
            </Card>
            )}
          </div>

          {/* Order Summary Section (Right Sidebar) */}
          {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="sticky top-24"> {/* Sticky for long forms */}
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes ({(taxRate*100).toFixed(0)}%)</span><span>${taxes.toFixed(2)}</span></div>
                <Separator />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </CardContent>
              <CardFooter>
                <AlertDialog open={showOrderConfirmation} onOpenChange={setShowOrderConfirmation}>
                  <AlertDialogTrigger asChild>
                     <Button type="submit" form="checkoutForm" className="w-full" size="lg" onClick={() => form.handleSubmit(onSubmit)()}> {/* Trigger form submission */}
                        <CreditCard className="mr-2 h-5 w-5" /> Place Order
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Order Placed Successfully!</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your order has been confirmed. You will receive an email shortly. You can track your order progress now.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={handleOrderConfirmed}>Track Order</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartCheckoutPage;