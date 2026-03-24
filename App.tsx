import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Send, 
  Mail, 
  MessageCircle, 
  Users, 
  ChevronRight,
  Menu,
  X,
  UserCheck,
  FileCheck,
  ScanFace,
  Landmark,
  Bitcoin,
  CreditCard
} from 'lucide-react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-[6vw] py-4 lg:py-5 flex justify-between items-center bg-[#F6F7F9]/80 backdrop-blur-md">
        <div className="text-[#0B1E2F] font-bold text-lg lg:text-xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          OmniCheck
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button onClick={() => scrollToSection('kyc')} className="text-[#0B1E2F] text-sm font-medium hover:text-[#3D6B61] transition-colors">
            KYC
          </button>
          <button onClick={() => scrollToSection('services')} className="text-[#0B1E2F] text-sm font-medium hover:text-[#3D6B61] transition-colors">
            Services
          </button>
          <button onClick={() => scrollToSection('about')} className="text-[#0B1E2F] text-sm font-medium hover:text-[#3D6B61] transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-[#0B1E2F] text-sm font-medium hover:text-[#3D6B61] transition-colors">
            Contact
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#0B1E2F] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#F6F7F9] flex flex-col items-center justify-center gap-6 md:hidden">
          <button onClick={() => scrollToSection('kyc')} className="text-[#0B1E2F] text-2xl font-semibold">
            KYC
          </button>
          <button onClick={() => scrollToSection('services')} className="text-[#0B1E2F] text-2xl font-semibold">
            Services
          </button>
          <button onClick={() => scrollToSection('about')} className="text-[#0B1E2F] text-2xl font-semibold">
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-[#0B1E2F] text-2xl font-semibold">
            Contact
          </button>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    
    if (!section || !leftCard || !rightCard || !headline || !body) return;

    const ctx = gsap.context(() => {
      gsap.set([leftCard, rightCard], { opacity: 0, scale: 0.98 });
      gsap.set(leftCard, { x: '-6vw' });
      gsap.set(rightCard, { x: '6vw' });
      gsap.set(headline.children, { opacity: 0, y: 24 });
      gsap.set(body.children, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.to(leftCard, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(rightCard, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.65')
      .to(headline.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out'
      }, '-=0.4')
      .to(body.children, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      }, '-=0.3');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.to(leftCard, { opacity: 1, x: 0, scale: 1, duration: 0.3 });
            gsap.to(rightCard, { opacity: 1, x: 0, scale: 1, duration: 0.3 });
            gsap.to(headline.children, { opacity: 1, y: 0, duration: 0.3 });
            gsap.to(body.children, { opacity: 1, y: 0, duration: 0.3 });
          }
        }
      });

      scrollTl.fromTo(rightCard, 
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(leftCard,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-10vw', scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(body.children,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#F6F7F9] z-10">
      {/* Left Image Card */}
      <div 
        ref={leftCardRef}
        className="absolute left-[3vw] lg:left-[4vw] top-[12vh] lg:top-[10vh] w-[94vw] lg:w-[46vw] h-[35vh] lg:h-[80vh] card-rounded overflow-hidden card-shadow"
      >
        <img 
          src="/images/hero_office.jpg" 
          alt="Professional KYC services" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right Text Card */}
      <div 
        ref={rightCardRef}
        className="absolute left-[3vw] lg:left-[54vw] top-[50vh] lg:top-[10vh] w-[94vw] lg:w-[42vw] min-h-[45vh] lg:h-[80vh] bg-white card-rounded card-shadow flex flex-col justify-center px-6 lg:px-[4vw] py-8 lg:py-0"
      >
        <span className="label-mono mb-4 lg:mb-6">KYC & VERIFICATION SOLUTIONS</span>
        
        <h1 ref={headlineRef} className="text-[#0B1E2F] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 lg:mb-8">
          <span className="inline-block">Verified</span>{' '}
          <span className="inline-block">accounts.</span>{' '}
          <span className="inline-block">Trusted</span>{' '}
          <span className="inline-block">KYC.</span>
        </h1>
        
        <div ref={bodyRef}>
          <p className="text-[#6B7A89] text-sm sm:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 max-w-md">
            From OTC verified accounts to complete KYC solutions—bank accounts, crypto platforms, and documentation. We verify what matters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <a 
              href="https://t.me/certdoc" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit"
            >
              <Send size={18} />
              Contact on Telegram
            </a>
            <a href="#services" className="link-underline text-sm text-center sm:text-left py-2">
              View services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// KYC Services Section
function KYCSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <Landmark size={28} className="text-[#3D6B61]" />,
      title: 'Verified Bank Accounts',
      description: 'Pre-verified banking accounts ready for immediate use. Full KYC completed.'
    },
    {
      icon: <Bitcoin size={28} className="text-[#3D6B61]" />,
      title: 'Crypto Exchange Accounts',
      description: 'Verified accounts on major crypto platforms. Trade without limits.'
    },
    {
      icon: <CreditCard size={28} className="text-[#3D6B61]" />,
      title: 'OTC Trading Accounts',
      description: 'High-limit OTC accounts for large volume transactions.'
    },
    {
      icon: <FileCheck size={28} className="text-[#3D6B61]" />,
      title: 'Verification Documents',
      description: 'Complete document packages for KYC compliance and verification.'
    },
    {
      icon: <ScanFace size={28} className="text-[#3D6B61]" />,
      title: 'Facial Recognition',
      description: 'Biometric verification solutions and liveness detection support.'
    },
    {
      icon: <UserCheck size={28} className="text-[#3D6B61]" />,
      title: 'New Account Setup',
      description: 'End-to-end account registration with full verification handling.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="kyc" 
      className="relative bg-[#F6F7F9] py-16 lg:py-24 px-4 sm:px-6 lg:px-[6vw]"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <span className="label-mono mb-4 block">CORE SERVICES</span>
          <h2 className="text-[#0B1E2F] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            KYC Solutions & Verified Accounts
          </h2>
          <p className="text-[#6B7A89] text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Complete verification services for individuals and businesses. From OTC accounts to biometric solutions.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white card-rounded card-shadow p-5 lg:p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F6F7F9] flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-[#0B1E2F] text-lg lg:text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-[#6B7A89] text-sm lg:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 lg:mt-12 text-center">
          <a 
            href="https://t.me/certdoc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Send size={18} />
            Get Verified on Telegram
          </a>
        </div>
      </div>
    </section>
  );
}

