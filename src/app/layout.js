  import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Bloag Art",
  description: "Discover a powerful job portal and stay informed with the latest industry news. Find your dream job and access valuable insights for career growth. Start exploring now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
