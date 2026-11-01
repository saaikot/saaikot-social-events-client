"use client";
import { Suspense, useState, useContext, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";


function EditEventContent() {
  const { id } = useParams();
  const router = useRouter();
  const { token, loading } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "Donation",
    imageUrl: "",
    location: "",
    eventDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`);
        const event = response.data;
        
        const formattedDate = new Date(event.eventDate).toISOString().split('T')[0];
        
        setFormData({
          title: event.title,
          description: event.description,
          eventType: event.eventType,
          imageUrl: event.imageUrl || "",
          location: event.location,
          eventDate: formattedDate,
        });
      } catch (error) {
        Swal.fire("Error", "Event not found", "error");
        router.push("/manage-events");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Event updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/manage-events");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Update failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) return <div className="min-h-screen bg-base-200"></div>;

  return (
    <main className="min-h-screen bg-base-200 pb-20 font-sans transition-colors duration-300">
      import Navbar from "@/components/Navbar";
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-8">
          <h2 className="text-2xl font-serif font-bold text-base-content mb-6">Edit Event</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text text-base-content">Event Title</span></label>
              <input type="text" name="title" className="input input-bordered bg-base-200 border-base-300 text-base-content" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text text-base-content">Description</span></label>
              <textarea name="description" className="textarea textarea-bordered bg-base-200 border-base-300 text-base-content h-24" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content">Event Type</span></label>
                <select name="eventType" className="select select-bordered bg-base-200 border-base-300 text-base-content" value={formData.eventType} onChange={handleChange}>
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content">Date</span></label>
                <input type="date" name="eventDate" className="input input-bordered bg-base-200 border-base-300 text-base-content" value={formData.eventDate} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content">Location</span></label>
                <input type="text" name="location" className="input input-bordered bg-base-200 border-base-300 text-base-content" value={formData.location} onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-base-content">Image URL</span></label>
                <input type="url" name="imageUrl" className="input input-bordered bg-base-200 border-base-300 text-base-content" value={formData.imageUrl} onChange={handleChange} />
              </div>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className={`btn btn-primary text-primary-content w-full ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}


export default function EditEventPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    }>
      <EditEventContent />
    </Suspense>
  );
}