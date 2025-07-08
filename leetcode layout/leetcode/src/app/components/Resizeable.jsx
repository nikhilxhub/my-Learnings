// src/components/Resizable/Resizable.jsx
"use client";
import { useLayout } from '@/contex/LayoutContext';
import { useState, useEffect, useRef } from 'react';
// import { useLayout } from '@/context/LayoutContext';

const Resizable = ({ children, componentId, initialWidth = 600, initialHeight = 400 }) => {
  const { sizes, updateSize } = useLayout();
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newSize = {
        width: Math.max(300, sizes[componentId].width + e.movementX),
        height: Math.max(200, sizes[componentId].height + e.movementY)
      };
      
      updateSize(componentId, newSize);
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, sizes, componentId, updateSize]);

  return (
    <div 
      ref={containerRef}
      className="relative border border-gray-300 rounded-lg shadow-sm overflow-auto bg-white m-4"
      style={{ 
        width: `${sizes[componentId]?.width || initialWidth}px`, 
        height: `${sizes[componentId]?.height || initialHeight}px`,
      }}
    >
      {children}
      
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 cursor-nwse-resize rounded-tl-md"
        onMouseDown={() => setIsResizing(true)}
      />
    </div>
  );
};

export default Resizable;