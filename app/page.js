"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { FiCalendar, FiMapPin, FiArrowRight, FiUsers, FiTarget, FiShield } from "react-icons/fi";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/recent?limit=6`)
      .then(res => setEvents(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You have successfully subscribed to our newsletter.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 md:py-32 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
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
              <Link href="/events" className="btn bg-secondary text-secondary-content border-none rounded-full px-8 font-bold hover:bg-opacity-80">
                Discover More <FiArrowRight />
              </Link>
              <Link href="/create-event" className="btn btn-outline text-primary-content border-primary-content/50 hover:bg-primary-content hover:text-primary rounded-full px-8">
                Create Event
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative mt-10 md:mt-0">
            <div className="relative z-10 rounded-tl-[100px] rounded-br-[100px] overflow-hidden border-8 border-white/10 shadow-2xl">
              <img src="/banner.jpg" alt="Volunteers" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            <p className="text-sm opacity-70">Your data is safe with our secure authentication system.</p>
          </div>
        </div>
      </section>

      {/* Recent Events */}
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
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-base-200 rounded-2xl h-80 animate-pulse border border-base-300"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {events.map((event) => (
              <div key={event._id} className="bg-base-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-300 flex flex-col group">
                <figure className="h-48 overflow-hidden relative">
                  <img src={event.imageUrl || "https://images.unsplash.com/photo-1593113589910-740dea31b715"} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4"><span className="badge bg-secondary text-secondary-content font-bold border-none">{event.eventType}</span></div>
                </figure>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">{event.title}</h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2 flex-grow">{event.description}</p>
                  <div className="space-y-2 text-sm text-base-content/80 mb-6">
                    <p className="flex items-center gap-2"><FiMapPin className="text-secondary" /> {event.location}</p>
                    <p className="flex items-center gap-2"><FiCalendar className="text-secondary" /> {new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/events/${event._id}`} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content w-full rounded-xl">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Gallery Section (Requirement) */}
      <section className="py-16 max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Community Gallery</h2>
          <p className="text-base-content/70">Glimpses of our past social service events.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://images.unsplash.com/photo-1593113589910-740dea31b715?q=80&w=500&auto=format&fit=crop" alt="Gallery 1" className="w-full h-40 md:h-56 object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=500&auto=format&fit=crop" alt="Gallery 2" className="w-full h-40 md:h-56 object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop" alt="Gallery 3" className="w-full h-40 md:h-56 object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=500&auto=format&fit=crop" alt="Gallery 4" className="w-full h-40 md:h-56 object-cover rounded-xl shadow-md" />
        </div>
      </section>

      {/* Newsletter Section (Requirement) */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Subscribe to our Newsletter</h2>
          <p className="text-base-content/70 mb-6">Stay updated with our latest social events and charity programs.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input type="email" placeholder="Enter your email address" required className="input input-bordered w-full rounded-full bg-base-100 text-base-content" />
            <button type="submit" className="btn btn-primary rounded-full px-8">Subscribe</button>
          </form>
        </div>
      </section>

    </div>
  );
}