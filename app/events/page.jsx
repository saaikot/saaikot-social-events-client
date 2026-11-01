"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
// ❌ Navbar এর ইম্পোর্ট মুছে ফেলা হয়েছে
import { FiCalendar, FiMapPin, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, events]);

  return (
    // ✅ <main> ট্যাগকে <div> করা হয়েছে
    <div className="min-h-screen bg-base-200 font-sans transition-colors duration-300">
      
      {/* ❌ import Navbar from "@/components/Navbar"; এখান থেকে মুছে ফেলা হয়েছে */}

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Upcoming Events</h1>
          <p className="text-base-content/70">Discover and join events to make a difference.</p>
        </div>

        <div className="max-w-md mx-auto mb-10 relative">
          <FiSearch className="absolute left-4 top-4 text-base-content/50" size={20} />
          <input
            type="text"
            placeholder="Search by title or location..."
            className="input input-bordered w-full pl-12 rounded-full bg-base-100 border-base-300 text-base-content focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-base-100 rounded-2xl h-80 animate-pulse border border-base-300"></div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-base-content/60 text-xl py-20">No events found!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-base-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-base-300 flex flex-col"
              >
                <figure className="h-48 overflow-hidden relative">
                  <img
                    src={event.imageUrl || "https://images.unsplash.com/photo-1593113589910-740dea31b715?q=80&w=600&auto=format&fit=crop"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1593113589910-740dea31b715?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="badge bg-secondary text-secondary-content font-bold border-none">
                      {event.eventType}
                    </span>
                  </div>
                </figure>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-bold text-base-content mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="mt-auto space-y-2 text-sm text-base-content/80 mb-6">
                    <p className="flex items-center gap-2"><FiMapPin className="text-secondary" /> {event.location}</p>
                    <p className="flex items-center gap-2"><FiCalendar className="text-secondary" /> {new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>

                  <Link href={`/events/${event._id}`} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content w-full rounded-xl transition-colors duration-300">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}