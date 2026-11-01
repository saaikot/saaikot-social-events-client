import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata = {
  title: "HopeHub - Social Events Platform", 
  description: "Community-driven event management platform",
};


export default function RootLayout({ children }) {
  return (
    
    <html lang="en" data-theme="deen"> 
      <body className={`${playfair.variable} ${nunito.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}