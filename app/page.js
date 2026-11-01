"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiArrowRight, FiHeart } from "react-icons/fi";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        setEvents(response.data.slice(0, 4)); 
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content transition-colors duration-300">

      {/* 🌟 HERO SECTION 🌟 */}
      <section className="relative bg-primary py-20 md:py-32 overflow-hidden rounded-b-[40px] md:rounded-b-[80px] transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Hero Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-secondary text-sm font-semibold mb-4 border border-white/20">
                🤝 Give Hope, Change Lives
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-content leading-tight mb-6">
                Donate Today, <br />
                Transform Lives <span className="text-secondary">Forever!</span>
              </h1>
              <p className="text-primary-content/80 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                Explore the variety of volunteer opportunities available. From event planning to fundraising, there are many ways to lend your talents.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link href="/events" className="btn bg-secondary text-secondary-content hover:bg-opacity-80 border-none rounded-full px-8 font-bold">
                  Discover More <FiArrowRight />
                </Link>
                <Link href="/create-event" className="btn btn-outline text-primary-content border-primary-content/50 hover:bg-primary-content hover:text-primary rounded-full px-8">
                  Create Event
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Image with Overlapping Effects */}
          <div className="md:w-1/2 relative mt-10 md:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }} 
              animate={{ opacity: 1, scale: 1, rotate: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 rounded-tl-[100px] rounded-br-[100px] overflow-hidden border-8 border-white/10 shadow-2xl"
            >
              <img src="/banner.jpg" alt="Volunteers" className="w-full h-[500px] object-cover" />
            </motion.div>
            
            {/* Decorative Circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-secondary-content z-20 shadow-xl">
               <FiHeart size={40} className="fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 STATS SECTION 🌟 */}
      <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-4">
        
        <div className="bg-base-100 text-base-content rounded-2xl shadow-xl py-8 px-6 flex flex-wrap justify-around items-center gap-6 border-b-4 border-secondary transition-colors duration-300">
          {[
            { label: "Customers Reviews", value: "3K+" },
            { label: "Customer Satisfaction", value: "100%" },
            { label: "Year Experience", value: "10+" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl font-serif font-bold text-primary mb-1">{stat.value}</p>
             
              <p className="text-base-content/70 font-semibold text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 UPCOMING EVENTS (List Style) 🌟 */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-secondary font-bold text-sm tracking-wider uppercase mb-2 block">Join Our Latest</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Upcoming Events</h2>
          </div>
          <Link href="/events" className="btn btn-link text-primary font-bold no-underline hover:text-secondary">
            View All Events <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              
              <div key={n} className="bg-base-100 rounded-2xl h-48 animate-pulse shadow-sm border border-base-300"></div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-base-content/60 text-xl py-10">No upcoming events found!</div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => {
              const eventDate = new Date(event.eventDate);
              const day = eventDate.getDate();
              const month = eventDate.toLocaleString('default', { month: 'short' });
              const year = eventDate.getFullYear();

              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  
                  className="bg-base-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group border border-base-300"
                >
                  
                  <div className="bg-base-200 md:w-40 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-base-300 transition-colors duration-300">
                    <span className="text-4xl font-serif font-bold text-secondary">{day}</span>
                    <span className="text-primary font-bold uppercase tracking-widest">{month} {year}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                    
                    <h3 className="text-2xl font-serif font-bold text-base-content mb-2 group-hover:text-secondary transition-colors">
                      {event.title}
                    </h3>
                   
                    <p className="text-base-content/70 mb-4 line-clamp-2">{event.description}</p>
                    
                
                    <div className="flex flex-wrap gap-4 text-sm text-base-content/80 mb-6">
                      <span className="flex items-center gap-1"><FiMapPin className="text-secondary" /> {event.location}</span>
                      <span className="flex items-center gap-1"><FiCalendar className="text-secondary" /> {eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>

                    <Link href={`/events/${event._id}`} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content w-fit rounded-full px-6 transition-colors duration-300">
                      Event Details
                    </Link>
                  </div>

                  {/* Image */}
                  <div className="md:w-72 h-48 md:h-auto overflow-hidden relative">
                    <img
                      src={event.imageUrl || "/placeholder.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="badge bg-secondary text-secondary-content font-bold border-none">{event.eventType}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 🌟 CALL TO ACTION / GALLERY STRIP 🌟 */}
      <section className="bg-primary py-20 rounded-t-[40px] md:rounded-t-[80px] transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif text-primary-content mb-8">Trusted By Over 90K+ Communities Worldwide</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {["/gallery-1.jpg", "/gallery-2.jpg", "/gallery-3.jpg", "/gallery-4.jpg"].map((img, idx) => (
                 <img key={idx} src={img} alt="Gallery" className="w-full h-32 md:h-48 object-cover rounded-xl" />
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}