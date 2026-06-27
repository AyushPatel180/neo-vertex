import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Nav from '@/components/neovertex/Nav';
import Hero from '@/components/neovertex/Hero';
import TrustStrip from '@/components/neovertex/TrustStrip';
import PlatformStack from '@/components/neovertex/PlatformStack';
import Capabilities from '@/components/neovertex/Capabilities';
import WhyNeoVertex from '@/components/neovertex/WhyNeoVertex';
import Manifesto from '@/components/neovertex/Manifesto';
import Footer from '@/components/neovertex/Footer';
import BriefingDialog from '@/components/neovertex/BriefingDialog';
import { useReveal } from '@/components/neovertex/useReveal';

function Landing() {
  const [briefingOpen, setBriefingOpen] = useState(false);
  useReveal();

  const open = () => setBriefingOpen(true);

  return (
    <div className="min-h-screen bg-[var(--nv-bg)] text-[var(--nv-text-primary)] nv-grain">
      <Nav onOpenBriefing={open} />
      <main>
        <Hero onOpenBriefing={open} />
        <TrustStrip />
        <PlatformStack />
        <Capabilities />
        <WhyNeoVertex />
        <Manifesto onOpenBriefing={open} />
      </main>
      <Footer onOpenBriefing={open} />
      <BriefingDialog open={briefingOpen} onOpenChange={setBriefingOpen} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--nv-surface-2)',
            color: 'var(--nv-text-primary)',
            border: '1px solid var(--nv-border-strong)',
            borderRadius: '2px',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
