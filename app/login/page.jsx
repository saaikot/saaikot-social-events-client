"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiMail, FiLock } from "react-icons/fi";
import { auth } from "@/utils/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  // ✅ ইমেইল/পাসওয়ার্ড লগইন
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { email, password });
      login(response.data.user, response.data.token);
      Swal.fire({ icon: "success", title: "Login Successful!", timer: 1500, showConfirmButton: false });
      router.push("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login Failed", text: error.response?.data?.message || "Invalid credentials" });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ গুগল লগইন
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // সার্ভারে পাঠিয়ে JWT নেওয়া
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login`, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      login(response.data.user, response.data.token);
      Swal.fire({ icon: "success", title: "Google Login Successful!", timer: 1500, showConfirmButton: false });
      router.push("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 font-sans">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-3xl font-serif font-bold text-center mb-2 text-base-content">Welcome Back</h2>
          <p className="text-center text-base-content/60 mb-6">Login to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-base-content/50" />
                <input type="email" placeholder="you@example.com" className="input input-bordered w-full pl-10 bg-base-200" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-base-content/50" />
                <input type="password" placeholder="••••••••" className="input input-bordered w-full pl-10 bg-base-200" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider text-base-content/50 text-sm">OR</div>

          {/* ✅ Google Login Button */}
          <button onClick={handleGoogleLogin} type="button" className="btn btn-outline w-full flex items-center gap-2">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm text-base-content/70">
            Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}