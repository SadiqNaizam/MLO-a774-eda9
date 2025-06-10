import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  deliveryTime: string; // e.g., "25-35 min"
  onClick?: (id: string | number) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  cuisineTypes,
  deliveryTime,
  onClick,
  className
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className={`w-full overflow-hidden transition-all hover:shadow-xl cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
          <span className="mx-1.5">&bull;</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{deliveryTime}</span>
        </div>
        {cuisineTypes && cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {cuisineTypes.slice(0, 3).map(cuisine => ( // Show max 3 cuisines
              <Badge key={cuisine} variant="secondary" className="text-xs">{cuisine}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      {/* Optional Footer for actions like "View Menu" if not relying on card click */}
      {/* <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleCardClick}>View Menu</Button>
      </CardFooter> */}
    </Card>
  );
};
export default RestaurantCard;