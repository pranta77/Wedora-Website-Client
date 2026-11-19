import HeroSection from "@/components/home/HeroSection";
import FeaturedServices from "@/components/home/FeaturedServices";
import CategoriesSection from "@/components/home/CategoriesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <CategoriesSection/>
      <WhyChooseUs/>
      <Testimonials/>
    </>
  );
}