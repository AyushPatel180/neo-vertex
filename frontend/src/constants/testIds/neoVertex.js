// Test IDs for the Neo Vertex Ventures landing page.
// Naming: keys camelCase, values kebab-case `<section>-<element>`.

export const NV = {
  // Navigation
  navContainer: 'nv-nav-container',
  navLogo: 'nv-nav-logo',
  navLinkPlatform: 'nv-nav-link-platform',
  navLinkCapabilities: 'nv-nav-link-capabilities',
  navLinkVision: 'nv-nav-link-vision',
  navLinkBriefing: 'nv-nav-link-briefing',
  navCtaBriefing: 'nv-nav-cta-briefing',
  navMobileToggle: 'nv-nav-mobile-toggle',

  // Hero
  hero: 'nv-hero',
  heroHeadline: 'nv-hero-headline',
  heroSubcopy: 'nv-hero-subcopy',
  heroCtaPrimary: 'nv-hero-cta-primary',
  heroCtaSecondary: 'nv-hero-cta-secondary',
  heroCanvas: 'nv-hero-canvas',

  // Trust strip
  trustStrip: 'nv-trust-strip',

  // Platform / architecture
  platformSection: 'nv-platform-section',
  platformLayer: (slug) => `nv-platform-layer-${slug}`,

  // Capabilities
  capabilitiesSection: 'nv-capabilities-section',
  capabilityBlock: (slug) => `nv-capability-${slug}`,

  // Why
  whySection: 'nv-why-section',
  whyPillar: (slug) => `nv-why-pillar-${slug}`,

  // Manifesto
  manifestoSection: 'nv-manifesto-section',

  // Footer
  footer: 'nv-footer',
  footerLink: (slug) => `nv-footer-link-${slug}`,

  // Briefing dialog
  briefingDialog: 'nv-briefing-dialog',
  briefingFieldName: 'nv-briefing-field-name',
  briefingFieldEmail: 'nv-briefing-field-email',
  briefingFieldCompany: 'nv-briefing-field-company',
  briefingFieldRole: 'nv-briefing-field-role',
  briefingFieldIntent: 'nv-briefing-field-intent',
  briefingFieldMessage: 'nv-briefing-field-message',
  briefingSubmit: 'nv-briefing-submit',
  briefingCancel: 'nv-briefing-cancel',
  briefingSuccess: 'nv-briefing-success',
  briefingError: 'nv-briefing-error',

  // New extended sections
  continuousSection: 'nv-continuous-section',
  privacyScaleSection: 'nv-privacy-scale-section',
  stackSection: 'nv-stack-section',
  stackModule: (slug) => `nv-stack-module-${slug}`,
  agentsSection: 'nv-agents-section',
  agentCard: (slug) => `nv-agent-${slug}`,
  researchSection: 'nv-research-section',
  industriesSection: 'nv-industries-section',
  industryItem: (slug) => `nv-industry-${slug}`,
  futureSection: 'nv-future-section',
  buildSection: 'nv-build-section',
  buildCta: 'nv-build-cta',
  footerCtaBriefing: 'nv-footer-cta-briefing',
};
