import React from 'react';
import { cn } from '@/lib/utils'; // For conditional classes

interface OrderStatusNavigatorProps {
  steps: string[];
  currentStep: number; // 0-indexed
  className?: string;
}

const OrderStatusNavigator: React.FC<OrderStatusNavigatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  console.log("Rendering OrderStatusNavigator, current step:", currentStep);

  if (!steps || steps.length === 0) {
    return <p>No order steps defined.</p>;
  }

  return (
    <div className={cn("w-full p-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isActive ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-muted-foreground/30 text-muted-foreground",
                    isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  {isCompleted ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <p className={cn("mt-2 text-xs md:text-sm", isActive ? "font-semibold text-primary" : "text-muted-foreground")}>
                  {step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                    "flex-1 h-1 mx-2 md:mx-4 transition-all duration-300",
                    isActive ? "bg-primary" : "bg-muted-foreground/30"
                )}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default OrderStatusNavigator;