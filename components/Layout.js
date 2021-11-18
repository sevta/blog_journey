import Scrollbar from "react-smooth-scrollbar";
import Badge from "./Badge";
import Navbar from "./Navbar";

export default function Layout({
  showNavbar = true,
  showBadge = true,
  children,
  noPadding,
}) {
  return (
    <Scrollbar>
      <div
        className={`w-full h-screen pt-16 md:pt-24  ${
          noPadding ? "" : " p-10 md:p-5"
        }`}
      >
        {showBadge && (
          <Badge>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
            aliquid rem distinctio voluptatibus, eligendi laudantium odio qui,
          </Badge>
        )}

        {showNavbar && <Navbar />}

        {children}

        <footer className="p-10 flex items-center justify-center font-bold text-sm">
          Copyright 2021
        </footer>
      </div>
    </Scrollbar>
  );
}
