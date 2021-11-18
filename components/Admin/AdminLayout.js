import { useStore } from "store";
import Navbar from "./Navbar";

export default function AdminLayout({ children }) {
  const { setModal } = useStore();

  return (
    <div
      data-theme="dracula"
      className="w-full min-h-screen bg-base-200 px-5 font-inter"
    >
      <Navbar
        slotRight={
          <div className="flex-none">
            <button
              className="btn btn-primary text-xs px-6 btn-sm"
              onClick={() => setModal("admin-modal")}
            >
              new
            </button>
          </div>
        }
      />
      <main>{children}</main>
    </div>
  );
}
