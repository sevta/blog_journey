import { onAuthStateChanged } from "@firebase/auth";
import { authUser } from "lib/firebase";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useStore } from "store";
import "../styles/globals.css";

// bg-[#EDECEA]

function MyApp({ Component, pageProps }) {
  const { setUser, setAuth } = useStore();

  function checkAuth() {
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        setAuth(true);
        setUser(user);
      } else {
        console.log("youre not loggedin");
      }
    });
  }

  useEffect(() => {
    checkAuth();
    document.querySelector("html").dataset.theme = "forest";
  }, []);

  return (
    <div className="w-full min-h-screen bg-base-300 overflow-hidden">
      <Toaster />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
