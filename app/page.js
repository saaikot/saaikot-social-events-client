import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to SocialEvents</h1>
        <p className="text-xl text-gray-600">Discover and join community-driven social events.</p>
      </div>
    </main>
  );
}