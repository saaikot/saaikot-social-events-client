"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 👇 ১. কাস্টম পাসওয়ার্ড ভ্যালিডেশন
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long, including 1 uppercase and 1 lowercase letter.",
      });
      setIsLoading(false);
      return;
    }

    // 👇 ২. ইমেইল ভ্যালিডেশন
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        name,
        email,
        password,
        photoURL,
      });

      // সাকসেস হলে AuthContext-এ ডাটা পাঠানো
      login(response.data.user, response.data.token);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to HopeHub!",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/"); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10 font-sans transition-colors duration-300">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-3xl font-serif font-bold text-center mb-2 text-base-content">Create Account</h2>
          <p className="text-center text-base-content/60 mb-6">Join the community</p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Full Name</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-base-content/50" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-10 bg-base-200 border-base-300 text-base-content focus:border-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Email</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-base-content/50" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10 bg-base-200 border-base-300 text-base-content focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Password</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-base-content/50" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 bg-base-200 border-base-300 text-base-content focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">Min 6 chars, 1 uppercase & 1 lowercase</span>
              </label>
            </div>

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Photo URL (Optional)</span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-3 top-3.5 text-base-content/50" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full pl-10 bg-base-200 border-base-300 text-base-content focus:border-primary"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full text-primary-content ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-base-content/70">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}