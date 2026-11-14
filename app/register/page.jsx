"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({ icon: "error", title: "Weak Password", text: "Password must be at least 6 chars, 1 uppercase & 1 lowercase." });
      setIsLoading(false);
      return;
    }

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photoURL || "https://i.ibb.co/5v9Z1g4/default-avatar.png",
    });

    if (error) {
      Swal.fire({ icon: "error", title: "Registration Failed", text: error.message });
    } else {
      Swal.fire({ icon: "success", title: "Registration Successful!", timer: 1500, showConfirmButton: false });
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10 font-sans">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-3xl font-serif font-bold text-center mb-2 text-base-content">Create Account</h2>
          <p className="text-center text-base-content/60 mb-6">Join the community</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Full Name</span></label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-base-content/50" />
                <input type="text" placeholder="e.g., Labib Ferdous" className="input input-bordered w-full pl-10 bg-base-200" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-base-content/50" />
                <input type="email" placeholder="e.g., labib@gmail.com" className="input input-bordered w-full pl-10 bg-base-200" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-base-content/50" />
                <input type="password" placeholder="e.g., Hopehub123" className="input input-bordered w-full pl-10 bg-base-200" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <label className="label"><span className="label-text-alt text-base-content/50">Min 6 chars, 1 uppercase & 1 lowercase</span></label>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Photo URL (Optional)</span></label>
              <div className="relative">
                <FiImage className="absolute left-3 top-3.5 text-base-content/50" />
                <input type="url" placeholder="Paste your image link here" className="input input-bordered w-full pl-10 bg-base-200" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
              </div>
            </div>
            <button type="submit" className={`btn btn-primary w-full mt-4 ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-base-content/70">
            Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}