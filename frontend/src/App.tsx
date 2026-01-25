import "./index.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import BestSellerSection from "./components/home/BestSellerSection";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main>
        <Hero />
        <BestSellerSection />
      </main>
      <Footer />
    </div>
  );
}
