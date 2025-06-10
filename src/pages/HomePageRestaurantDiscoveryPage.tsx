import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import LocationAwareInput from '@/components/LocationAwareInput';
import { Input } from '@/components/ui/input';
import Carousel from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/RestaurantCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search, Utensils } from 'lucide-react';

const sampleCarouselSlides = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop', altText: 'Delicious Food Promotion' },
  { id:2, imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop', altText: 'New Restaurant Opening' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop', altText: 'Special Discount Offer' },
];

const sampleRestaurants = [
  { id: 'r1', name: 'The Gourmet Kitchen', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop', rating: 4.7, cuisineTypes: ['Italian', 'Pizza'], deliveryTime: '25-35 min' },
  { id: 'r2', name: 'Spice Route', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop', rating: 4.5, cuisineTypes: ['Indian', 'Curry'], deliveryTime: '30-40 min' },
  { id: 'r3', name: 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop', rating: 4.2, cuisineTypes: ['American', 'Burgers'], deliveryTime: '20-30 min' },
  { id: 'r4', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop', rating: 4.8, cuisineTypes: ['Japanese', 'Sushi'], deliveryTime: '35-45 min' },
  { id: 'r5', name: 'Pizzeria Roma', imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop', rating: 4.6, cuisineTypes: ['Pizza', 'Italian'], deliveryTime: '25-35 min' },
];

const cuisineFilters = ['All', 'Italian', 'Indian', 'American', 'Japanese', 'Mexican', 'Chinese'];

const HomePageRestaurantDiscoveryPage = () => {
  console.log('HomePage/RestaurantDiscoveryPage loaded');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const handleLocationChange = (location: string) => {
    console.log('New location selected:', location);
    // Fetch restaurants based on new location
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    // Navigate to restaurant menu page, e.g., router.push(`/restaurant-menu/${id}`)
    alert(`Navigate to restaurant ${id}`);
  };

  const filteredRestaurants = sampleRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCuisine === 'All' || restaurant.cuisineTypes.includes(selectedCuisine))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Location and Search Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Next Meal</h1>
          <div className="mb-6">
            <LocationAwareInput
              onLocationChange={handleLocationChange}
              placeholder="Enter your delivery address or detect location"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg"
            />
          </div>
        </section>

        {/* Promotional Carousel Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Special Offers</h2>
          <Carousel slides={sampleCarouselSlides} />
        </section>

        {/* Cuisine Filters Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter by Cuisine</h2>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex space-x-3">
              {cuisineFilters.map(cuisine => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className="rounded-full"
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* Restaurant Listing Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Featured Restaurants</h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <Utensils className="h-12 w-12 mx-auto mb-4" />
              <p className="text-xl">No restaurants found matching your criteria.</p>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} FoodApp. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePageRestaurantDiscoveryPage;