import { signOut } from "@firebase/auth";
import { authUser } from "lib/firebase";
import Link from "next/link";
import { useStore } from "store";

export default function Navbar() {
  const { user, auth, setUser, setAuth } = useStore();

  async function handleLogout() {
    await signOut(authUser);
    setUser({});
    setAuth(false);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="font-bold text-5xl tracking-tighter mb-12">
        Agrs galleries.
      </div>
      <div className="">
        <div className="space-x-5">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/">About</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/parallax">Gallery</NavLink>
          {auth ? (
            <>
              <NavLink href="/admin">cms</NavLink>

              <button className="font-semibold text-sm" onClick={handleLogout}>
                logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">login</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NavLink({ href = "/", children }) {
  return (
    <Link href={href}>
      <a className="font-semibold text-sm">{children}</a>
    </Link>
  );
}
