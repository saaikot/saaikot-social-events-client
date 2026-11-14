"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiSearch } from "react-icons/fi";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then(res => setEvents(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-200 font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Upcoming Events</h1>
          <p className="text-base-content/70">Discover and join events to make a difference.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <FiSearch className="absolute left-4 top-4 text-base-content/50" size={20} />
          <input 
            type="text" 
            placeholder="Search by title or location..." 
            className="input input-bordered w-full pl-12 rounded-full bg-base-100 border-base-300 focus:border-primary" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-base-100 rounded-2xl h-80 animate-pulse border border-base-300"></div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-base-content/60 text-xl py-20">No events found!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event._id} className="bg-base-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-300 flex flex-col group">
                
                {/* Image & Badge */}
                <figure className="h-48 overflow-hidden relative">
                  <img 
                    src={event.imageUrl || "https://images.unsplash.com/photo-1593113589910-740dea31b715"} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4">
                    <span className="badge bg-secondary text-secondary-content font-bold border-none">{event.eventType}</span>
                  </div>
                </figure>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2 flex-grow">
                    {event.description}
                  </p>
                  
                  {/* Info */}
                  <div className="space-y-2 text-sm text-base-content/80 mb-6">
                    <p className="flex items-center gap-2"><FiMapPin className="text-secondary" /> {event.location}</p>
                    <p className="flex items-center gap-2"><FiCalendar className="text-secondary" /> {new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>

                  {/* Button */}
                  <Link href={`/events/${event._id}`} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content w-full rounded-xl transition-colors duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}