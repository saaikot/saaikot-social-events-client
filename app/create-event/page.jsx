"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { FiImage, FiMapPin, FiCalendar, FiType, FiFileText } from "react-icons/fi";

export default function CreateEventPage() {
  const { user, token, loading } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "Donation",
    imageUrl: "",
    location: "",
    eventDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "Your event has been created successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/events");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to create event",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Create a New Event</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Event Title</span></label>
                <div className="relative">
                  <FiType className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Winter Clothes Distribution"
                    className="input input-bordered w-full pl-10"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Description</span></label>
                <div className="relative">
                  <FiFileText className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="description"
                    placeholder="Describe the event details..."
                    className="textarea textarea-bordered w-full pl-10 h-24"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Event Type</span></label>
                  <select
                    name="eventType"
                    className="select select-bordered w-full"
                    value={formData.eventType}
                    onChange={handleChange}
                  >
                    <option value="Donation">Donation</option>
                    <option value="Cleanup">Cleanup</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Event Date</span></label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-3.5 text-gray-400 z-10" />
                    <input
                      type="date"
                      name="eventDate"
                      className="input input-bordered w-full pl-10"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Location</span></label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Mirpur 10, Dhaka"
                      className="input input-bordered w-full pl-10"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Image URL (Optional)</span></label>
                  <div className="relative">
                    <FiImage className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="url"
                      name="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      className="input input-bordered w-full pl-10"
                      value={formData.imageUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control mt-8">
                <button
                  type="submit"
                  className={`btn btn-primary w-full text-lg ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}