import { useEffect } from "react";

export default function Modal({ title, onClose, children, variant }) {
  useEffect(() => {
    document.querySelector("html").classList.add("overflow-hidden");

    return () =>
      document.querySelector("html").classList.remove("overflow-hidden");
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black/80 z-50 ${
        variant === "center" ? "flex items-center justify-center" : ""
      }`}
      onClick={() => onClose && onClose()}
    >
      <div
        className={`${
          variant === "center"
            ? "w-[500px] sm:w-full rounded-box"
            : "w-1/2 absolute top-0 right-0 overflow-y-scroll pt-10 h-screen"
        }  sm:w-full  bg-base-100  p-6 text-neutral-content `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-end justify-between bg-base-100 z-20 ${
            variant === "center"
              ? "relative"
              : "fixed top-0 right-0 w-1/2 sm:w-full p-6"
          }`}
        >
          <div className="text-2xl font-black uppercase">{title}</div>
          <div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onClose && onClose()}
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
