"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function JoinedEventsPage() {
  const { user, token, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        const joined = response.data.filter(
          (event) => event.joinedUsers && event.joinedUsers.includes(user.email)
        );
        setEvents(joined);
      } catch (error) {
        console.error("Error fetching joined events", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && token) fetchJoinedEvents();
  }, [user, token]);

  if (loading || isLoading) {
    return <div className="min-h-screen bg-base-200 flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    
    <div className="min-h-screen bg-base-200 pb-20">
      
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="mb-8 border-b pb-4 border-base-300">
          <h1 className="text-3xl font-bold text-white mb-2">Joined Events</h1>
          <p className="text-gray-400">Events you are participating in.</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-20">
            You haven't joined any events yet. <Link href="/events" className="text-primary underline">Explore events</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="card bg-base-100 shadow-xl border border-base-300">
                <figure className="h-40">
                  <img src={event.imageUrl || "https://via.placeholder.com/400x200"} alt={event.title} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-white line-clamp-1">{event.title}</h3>
                  <div className="text-sm text-gray-400 space-y-1 mt-2">
                    <p className="flex items-center gap-2"><FiCalendar /> {new Date(event.eventDate).toLocaleDateString()}</p>
                    <p className="flex items-center gap-2"><FiMapPin /> {event.location}</p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link href={`/events/${event._id}`} className="btn btn-sm btn-outline btn-primary w-full">
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}