// Feature Section Component
interface FeatureSectionProps {
  id?: string;
  label: string;
  headline: string;
  body: string;
  cta: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  layout: 'image-left' | 'image-right';
  zIndex: number;
}

function FeatureSection({ 
  id, label, headline, body, cta, ctaLink, imageSrc, imageAlt, layout, zIndex 
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageCard = imageCardRef.current;
    const textCard = textCardRef.current;
    const content = contentRef.current;
    
    if (!section || !imageCard || !textCard || !content) return;

    const ctx = gsap.context(() => {
      const imageStartX = layout === 'image-left' ? '-60vw' : '60vw';
      const textStartX = layout === 'image-left' ? '60vw' : '-60vw';
      const imageExitX = layout === 'image-left' ? '-18vw' : '18vw';
      const textExitX = layout === 'image-left' ? '18vw' : '-18vw';

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(imageCard,
        { x: imageStartX, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      )
      .fromTo(textCard,
        { x: textStartX, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(imageCard,
        { x: 0, opacity: 1 },
        { x: imageExitX, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(textCard,
        { x: 0, opacity: 1 },
        { x: textExitX, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(content.children,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, [layout]);

  return (
    <section 
      ref={sectionRef} 
      id={id}
      className="section-pinned bg-[#F6F7F9]" 
      style={{ zIndex }}
    >
      {/* Image Card - Desktop Only */}
      <div 
        ref={imageCardRef}
        className={`absolute top-[10vh] w-[46vw] h-[80vh] card-rounded overflow-hidden card-shadow hidden lg:block ${
          layout === 'image-left' ? 'left-[4vw]' : 'left-[50vw]'
        }`}
      >
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text Card */}
      <div 
        ref={textCardRef}
        className={`absolute top-[10vh] w-[94vw] lg:w-[42vw] min-h-[80vh] lg:h-[80vh] bg-white card-rounded card-shadow flex flex-col justify-center px-6 lg:px-[4vw] py-8 lg:py-0 left-[3vw] lg:left-auto ${
          layout === 'image-left' ? 'lg:left-[54vw]' : 'lg:left-[4vw]'
        }`}
      >
        {/* Mobile Image */}
        <div className="lg:hidden w-full h-48 card-rounded overflow-hidden mb-6">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div ref={contentRef}>
          <span className="label-mono mb-4 lg:mb-6 block">{label}</span>
          
          <h2 className="text-[#0B1E2F] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 lg:mb-6">
            {headline}
          </h2>
          
          <p className="text-[#6B7A89] text-sm sm:text-base leading-relaxed mb-6 lg:mb-8 max-w-md">
            {body}
          </p>
          
          <a 
            href={ctaLink} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            {cta}
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const card = cardRef.current;
    
    if (!section || !heading || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(card,
        { x: '10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative bg-[#0B1E2F] min-h-screen py-12 lg:py-[10vh] px-4 sm:px-6 lg:px-[6vw]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Left Content */}
          <div ref={headingRef} className="pt-8 lg:pt-[10vh]">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6">
              Ready when you are.
            </h2>
            <p className="text-[#9BA5AD] text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 max-w-md">
              Get verified accounts and KYC solutions. We reply fast on Telegram.
            </p>
            <a 
              href="https://t.me/certdoc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Send size={18} />
              Message @certdoc
            </a>
            <a 
              href="mailto:bahumalami@gmail.com" 
              className="block mt-4 text-[#9BA5AD] text-sm hover:text-white transition-colors"
            >
              Or email: bahumalami@gmail.com
            </a>
          </div>
          
          {/* Right Contact Card */}
          <div 
            ref={cardRef}
            className="bg-white card-rounded card-shadow p-6 lg:p-10"
          >
            <h3 className="text-[#0B1E2F] text-xl lg:text-2xl font-bold mb-6 lg:mb-8">Contact OmniCheck</h3>
            
            {/* Contact Methods */}
            <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F7F9] flex items-center justify-center flex-shrink-0">
                  <Send size={18} className="text-[#3D6B61]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7A89]">Telegram (Primary)</p>
                  <a 
                    href="https://t.me/certdoc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0B1E2F] font-medium hover:text-[#3D6B61] transition-colors text-lg"
                  >
                    @certdoc
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F7F9] flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#3D6B61]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7A89]">Email</p>
                  <a 
                    href="mailto:bahumalami@gmail.com" 
                    className="text-[#0B1E2F] font-medium hover:text-[#3D6B61] transition-colors"
                  >
                    bahumalami@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F7F9] flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-[#3D6B61]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7A89]">WeChat</p>
                  <p className="text-[#0B1E2F] font-medium mb-2">Scan QR code to add</p>
                  <img 
                    src="/images/wechat-qr.png" 
                    alt="WeChat QR Code" 
                    className="w-28 h-28 lg:w-32 lg:h-32 object-contain border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F7F9] flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-[#3D6B61]" />
                </div>
                <div>
                  <p className="text-sm text-[#6B7A89]">Community</p>
                  <a 
                    href="https://t.me/+8EQLv6yE0PtiOWU0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0B1E2F] font-medium hover:text-[#3D6B61] transition-colors"
                  >
                    Join Telegram Group
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#6B7A89] mb-2">Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D6B61] focus:ring-2 focus:ring-[#3D6B61]/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-[#6B7A89] mb-2">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D6B61] focus:ring-2 focus:ring-[#3D6B61]/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-[#6B7A89] mb-2">Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D6B61] focus:ring-2 focus:ring-[#3D6B61]/20 outline-none transition-all resize-none"
                  placeholder="What do you need? (KYC, accounts, documents...)"
                />
              </div>
              <button 
                type="submit"
                className="btn-primary w-full justify-center"
              >
                {submitted ? 'Message sent!' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 lg:mt-20 pt-6 lg:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6B7A89] text-sm text-center md:text-left">
            © 2024 OmniCheck. KYC & Verification Solutions.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#6B7A89] text-sm hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[#6B7A89] text-sm hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main App
function App() {
  useEffect(() => {
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    };

    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* KYC Services Section */}
        <KYCSection />
        
        {/* Feature Sections */}
        <div id="services">
          <FeatureSection
            label="OTC ACCOUNTS"
            headline="Verified accounts. Ready to use."
            body="Pre-verified bank accounts, crypto exchange accounts, and OTC trading accounts. All KYC completed. Start trading without limits or delays."
            cta="Get OTC Account"
            ctaLink="https://t.me/certdoc"
            imageSrc="/images/feature_cert.jpg"
            imageAlt="OTC verified accounts"
            layout="image-left"
            zIndex={20}
          />
        </div>
        
        <div id="about">
          <FeatureSection
            label="KYC DOCUMENTS"
            headline="Complete verification packages."
            body="We provide and sell full KYC document packages. ID verification, proof of address, banking documents—everything you need for compliant account setup."
            cta="Get Documents"
            ctaLink="https://t.me/certdoc"
            imageSrc="/images/feature_advisory.jpg"
            imageAlt="KYC documents"
            layout="image-right"
            zIndex={30}
          />
        </div>
        
        <FeatureSection
          label="BIOMETRIC SOLUTIONS"
          headline="Facial recognition & liveness."
          body="Advanced biometric verification support including facial recognition, liveness detection, and identity matching. Pass any KYC verification with confidence."
          cta="Biometric Support"
          ctaLink="https://t.me/certdoc"
          imageSrc="/images/feature_global.jpg"
          imageAlt="Biometric verification"
          layout="image-left"
          zIndex={40}
        />
        
        <FeatureSection
          label="ACCOUNT REGISTRATION"
          headline="New account setup service."
          body="End-to-end account registration on any platform. We handle the entire process—from signup to full verification. Banking, crypto, payment processors, and more."
          cta="Register Account"
          ctaLink="https://t.me/certdoc"
          imageSrc="/images/feature_process.jpg"
          imageAlt="Account registration"
          layout="image-right"
          zIndex={50}
        />
        
        <FeatureSection
          label="CRYPTO VERIFICATION"
          headline="Exchange accounts without limits."
          body="Verified accounts on Binance, Coinbase, Kraken, and major exchanges. Skip the waiting period and trade with full functionality immediately."
          cta="Crypto Accounts"
          ctaLink="https://t.me/certdoc"
          imageSrc="/images/feature_support.jpg"
          imageAlt="Crypto verification"
          layout="image-left"
          zIndex={60}
        />
        
        <FeatureSection
          label="BANKING SOLUTIONS"
          headline="Verified banking worldwide."
          body="Pre-verified bank accounts in multiple jurisdictions. Personal and business accounts with full online banking access."
          cta="Banking Solutions"
          ctaLink="https://t.me/certdoc"
          imageSrc="/images/feature_industries.jpg"
          imageAlt="Banking solutions"
          layout="image-right"
          zIndex={70}
        />
        
        <FeatureSection
          label="24/7 SUPPORT"
          headline="Fast response. Guaranteed."
          body="Questions about KYC requirements? Need urgent verification? Our team responds quickly on Telegram. Get the help you need, when you need it."
          cta="Contact Support"
          ctaLink="https://t.me/certdoc"
          imageSrc="/images/feature_results.jpg"
          imageAlt="Support"
          layout="image-left"
          zIndex={80}
        />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
