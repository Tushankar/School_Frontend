"use client";
import { WorldMap } from "./map";
import { motion } from "framer-motion";

export default function MapDemo() {
  return (
    <div className=" py-20 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto text-center">
       <p className="font-bold text-xl md:text-4xl text-center mb-8">
          <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Global{" "}
            Network
          </span>
        </p>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto py-4 leading-relaxed">
          Connect with teams and clients worldwide. Our platform enables seamless 
          collaboration across continents, bringing the world to your workspace.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
              label: "Fairbanks"
            },
            end: {
              lat: 34.0522,
              lng: -118.2437,
              label: "Los Angeles"
            },
          },
          {
            start: { 
              lat: 64.2008, 
              lng: -149.4937,
              label: "Fairbanks"
            },
            end: { 
              lat: -15.7975, 
              lng: -47.8919,
              label: "Brasília"
            },
          },
          {
            start: { 
              lat: -15.7975, 
              lng: -47.8919,
              label: "Brasília"
            },
            end: { 
              lat: 38.7223, 
              lng: -9.1393,
              label: "Lisbon"
            },
          },
          {
            start: { 
              lat: 51.5074, 
              lng: -0.1278,
              label: "London"
            },
            end: { 
              lat: 28.6139, 
              lng: 77.209,
              label: "New Delhi"
            },
          },
          {
            start: { 
              lat: 28.6139, 
              lng: 77.209,
              label: "New Delhi"
            },
            end: { 
              lat: 43.1332, 
              lng: 131.9113,
              label: "Vladivostok"
            },
          },
          {
            start: { 
              lat: 28.6139, 
              lng: 77.209,
              label: "New Delhi"
            },
            end: { 
              lat: -1.2921, 
              lng: 36.8219,
              label: "Nairobi"
            },
          },
        ]}
      />
    </div>
  );
}