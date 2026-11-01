"use client";
import { Suspense, useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import { FiCalendar, FiMapPin, FiUser, FiArrowLeft } from "react-icons/fi";


function EventDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useContext(AuthContext);
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

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
        timer: 2000,
        showConfirmButton: false,
      });
      
      setEvent((prev) => ({
        ...prev,
        joinedUsers: [...(prev.joinedUsers || []), user.email],
      }));
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to join", "error");
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
    <main className="min-h-screen bg-base-200 pb-20 font-sans transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <button onClick={() => router.back()} className="btn btn-ghost btn-sm mb-4 text-base-content/70">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden flex flex-col md:flex-row">
          <figure className="md:w-1/2 h-64 md:h-auto">
            <img
              src={event.imageUrl || "https://images.unsplash.com/photo-1593113589910-740dea31b715?q=80&w=600&auto=format&fit=crop"}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1593113589910-740dea31b715?q=80&w=600&auto=format&fit=crop";
              }}
            />
          </figure>
          <div className="p-8 md:w-1/2 flex flex-col">
            <div className="badge bg-secondary text-secondary-content mb-4 font-bold border-none">{event.eventType}</div>
            <h1 className="text-3xl font-serif font-bold text-base-content mb-4">{event.title}</h1>
            <p className="text-base-content/70 leading-relaxed mb-6 flex-grow">{event.description}</p>
            
            <div className="space-y-3 mb-8 bg-base-200 p-4 rounded-xl border border-base-300">
              <p className="flex items-center gap-3 text-base-content/80"><FiMapPin className="text-primary" /> {event.location}</p>
              <p className="flex items-center gap-3 text-base-content/80"><FiCalendar className="text-primary" /> {new Date(event.eventDate).toLocaleDateString()}</p>
              <p className="flex items-center gap-3 text-base-content/80"><FiUser className="text-primary" /> Organized by: {event.userName}</p>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleJoinEvent}
                disabled={isJoining || isAlreadyJoined}
                className={`btn w-full rounded-xl ${isAlreadyJoined ? "btn-success text-white" : "btn-primary text-primary-content"} ${isJoining ? "loading" : ""}`}
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

export default function EventDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    }>
      <EventDetailsContent />
    </Suspense>
  );
}