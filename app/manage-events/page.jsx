"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2, FiCalendar, FiMapPin } from "react-icons/fi";

export default function ManageEventsPage() {
  const { user, token, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const fetchMyEvents = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching my events", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyEvents();
  }, [token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", error.response?.data?.message || "Failed to delete", "error");
      }
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200">
      
        <div className="max-w-6xl mx-auto mt-10 px-4">
           <div className="text-center text-gray-400 py-20">Loading your events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="mb-8 border-b pb-4 border-base-300 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Your Events</h1>
            <p className="text-gray-400">View, edit, or delete the events you created.</p>
          </div>
          <Link href="/create-event" className="btn btn-primary btn-sm">
            + New Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center bg-base-100 p-10 rounded-xl border border-base-300">
            <p className="text-gray-400 text-lg mb-4">You have not created any events yet.</p>
            <Link href="/create-event" className="btn btn-primary btn-outline">
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
            <table className="table w-full">
              <thead className="bg-base-300 text-white">
                <tr>
                  <th>Event Title</th>
                  <th>Type</th>
                  <th>Date & Location</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-base-200 transition-colors">
                    <td>
                      <div className="font-bold text-white line-clamp-1">{event.title}</div>
                      <div className="text-sm text-gray-400 line-clamp-1 max-w-xs">{event.description}</div>
                    </td>
                    <td>
                      <div className="badge badge-secondary badge-sm">{event.eventType}</div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-300 flex flex-col gap-1">
                        <span className="flex items-center gap-1"><FiCalendar /> {new Date(event.eventDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><FiMapPin /> {event.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <Link href={`/manage-events/edit/${event._id}`} className="btn btn-xs btn-info text-white">
                          <FiEdit /> Edit
                        </Link>
                        <button onClick={() => handleDelete(event._id)} className="btn btn-xs btn-error text-white">
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}