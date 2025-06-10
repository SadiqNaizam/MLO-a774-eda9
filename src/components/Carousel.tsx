import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CarouselSlide {
  id: string | number;
  content?: React.ReactNode; // For custom content
  imageUrl?: string;
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
}) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="embla overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            <Card className="m-0 border-0 shadow-none rounded-none"> {/* Remove margin/border from card for seamless carousel */}
              <CardContent className="flex p-0"> {/* Remove padding from card content */}
                {slide.imageUrl ? (
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={slide.imageUrl}
                      alt={slide.altText || `Slide ${slide.id}`}
                      className="object-cover w-full h-full"
                      onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={16/9} className="flex items-center justify-center p-6 bg-muted">
                    {slide.content || <p>Slide {slide.id}</p>}
                  </AspectRatio>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Consider adding Prev/Next buttons and Dots for navigation */}
    </div>
  );
};
export default Carousel;