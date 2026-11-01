"use client";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { FiUser, FiImage, FiSave } from "react-icons/fi";

export default function ProfilePage() {
  const { user, token, updateUser, loading } = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    } else if (user) {
      setName(user.name || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user, loading, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-profile`,
        { name, photoURL },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateUser(response.data.user, response.data.token);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !user) return <div className="min-h-screen bg-base-200"></div>;

  return (
    <div className="min-h-screen bg-base-200 pb-20 font-sans transition-colors duration-300">
      
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
          
          <div className="h-32 bg-primary"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-base-100 bg-base-200 overflow-hidden shadow-lg">
                <img
                  src={photoURL || "https://i.ibb.co/5v9Z1g4/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-base-content">{user.name}</h2>
              <p className="text-base-content/60">{user.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-base-content">Full Name</span></label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-4 text-base-content/50" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-12 bg-base-200 focus:border-primary text-base-content"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-base-content">Profile Picture URL</span></label>
                <div className="relative">
                  <FiImage className="absolute left-4 top-4 text-base-content/50" />
                  <input
                    type="url"
                    className="input input-bordered w-full pl-12 bg-base-200 focus:border-primary text-base-content"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className={`btn btn-primary w-full text-primary-content rounded-xl mt-4 ${isUpdating ? "loading" : ""}`}
              >
                {isUpdating ? "Saving..." : <><FiSave /> Save Changes</>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}