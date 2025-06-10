import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Map } from 'lucide-react'; // Icon for map

interface MapPlaceholderComponentProps {
  statusText?: string;
  className?: string;
}

const MapPlaceholderComponent: React.FC<MapPlaceholderComponentProps> = ({
  statusText = "Live map tracking coming soon!",
  className,
}) => {
  console.log("Rendering MapPlaceholderComponent");

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6 flex flex-col items-center justify-center aspect-video bg-muted/50 rounded-lg">
        <Map className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-muted-foreground">{statusText}</p>
        <p className="text-sm text-muted-foreground/80 mt-1">
          Your order's progress will be updated here.
        </p>
      </CardContent>
    </Card>
  );
};
export default MapPlaceholderComponent;