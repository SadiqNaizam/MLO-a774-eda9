import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit3 } from 'lucide-react'; // Example icons

interface DishCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Optional image for the dish
  onAddToCart: (id: string | number) => void;
  onCustomize?: (id: string | number) => void; // If dish has customizable options
  className?: string;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onCustomize,
  className,
}) => {
  console.log("Rendering DishCard:", name);

  const handleAddToCart = () => {
    console.log("Adding to cart:", name, id);
    onAddToCart(id);
  };

  const handleCustomize = () => {
    if (onCustomize) {
      console.log("Customizing dish:", name, id);
      onCustomize(id);
    }
  };

  return (
    <Card className={`flex flex-col overflow-hidden ${className}`}>
      {imageUrl && (
        <CardHeader className="p-0">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-24 md:h-32" // Fixed height for consistency
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </CardHeader>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-md font-semibold mb-1">{name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</CardDescription>
        <p className="text-sm font-semibold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-2 md:p-4 flex flex-col sm:flex-row gap-2">
        {onCustomize && (
          <Button variant="outline" size="sm" className="w-full sm:w-auto flex-1" onClick={handleCustomize}>
            <Edit3 className="mr-2 h-4 w-4" /> Customize
          </Button>
        )}
        <Button size="sm" className="w-full sm:w-auto flex-1" onClick={handleAddToCart}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DishCard;