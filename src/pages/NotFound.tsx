import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Seo
        title="Page Not Found | PointBlank"
        description="The requested PointBlank page could not be found."
        path={location.pathname}
        noIndex
      />
      <Header />
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 pt-[108px] pb-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-white/65">Page not found</p>
          <a href="/" className="text-[#ff8a96] transition-colors hover:text-white">
            Return to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
