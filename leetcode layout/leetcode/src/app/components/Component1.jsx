"use client";

import Resizable from "./Resizeable";

// import Resizable from './Resizable';

const Component1 = () => {
  return (
    <Resizable initialWidth={600} initialHeight={400} componentId= "component1">
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Component 1</h2>
        <div className="flex-1 overflow-auto">
          <p>Resize me! Content adjusts automatically.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-blue-100 rounded p-4 text-center font-bold">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default Component1;