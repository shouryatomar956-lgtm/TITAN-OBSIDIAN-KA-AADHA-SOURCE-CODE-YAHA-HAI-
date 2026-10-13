import React, { ReactNode } from 'react';
import { useAutonomousVirtualization } from '../utils/optimizationEngine';
import { cn } from '../lib/utils';

interface VirtualizedItemProps {
  children: ReactNode;
  estimatedHeight: number;
  className?: string;
}

export const VirtualizedItem = React.memo(({ 
  children, 
  estimatedHeight, 
  className 
}: VirtualizedItemProps) => {
  // Use Pillar 9 Autonomous Virtualization hook with aggressive culling margins
  const { containerRef, isVisible } = useAutonomousVirtualization({ rootMargin: '600px', threshold: 0 });

  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>} 
      style={{ 
        minHeight: isVisible ? undefined : estimatedHeight,
        contentVisibility: 'auto',
        containIntrinsicSize: `auto ${estimatedHeight}px`
      }}
      className={cn("will-change-transform", className)}
    >
      {isVisible ? children : null}
    </div>
  );
});

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  estimatedItemHeight: number;
  listClassName?: string;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  keyExtractor,
  estimatedItemHeight,
  listClassName,
  className
}: VirtualizedListProps<T>) {
  return (
    <div className={cn("overflow-y-auto w-full h-full smooth-scroll-container", className)}>
      <div className={listClassName}>
        {items.map((item, index) => (
          <VirtualizedItem 
            key={keyExtractor(item, index)} 
            estimatedHeight={estimatedItemHeight}
          >
            {renderItem(item, index)}
          </VirtualizedItem>
        ))}
      </div>
    </div>
  );
}
