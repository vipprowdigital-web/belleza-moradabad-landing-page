import CareerPathways from "./components/CareerPathways";
import CoursesSection from "./components/CoursesSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import HeroCollage from "./components/HeroCollage";
import HeroSection from "./components/Herosection";
import StudentWorkShowcase from "./components/StudentWorkShowcase";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUs from "./components/WhyChooseUs";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <HeroCollage />
      <CoursesSection />
      <CareerPathways />
      <WhyChooseUs />
      <StudentWorkShowcase />
      <FAQSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}