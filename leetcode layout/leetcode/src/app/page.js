"use client";
import { LayoutProvider } from "@/contex/LayoutContext";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component3 from "./components/Component3";
import Component4 from "./components/Component4";
// src/app/page.jsx
// import { LayoutProvider } from '../context/LayoutContext';
// import Component1 from '../components/Component1/Component1';
// import Component2 from '../components/Component2/Component2';
// import Component3 from '../components/Component3/Component3';

export default function Home() {
  return (
    <LayoutProvider>
      <div className="h-screen w-screen">
      <div className="flex flex-wrap p-5 bg-[#164955] min-h-screen">
        <Component1 />
        <Component2 />
        <Component3 />
        <Component4 />
      </div>
      </div>
    </LayoutProvider>
  );
}