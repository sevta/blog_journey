/* eslint-disable @next/next/no-img-element */
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function ParallaxPage() {
  return (
    <div>
      <Parallax pages={2} style={{ top: 0, left: 0 }}>
        <ParallaxLayer
          speed={2.5}
          offset={0}
          className="bg-red-500 flex items-center justify-center text-3xl font-bold"
        >
          <img
            className="w-full h-full object-cover object-center absolute top-0 left-0"
            src="https://images.unsplash.com/photo-1636703781915-8170f2b87612?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
          the layer 1
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.5}
          offset={1}
          style={{
            backgroundColor: "#ff6d6d",
          }}
        >
          the layer 2
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
