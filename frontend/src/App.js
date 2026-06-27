import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Nav from '@/components/neovertex/Nav';
import ScrollProgress from '@/components/neovertex/ScrollProgress';
import Hero from '@/components/neovertex/Hero';
import ContinuousLearning from '@/components/neovertex/ContinuousLearning';
import PrivacyScale from '@/components/neovertex/PrivacyScale';
import EnterpriseStack from '@/components/neovertex/EnterpriseStack';
import AgentsGrid from '@/components/neovertex/AgentsGrid';
import Research from '@/components/neovertex/Research';
import Industries from '@/components/neovertex/Industries';
import WhyNeoVertex from '@/components/neovertex/WhyNeoVertex';
import Manifesto from '@/components/neovertex/Manifesto';
import BuildWithUs from '@/components/neovertex/BuildWithUs';
import Footer from '@/components/neovertex/Footer';
import BriefingDialog from '@/components/neovertex/BriefingDialog';
import { useReveal } from '@/components/neovertex/useReveal';

function Landing() {
  const [briefingOpen, setBriefingOpen] = useState(false);
  useReveal();

  const open = () => setBriefingOpen(true);

  return (
    <div className="min-h-screen bg-[var(--nv-bg)] text-[var(--nv-text-primary)] nv-grain">
      <ScrollProgress />
      <Nav onOpenBriefing={open} />
      <main>
        <Hero onOpenBriefing={open} />
        <ContinuousLearning />
        <PrivacyScale />
        <EnterpriseStack />
        <AgentsGrid />
        <Research />
        <Industries />
        <WhyNeoVertex />
        <Manifesto />
        <BuildWithUs onOpenBriefing={open} />
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
