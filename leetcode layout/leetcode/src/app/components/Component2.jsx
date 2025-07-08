"use client";

import Resizable from "./Resizeable";

// import Resizable from '../Resizable/Resizable';

const Component2 = () => {
  return (
    <Resizable initialWidth={600} initialHeight={400} componentId= "component2">
      <div className="p-4 h-full">
        <h2 className="text-xl font-bold mb-4">Component 2</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-1 min-w-[200px] p-3 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-teal-100 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-teal-100 rounded mb-2"></div>
                <div className="h-3 w-11/12 bg-teal-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Resizable>
  );
};

export default Component2;