import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import DishCard from '@/components/DishCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, MapPin, ShoppingCart, PlusCircle, MinusCircle } from 'lucide-react';

// Sample Data
const restaurantDetails = {
  name: 'Pizza Palace Deluxe',
  imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop',
  rating: 4.8,
  cuisine: 'Italian, Pizza',
  deliveryTime: '30-40 min',
  address: '123 Pizza Ave, Flavor Town',
};

const menuCategories = [
  {
    name: 'Pizzas',
    dishes: [
      { id: 'd1', name: 'Margherita', description: 'Classic cheese and tomato', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600&auto=format&fit=crop' },
      { id: 'd2', name: 'Pepperoni Feast', description: 'Loaded with pepperoni', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop' },
      { id: 'd3', name: 'Veggie Supreme', description: 'All the veggies', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop', customizable: true },
    ],
  },
  {
    name: 'Pastas',
    dishes: [
      { id: 'd4', name: 'Spaghetti Bolognese', description: 'Rich meat sauce', price: 13.50, imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508b26a834?q=80&w=600&auto=format&fit=crop' },
      { id: 'd5', name: 'Carbonara', description: 'Creamy egg and bacon pasta', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1611270629504-90b02d26c165?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    name: 'Sides',
    dishes: [
      { id: 'd6', name: 'Garlic Bread', description: 'Toasted with garlic butter', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?q=80&w=600&auto=format&fit=crop' },
    ],
  },
];

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const [isLoading, setIsLoading] = useState(false); // Simulate loading
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedDishForCustomization, setSelectedDishForCustomization] = useState<any>(null);

  const handleAddToCart = (dishId: string | number) => {
    console.log(`Adding dish ${dishId} to cart`);
    setCart(prev => ({ ...prev, [dishId]: (prev[dishId] || 0) + 1 }));
    // Show toast notification: "Item added to cart"
  };

  const handleOpenCustomizationDialog = (dishId: string | number) => {
    const dish = menuCategories.flatMap(cat => cat.dishes).find(d => d.id === dishId);
    if (dish && dish.customizable) {
      setSelectedDishForCustomization(dish);
      setIsCustomizationDialogOpen(true);
      console.log(`Opening customization for dish ${dishId}`);
    } else {
      handleAddToCart(dishId); // Add directly if not customizable
    }
  };

  const handleCustomizationSubmit = () => {
    console.log('Customization submitted for:', selectedDishForCustomization?.name);
    // Add customized item to cart logic here
    handleAddToCart(selectedDishForCustomization.id); // Simplified: add base item
    setIsCustomizationDialogOpen(false);
    setSelectedDishForCustomization(null);
  };
  
  // Calculate total items in cart for badge
  const totalCartItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-40 w-full mb-6" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="mt-8 space-y-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      {/* Restaurant Header */}
      <header className="relative h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${restaurantDetails.imageUrl})` }}>
        <div className="absolute inset-0 bg-black/50 flex items-end p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src={restaurantDetails.imageUrl} alt={restaurantDetails.name} />
              <AvatarFallback>{restaurantDetails.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">{restaurantDetails.name}</h1>
              <div className="flex items-center space-x-2 text-gray-200 mt-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{restaurantDetails.rating}</span>
                <span className="text-gray-400">&bull;</span>
                <span>{restaurantDetails.cuisine}</span>
                <span className="text-gray-400">&bull;</span>
                <Clock className="h-5 w-5" />
                <span>{restaurantDetails.deliveryTime}</span>
              </div>
              <p className="text-sm text-gray-300 mt-1 flex items-center"><MapPin className="h-4 w-4 mr-1" />{restaurantDetails.address}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Cart Summary Button */}
        {totalCartItems > 0 && (
           <Button
            onClick={() => alert('Navigate to cart page')}
            className="fixed bottom-6 right-6 z-50 shadow-lg"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            View Cart ({totalCartItems} items)
          </Button>
        )}

        {/* Menu Section using Tabs for Categories */}
        <Tabs defaultValue={menuCategories[0]?.name || 'menu'} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-none md:flex mb-6 bg-white shadow-sm rounded-lg p-1">
            {menuCategories.map(category => (
              <TabsTrigger key={category.name} value={category.name} className="text-sm md:text-base">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map(category => (
            <TabsContent key={category.name} value={category.name}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category.name}</h2>
              <ScrollArea className="h-auto"> {/* Adjust height as needed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.dishes.map(dish => (
                    <DishCard
                      key={dish.id}
                      {...dish}
                      onAddToCart={() => handleAddToCart(dish.id)}
                      onCustomize={dish.customizable ? () => handleOpenCustomizationDialog(dish.id) : undefined}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        {/* Example of Accordion for FAQs or something similar */}
        <section className="mt-12 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Restaurant Information</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Dietary Options</AccordionTrigger>
              <AccordionContent>
                We offer various vegetarian, vegan, and gluten-free options. Please check dish descriptions or ask our staff.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Allergy Information</AccordionTrigger>
              <AccordionContent>
                Our kitchen handles nuts, dairy, and gluten. Cross-contamination is possible. Please inform us of any allergies.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* Customization Dialog */}
      {selectedDishForCustomization && (
        <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Customize {selectedDishForCustomization.name}</DialogTitle>
              <DialogDescription>
                Make changes to your dish here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Placeholder for customization options */}
              <p>Customization options for {selectedDishForCustomization.name} would go here (e.g., radio buttons, checkboxes).</p>
              <p className="text-sm text-muted-foreground">Example: Choose size, toppings, spice level etc.</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomizationDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCustomizationSubmit}>Save Changes & Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RestaurantMenuPage;