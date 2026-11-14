"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";
import { FiUser, FiImage, FiSave } from "react-icons/fi";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) router.replace("/login");
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const { error } = await authClient.updateUser({
      name: name,
      image: image || "https://i.ibb.co/5v9Z1g4/default-avatar.png",
    });

    if (error) {
      Swal.fire({ icon: "error", title: "Update Failed", text: error.message });
    } else {
      Swal.fire({ icon: "success", title: "Profile Updated!", timer: 2000, showConfirmButton: false });
      router.refresh();
    }
    setIsUpdating(false);
  };

  if (isPending || !user) return <div className="min-h-screen bg-base-200 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 pb-20 font-sans">
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
          <div className="h-32 bg-primary"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-base-100 bg-base-200 overflow-hidden shadow-lg">
                <img src={image || "https://i.ibb.co/5v9Z1g4/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-base-content">{user.name}</h2>
              <p className="text-base-content/60">{user.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Full Name</span></label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-4 text-base-content/50" />
                  <input type="text" className="input input-bordered w-full pl-12 bg-base-200" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Profile Picture URL</span></label>
                <div className="relative">
                  <FiImage className="absolute left-4 top-4 text-base-content/50" />
                  <input type="url" className="input input-bordered w-full pl-12 bg-base-200" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/my-photo.jpg" />
                </div>
              </div>
              <button type="submit" disabled={isUpdating} className={`btn btn-primary w-full rounded-xl ${isUpdating ? "loading" : ""}`}>
                {isUpdating ? "Saving..." : <><FiSave /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}