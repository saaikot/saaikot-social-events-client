import Link from "next/link";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 font-sans transition-colors duration-300">
      <div className="text-center max-w-lg">
        
        {/* 404 Text with Gradient/Glow effect */}
        <h1 className="text-8xl md:text-9xl font-serif font-bold text-primary mb-4 drop-shadow-lg">
          4<span className="text-secondary">0</span>4
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-base-content mb-6">
          <FiAlertTriangle className="text-secondary text-2xl" />
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
        </div>
        
        <p className="text-base-content/70 mb-10 leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link 
          href="/" 
          className="btn btn-primary text-primary-content rounded-full px-8 font-bold hover:scale-105 transition-transform"
        >
          <FiArrowLeft /> Back to Home
        </Link>
        
      </div>
    </main>
  );
}