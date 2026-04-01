'use client';
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { DomainExpertiseSection } from '@/components/DomainExpertiseSection';
import { ProductsSection } from '@/components/ProductsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';
import { SplashLoader } from '@/components/SplashLoader';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Safety fallback to ensure the site eventually loads if animation hangs
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-[#050505]">
      <SplashLoader onComplete={() => setIsLoaded(true)} />
      <HeroSection isLoaded={isLoaded} />
      <PhilosophySection />
      <DomainExpertiseSection />
      <ProductsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
