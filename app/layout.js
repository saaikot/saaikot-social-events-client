import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata = {
  title: "HopeHub - Social Events & Charity Platform", 
  description: "Connecting passionate people with meaningful causes. Join events, donate, and make a difference in your community.",
};

export default function RootLayout({ children }) {
    return (
    <html lang="en" data-theme="light">
      <body className={`${playfair.variable} ${nunito.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar /> {/* ✅ এখানে থাকতে হবে */}
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Footer /> 
        </AuthProvider>
      </body>
    </html>
  );
}