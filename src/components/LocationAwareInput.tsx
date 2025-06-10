import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationAwareInputProps {
  onLocationChange: (location: string) => void;
  initialLocation?: string;
  placeholder?: string;
}

const LocationAwareInput: React.FC<LocationAwareInputProps> = ({
  onLocationChange,
  initialLocation = '',
  placeholder = 'Enter your delivery address',
}) => {
  const [location, setLocation] = useState(initialLocation);
  console.log("Rendering LocationAwareInput with location:", location);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleDetectLocation = () => {
    // Placeholder for geolocation API
    console.log("Detect location clicked");
    // Simulating location detection
    const detectedLocation = "123 Main St, Anytown, USA"; // Replace with actual geolocation logic
    setLocation(detectedLocation);
    onLocationChange(detectedLocation);
    // You would use navigator.geolocation.getCurrentPosition here in a real app
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLocationChange(location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2">
      <div className="relative flex-grow">
        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10" // Padding for the icon
        />
      </div>
      <Button type="button" variant="outline" onClick={handleDetectLocation} size="icon" aria-label="Detect location">
        <MapPin className="h-5 w-5" />
      </Button>
      <Button type="submit">Search</Button>
    </form>
  );
};
export default LocationAwareInput;