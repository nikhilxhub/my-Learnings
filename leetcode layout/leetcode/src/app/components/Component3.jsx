"use client";

import Resizable from "./Resizeable";

// import Resizable from '../Resizable/Resizable';

const Component3 = () => {
  return (
    <Resizable initialWidth={600} initialHeight={400} componentId= "component3">
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4">Component 3</h2>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-gradient-to-t from-blue-200 to-blue-50 rounded-lg relative overflow-hidden"></div>
          <div className="flex justify-around mt-4">
            <span className="px-3 py-1 bg-blue-200 rounded-full text-sm">Label 1</span>
            <span className="px-3 py-1 bg-blue-200 rounded-full text-sm">Label 2</span>
            <span className="px-3 py-1 bg-blue-200 rounded-full text-sm">Label 3</span>
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default Component3;