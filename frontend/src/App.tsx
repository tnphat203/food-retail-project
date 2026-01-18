import "./index.css";
import Header from "./components/layout/Header";
import Hero from "./components/Hero";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
