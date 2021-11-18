import { signInWithEmailAndPassword } from "@firebase/auth";
import { authUser } from "lib/firebase";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth, setUser } = useStore((state) => state);

  const router = useRouter();

  async function handleLogin(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        authUser,
        email,
        password
      );
      console.log("credentials", credentials);
      setAuth(true);
      setUser(credentials.user);
      toast.success("success login!");
      setTimeout(() => {
        router.push("/");
      }, 300);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="card shadow-2xl bg-base-100 max-w-xl mx-auto">
        <div className="card-body">
          <div className="card-title">login</div>
          <form className="space-y-3" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-5">
              <button
                type="submit"
                className={`btn btn-primary btn-block ${loading && "loading"}`}
              >
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
