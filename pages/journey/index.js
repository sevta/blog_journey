/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useMediaQuery } from "react-responsive";
import Scrollbar from "react-smooth-scrollbar";

export default function JourneyPage() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 750px)" });

  const SAMPLE_IMAGES = [
    "https://images.unsplash.com/photo-1637222154908-7d21c80480a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1637139500367-b3fd995a31e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1637147396106-841f825b3ca4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1637139879865-6611fe095216?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1637078767795-c1f63fcb4b3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=386&q=80",
    "https://images.unsplash.com/photo-1636992349896-2d41e5a41f65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80",
  ];

  function parallax(el, y, value) {
    document.querySelector(el).style.transform = `translate3d(0, ${
      y * value
    }px, 0)`;
  }

  function handleOnScroll(ev) {
    console.log(ev);
    const {
      offset: { x, y },
    } = ev;
    parallax(".parallax-1", y, 0.5);
    parallax(".parallax-text", y, 0.3);
  }

  useEffect(() => {
    console.log("is tablet", isTabletOrMobile);
  }, [isTabletOrMobile]);

  return (
    <>
      <div className="py-6 grid grid-cols-3 fixed top-0 left-0 w-full px-10 sm:px-5 z-10">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-col space-y-1">
          <div className="w-5 h-[2px] rounded bg-base-300"></div>
          <div className="w-5 h-[2px] rounded bg-base-300"></div>
        </div>
        <div className="justify-center flex items-center">
          <div className="text-sm font-mono font-medium tracking-widest">
            THE JOURNEY
          </div>
        </div>

        <div className="flex justify-end items-center sm:hidden">
          <button className="px-6 py-3 rounded-full bg-white text-black  font-semibold text-xs">
            Get in touch
          </button>
        </div>
      </div>
      <Scrollbar onScroll={handleOnScroll}>
        <div className="w-full h-screen">
          <div className="antialiased ">
            <div className="w-full md:h-screen overflow-hidden relative z-10">
              <div className="w-full h-[34vw]  bg-gradient-to-t from-base-300 bottom-0 left-0 absolute z-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 -mt-5 md:mt-0">
                <div className="font-comforter parallax-text text-[150px] z-20 text-center font-semibold md:text-6xl">
                  Agressaputra
                </div>
              </div>

              <img
                className="parallax-1 -mt-20 md:mt-0 w-full h-full md:object-cover md:object-center"
                src="/img/landscape_background_small.jpg"
                alt=""
              />
              <img
                src="/img/landscape_mountain_small.png"
                className="absolute -bottom-12 right-0 z-30 w-full h-full md:object-cover md:object-center"
                alt=""
              />
            </div>
            <Navbar className="mt-10 hidden">
              <NavbarMenu active href="/journey">
                All
              </NavbarMenu>
              <NavbarMenu href="/profile/sevta">Profile</NavbarMenu>
            </Navbar>

            <div className="mt-10 max-w-7xl px-10 mx-auto">
              <Masonry
                breakpointCols={{
                  default: 4,
                  1100: 3,
                  700: 2,
                  500: 1,
                }}
                className="my-masonry-grid gap-5"
                columnClassName="my-masonry-grid_column even:pt-[40px] space-y-5"
              >
                {SAMPLE_IMAGES.map((image, index) => (
                  <div
                    className="relative w-full rounded overflow-hidden group"
                    key={index}
                  >
                    <OverlayFade className="h-[10vw]" />
                    <img
                      className="w-full group-hover:scale-125 group-hover:rotate-1 transition duration-1000 ease-out"
                      src={image}
                      alt=""
                    />
                    <div className="absolute top-0 left-0 flex justify-end flex-col w-full h-full p-5">
                      <div className="font-mono text-xs tracking-widest uppercase">
                        19 september 2021
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
          </div>
        </div>
      </Scrollbar>
    </>
  );
}

function OverlayFade({ className }) {
  return (
    <div
      className={`w-full h-[34vw] bg-gradient-to-t from-base-300 bottom-0 left-0 absolute z-40 ${className}`}
    />
  );
}

function NavbarMenu({ active, href, children }) {
  return (
    <Link passHref href={href}>
      <div
        className={`uppercase text-sm ${
          active ? "text-white" : "text-white/40"
        }`}
      >
        {children}
      </div>
    </Link>
  );
}

function Navbar({ className, children }) {
  return (
    <div
      className={`space-x-8 cursor-pointer w-full flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
