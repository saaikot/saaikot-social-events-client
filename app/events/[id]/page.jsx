"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import { FiCalendar, FiMapPin, FiUser, FiArrowLeft } from "react-icons/fi";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useContext(AuthContext);
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  // ইভেন্টের ডিটেইলস ফেচ করা
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        Swal.fire("Error", "Event not found!", "error");
        router.push("/events");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id, router]);

  // জয়েন ইভেন্ট ফাংশন
  const handleJoinEvent = async () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "You need to login first to join this event.",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) router.push("/login");
      });
      return;
    }

    setIsJoining(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Joined Successfully!",
        text: "You have successfully joined this event.",
        timer: 2000,
        showConfirmButton: false,
      });
      
      // UI আপডেট করা (যাতে বাটন চেঞ্জ হয়ে যায়)
      setEvent((prev) => ({
        ...prev,
        joinedUsers: [...(prev.joinedUsers || []), user.email],
      }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to join",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  const isAlreadyJoined = event.joinedUsers?.includes(user?.email);

  return (
    <main className="min-h-screen bg-base-200 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <button onClick={() => router.back()} className="btn btn-ghost btn-sm mb-4 text-gray-400">
          <FiArrowLeft /> Back to Events
        </button>

        <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-300">
          <figure className="lg:w-1/2 h-64 lg:h-auto">
            <img
              src={event.imageUrl || "https://via.placeholder.com/800x600"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body lg:w-1/2">
            <div className="badge badge-secondary text-white mb-2">{event.eventType}</div>
            <h1 className="card-title text-3xl font-bold text-white mb-4">{event.title}</h1>
            <p className="text-gray-300 leading-relaxed mb-6">{event.description}</p>
            
            <div className="space-y-3 mb-8 bg-base-200 p-4 rounded-xl border border-base-300">
              <p className="flex items-center gap-3 text-gray-200"><FiMapPin className="text-primary" /> {event.location}</p>
              <p className="flex items-center gap-3 text-gray-200"><FiCalendar className="text-primary" /> {new Date(event.eventDate).toLocaleDateString()}</p>
              <p className="flex items-center gap-3 text-gray-200"><FiUser className="text-primary" /> Organized by: {event.userName}</p>
            </div>

            <div className="card-actions mt-auto">
              <button
                onClick={handleJoinEvent}
                disabled={isJoining || isAlreadyJoined}
                className={`btn w-full ${isAlreadyJoined ? "btn-success" : "btn-primary"} ${isJoining ? "loading" : ""}`}
              >
                {isJoining ? "Joining..." : isAlreadyJoined ? "Already Joined" : "Join Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}