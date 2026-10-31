"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে ইভেন্ট লোড করা
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        // প্রথম ৬টা ইভেন্ট দেখাবো
        setEvents(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />

      {/* 🌟 Banner Section 🌟 */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Empowering Communities through <span className="text-primary">Social Service</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join hands with us to make a difference. Discover, create, and participate in social development events happening around you.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/events" className="btn btn-primary px-8">Explore Events</Link>
            <Link href="/create-event" className="btn btn-outline btn-white px-8">Create Event</Link>
          </div>
        </div>
      </section>

      {/* 🌟 Recent Upcoming Events Section 🌟 */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Upcoming Events</h2>
          <p className="text-gray-600">Find the latest social events happening near you.</p>
        </div>

        {loading ? (
          // লোডিং স্কেলেটন
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card bg-base-100 shadow-xl h-96 animate-pulse bg-gray-300"></div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">No upcoming events found!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <figure className="h-48 overflow-hidden">
                  <img
                    src={event.imageUrl || "https://via.placeholder.com/400x200"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </figure>
                <div className="card-body">
                  <div className="badge badge-primary text-white mb-2">{event.eventType}</div>
                  <h3 className="card-title text-xl font-bold line-clamp-1">{event.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
                  
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><FiMapPin /> {event.location}</p>
                    <p className="flex items-center gap-2"><FiCalendar /> {new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link href={`/events/${event._id}`} className="btn btn-primary btn-sm w-full">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🌟 Gallery Section (Static) 🌟 */}
      <section className="py-20 bg-base-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact in Pictures</h2>
            <p className="text-gray-600">Glimpses of our past community service events.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1593113589910-740dea31b715?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop",
            ].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Gallery"
                className="w-full h-48 object-cover rounded-xl hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}