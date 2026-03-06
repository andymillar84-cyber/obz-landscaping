/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, X, ArrowRight } from "lucide-react";

import drumcondraImg from "./Drumcondra.jpg";
import leopoldImg from "./Leopold.png";
import pointLonsdaleImg from "./Point Lonsdale.jpg";
import portarlingtonImg from "./Portarlington.jpg";
import torquayImg from "./Torquay.jpg";

// --- Types ---

interface NavLink {
  label: string;
  href: string;
}

// --- Data ---

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// --- Components ---

const ParticleDrift = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [null, "-20%"],
            x: [null, (Math.random() - 0.5) * 10 + "%"],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const AbstractParallax = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-3/4 -right-20 w-80 h-80 bg-brand-cream/10 rounded-full blur-3xl"
      />
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Crazy Paving",
      description:
        "Bespoke crazy paving installations using natural and reconstituted stone for paths, patios, and feature areas.",
    },
    {
      title: "Pool Paving",
      description:
        "Non-slip, beautiful pool surrounds that complement your outdoor living space and withstand the elements.",
    },
    {
      title: "Landscape Design",
      description:
        "Full garden design and construction, from concept to completion, tailored to your lifestyle and block.",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 bg-surface-dark border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-cream/60 mb-16">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-8 h-[1px] bg-brand-green mb-8" />
              <h3 className="text-xl font-light text-brand-cream mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-brand-sage font-light leading-relaxed text-sm flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const projects = [
    {
      id: 1,
      location: "Drumcondra, Vic",
      image: drumcondraImg,
    },
    {
      id: 2,
      location: "Leopold, Vic",
      image: leopoldImg,
    },
    {
      id: 3,
      location: "Point Lonsdale, Vic",
      image: pointLonsdaleImg,
    },
    {
      id: 4,
      location: "Portarlington, Vic",
      image: portarlingtonImg,
    },
    {
      id: 5,
      location: "Torquay, Vic",
      image: torquayImg,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-bg-dark">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-cream/60">
            Featured Projects
          </h2>
          <div className="flex gap-8">
            <button
              onClick={prev}
              aria-label="Previous project"
              className="p-1 hover:text-brand-green transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next project"
              className="p-1 hover:text-brand-green transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / projects.length)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${projects.length * 100}%` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-full flex flex-row items-center gap-6">
                {/* Text — left column, completely outside the image */}
                <div className="w-1/3 flex flex-col items-end text-right shrink-0">
                  <h3 className="text-xl md:text-2xl font-light tracking-tight text-brand-cream leading-tight">
                    {project.location.split(',')[0]}
                  </h3>
                  {project.location.includes(',') && (
                    <p className="text-[10px] font-bold tracking-[0.2em] text-brand-sage uppercase mt-2">
                      {project.location.split(',')[1].trim()}
                    </p>
                  )}
                </div>

                {/* Image — right column */}
                <div className="w-2/3 aspect-[4/5] overflow-hidden rounded-sm grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 shrink-0">
                  <img
                    src={project.image}
                    alt={project.location}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row min-h-screen bg-bg-dark"
    >
      <div className="w-full md:w-1/2 bg-surface-dark p-12 md:p-24 flex flex-col justify-center border-r border-white/5">
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-cream/60 mb-12">
          About Me
        </h2>
        <div className="max-w-lg">
          <p className="text-3xl md:text-5xl font-light leading-tight mb-12 text-brand-cream">
            I live in Teesdale with my wife, Erin, and our two young kids.
          </p>
          <div className="space-y-8 text-brand-sage leading-relaxed font-light text-lg">
            <p>
              Originally from Eltham, I made a sea change to Torquay before
              eventually settling here in Teesdale. It's been the perfect spot
              to grow both our family and our landscaping business.
            </p>
            <p>
              Gardening isn't just my job—it's my passion. I love getting my
              hands dirty, creating outdoor spaces that people love, and turning
              visions into reality.
            </p>
            <p className="pt-8 text-brand-cream font-medium">Chris, Director</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 relative min-h-[600px] grayscale-[0.2] brightness-100 overflow-hidden">
        <img
          src="/zach.jpg"
          alt="Chris and Erin - OBZ Landscaping"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      name: "JAYDEN MCHENRY",
      text: "Chris and his team did an outstanding job for me. He completely relandscaped my front and back gardens, which was a huge job and I couldn't be happier.",
    },
    {
      name: "LAURA ACKLAND",
      text: "We're thrilled with our new backyard that Chris and co helped us revamp on a budget! They were prompt, efficient and pros at their job.",
    },
    {
      name: "JESSE OEY",
      text: "Chris and his team did such a wonderful job completely transforming our new house's neglected backyard into a warm, welcoming green oasis.",
    },
    {
      name: "JASMIN HEPBURN",
      text: "After years of having a vision in my head, Chris and the team at OBZ Landscaping made it a reality! They were professional and easy to work with.",
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-bg-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-[10px] font-bold tracking-[0.6em] uppercase text-brand-cream/40 mb-24">
          Client Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {reviews.map((review, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3 h-3 fill-brand-green text-brand-green"
                  />
                ))}
              </div>
              <p className="text-base text-brand-sage leading-relaxed mb-8 flex-grow font-light italic">
                "{review.text}"
              </p>
              <p className="text-[10px] font-bold tracking-[0.3em] text-brand-cream uppercase">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-surface-dark border border-white/10 rounded-sm shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 p-2 text-brand-cream/40 hover:text-brand-cream transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-[85vh] max-h-[782px] overflow-hidden">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/46H1xxoSn4aHrHzX0mC1"
                style={{ display: "none", width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
                id="popup-46H1xxoSn4aHrHzX0mC1"
                data-layout="{'id':'POPUP'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Enquiry Form"
                data-height="782"
                data-layout-iframe-id="popup-46H1xxoSn4aHrHzX0mC1"
                data-form-id="46H1xxoSn4aHrHzX0mC1"
                title="Enquiry Form"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative font-sans bg-bg-dark selection:bg-brand-green selection:text-white">
      {/* --- Navigation --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? "py-4" : "py-10"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between transition-all duration-700">
            <a href="#" className="flex items-center gap-4">
              <span className="font-display font-bold text-xl tracking-tighter text-brand-cream">
                OBZ LANDSCAPING
              </span>
            </a>

            <div className="hidden md:flex items-center gap-12">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-cream/60 hover:text-brand-green transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale-[0.1] brightness-75"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-brand-green/15 via-transparent to-black/20 mix-blend-overlay" />
          <div className="absolute inset-0 grid-shimmer opacity-15" />
          <div className="absolute inset-0 light-beam opacity-50" />
        </div>

        <ParticleDrift />
        <AbstractParallax />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] font-bold tracking-[0.6em] uppercase text-brand-sage mb-12"
          >
            Crazy Paving and Pool Paver Specialist
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-[10rem] font-light text-brand-cream tracking-tighter leading-[0.9] mb-16 font-display"
          >
            OBZ <br />
            LANDSCAPING
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPopupOpen(true)}
              className="group relative inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase text-brand-cream"
            >
              <span className="w-12 h-[1px] bg-brand-green group-hover:w-20 transition-all duration-500" />
              Get a Quote
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green to-transparent" />
        </motion.div>
      </header>

      {/* --- Services --- */}
      <ServicesSection />

      {/* --- Case Studies --- */}
      <CaseStudies />

      {/* --- About Section --- */}
      <AboutSection />

      {/* --- Reviews --- */}
      <ReviewsSection />

      {/* --- Final CTA --- */}
      <section id="contact" className="relative py-48 px-6 overflow-hidden">
        {/* Textured Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/dark-slate-paving/1920/1080"
            alt="Dark Crazy Paving Texture"
            className="w-full h-full object-cover grayscale brightness-[0.3] contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_10%,black_90%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-4xl mx-auto bg-[#0a0f0a]/95 p-16 md:p-24 text-center border border-white/5"
        >
          <h2 className="text-[10px] font-bold tracking-[0.6em] uppercase text-brand-cream/30 mb-12">
            LET'S CHAT
          </h2>
          <p className="text-4xl md:text-6xl text-brand-cream font-light mb-16 leading-tight tracking-tight max-w-2xl mx-auto">
            Ready to bring your garden vision to life?
          </p>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-12 py-5 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-cream transition-all duration-300"
          >
            CONTACT US
          </button>
        </motion.div>

        {/* Sparkle Icon */}
        <div className="absolute bottom-12 right-12 text-brand-cream/10">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-bg-dark border-t border-white/5 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <a href="#" className="flex items-center gap-4">
            <span className="font-display font-bold text-xl tracking-tighter text-brand-cream">
              OBZ LANDSCAPING
            </span>
          </a>

          <div className="flex gap-12 text-[10px] font-bold tracking-[0.2em] uppercase text-brand-sage">
            <a
              href="#"
              aria-label="OBZ Landscaping on Instagram"
              className="hover:text-brand-green transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              aria-label="OBZ Landscaping on Facebook"
              className="hover:text-brand-green transition-colors"
            >
              Facebook
            </a>
          </div>

          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-cream/20">
            © {new Date().getFullYear()} OBZ Landscaping
          </div>
        </div>
      </footer>

      {/* --- Popup Form --- */}
      <ContactPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
