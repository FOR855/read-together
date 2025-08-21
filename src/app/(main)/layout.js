import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Read Together",
  description: "just read together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="homeBox">
          <NavBar />
          <main className="mainBox">
            <div className="topBox">
              <Search />
              <UserProfile />
            </div>
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
