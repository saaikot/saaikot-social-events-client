"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { authClient } from "@/utils/auth-client";
import { FiImage, FiMapPin, FiCalendar, FiType, FiFileText } from "react-icons/fi";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [formData, setFormData] = useState({ title: "", description: "", eventType: "Donation", imageUrl: "", location: "", eventDate: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) router.replace("/login");
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`)
        .then(res => {
          const { title, description, eventType, imageUrl, location, eventDate } = res.data;
          setFormData({ title, description, eventType, imageUrl, location, eventDate: new Date(eventDate).toISOString().split("T")[0] });
        })
        .catch(() => router.push("/manage-events"));
    }
  }, [id, user, isPending, router]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data: jwtData } = await authClient.token();
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${jwtData.token}` },
      });
      Swal.fire({ icon: "success", title: "Event Updated!", timer: 2000, showConfirmButton: false });
      router.push("/manage-events");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed", text: error.response?.data?.message || "Error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Update Event</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Event Title</span></label>
                <input type="text" name="title" className="input input-bordered w-full" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Description</span></label>
                <textarea name="description" className="textarea textarea-bordered w-full h-24" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Event Type</span></label>
                  <select name="eventType" className="select select-bordered w-full" value={formData.eventType} onChange={handleChange}>
                    <option value="Donation">Donation</option>
                    <option value="Cleanup">Cleanup</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Event Date</span></label>
                  <input type="date" name="eventDate" className="input input-bordered w-full" value={formData.eventDate} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Location</span></label>
                  <input type="text" name="location" className="input input-bordered w-full" value={formData.location} onChange={handleChange} required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Image URL</span></label>
                  <input type="url" name="imageUrl" className="input input-bordered w-full" value={formData.imageUrl} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>Update Event</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}