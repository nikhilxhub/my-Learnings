// src/context/LayoutContext.jsx
"use client";
import { createContext, useState, useContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [sizes, setSizes] = useState({
    component1: { width: 600, height: 400 },
    component2: { width: 600, height: 400 },
    component3: { width: 600, height: 400 },
    component4: { width: 600, height: 400 }
  });

  const updateSize = (component, newSize) => {
    setSizes(prev => {
      // Calculate total width change
      const widthDelta = newSize.width - prev[component].width;
      
      // Distribute the change to other components
      const otherComponents = Object.keys(prev).filter(key => key !== component);
      const widthPerComponent = widthDelta / otherComponents.length;
      
      const newSizes = { ...prev };
      newSizes[component] = newSize;
      
      otherComponents.forEach(comp => {
        newSizes[comp] = {
          ...newSizes[comp],
          width: Math.max(300, newSizes[comp].width - widthPerComponent)
        };
      });

      return newSizes;
    });
  };

  return (
    <LayoutContext.Provider value={{ sizes, updateSize }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);