import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Testimonials from '@/components/sections/Testimonials';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
