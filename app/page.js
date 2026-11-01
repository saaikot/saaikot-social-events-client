"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiArrowRight, FiHeart, FiUsers, FiTarget, FiShield } from "react-icons/fi";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/recent?limit=6`);
        
    
        setEvents(response.data); 
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
      <section className="relative bg-primary py-20 md:py-32 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
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
          <div className="md:w-1/2 relative mt-10 md:mt-0">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative z-10 rounded-tl-[100px] rounded-br-[100px] overflow-hidden border-8 border-white/10 shadow-2xl">
              <img src="/banner.jpg" alt="Volunteers" className="w-full h-[500px] object-cover" />
            </motion.div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-secondary-content z-20 shadow-xl">
               <FiHeart size={40} className="fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 FEATURE SECTION 🌟 */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">Why Choose HopeHub?</h2>
          <p className="text-base-content/70">We provide the best platform to organize and join social events.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <FiUsers className="mx-auto text-5xl text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
            <p className="text-sm opacity-70">Connect with like-minded individuals and build a stronger community together.</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <FiTarget className="mx-auto text-5xl text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Easy Event Creation</h3>
            <p className="text-sm opacity-70">Create and manage your social events seamlessly with our intuitive dashboard.</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 text-center">
            <FiShield className="mx-auto text-5xl text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-sm opacity-70">Your data is safe with our JWT-based secure authentication system.</p>
          </div>
        </div>
      </section>

      {/* 🌟 UPCOMING EVENTS (Grid Style, 6 items) 🌟 */}
      <section className="py-20 max-w-7xl mx-auto px-4 bg-base-100 rounded-3xl mb-20 shadow-sm border border-base-300">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 px-4">
          <div>
            <span className="text-secondary font-bold text-sm tracking-wider uppercase mb-2 block">Join Our Latest</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Recent Upcoming Events</h2>
          </div>
          <Link href="/events" className="btn btn-link text-primary font-bold no-underline hover:text-secondary">
            View All Events <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-base-200 rounded-2xl h-80 animate-pulse border border-base-300"></div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-base-content/60 text-xl py-10">No upcoming events found!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-300 flex flex-col group"
              >
                <figure className="h-48 overflow-hidden relative">
                  <img src={event.imageUrl || "https://images.unsplash.com/photo-1593113589910-740dea31b715"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4"><span className="badge bg-secondary text-secondary-content font-bold border-none">{event.eventType}</span></div>
                </figure>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">{event.title}</h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2 flex-grow">{event.description}</p>
                  <div className="space-y-2 text-sm text-base-content/80 mb-6">
                    <p className="flex items-center gap-2"><FiMapPin className="text-secondary" /> {event.location}</p>
                    <p className="flex items-center gap-2"><FiCalendar className="text-secondary" /> {new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/events/${event._id}`} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content w-full rounded-xl transition-colors duration-300">View Details</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 🌟 NEWSLETTER SECTION 🌟 */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Subscribe to our Newsletter</h2>
          <p className="text-base-content/70 mb-6">Stay updated with our latest social events and charity programs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input type="email" placeholder="Enter your email address" className="input input-bordered w-full rounded-full bg-base-100 text-base-content" />
            <button className="btn btn-primary rounded-full px-8">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}