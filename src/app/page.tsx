import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import ScoringForm from '@/components/ScoringForm';
import SocialProof from '@/components/SocialProof';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-petdark-950 text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-slate-950">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <ScoringForm />
      <SocialProof />
      <FAQ />
      <Footer />
    </main>
  );
}
