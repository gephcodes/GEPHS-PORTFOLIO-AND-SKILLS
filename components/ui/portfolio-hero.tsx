import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Inline Button component
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
export interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export interface PortfolioHeroProps {
  firstName?: string;
  lastName?: string;
  tagline?: string;
  showImage?: boolean;
  imageUrl?: string;
  useCurrentBackground?: boolean;
  accentColor?: string;
  onScrollClick?: () => void;
}

export default function PortfolioHero({
  firstName = "GEPHEL",
  lastName = "CHINGTHAM",
  tagline = "Visionary | Technical Director | Entrepreneur | Founder",
  showImage = false,
  imageUrl,
  useCurrentBackground = true,
  accentColor = "#FFFFFF",
  onScrollClick,
}: PortfolioHeroProps = {}) {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "PROJECTS", href: "#projects", highlight: true },
    { label: "CERTIFICATES", href: "#certificates" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const el = document.getElementById("projects");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <div 
      className="min-h-screen text-foreground transition-colors relative"
      style={{
        backgroundColor: useCurrentBackground 
          ? "transparent" 
          : isDark 
          ? "hsl(0 0% 0%)" 
          : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col justify-center items-center">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="w-full px-4 text-center my-auto">
          <div className="relative inline-block text-center max-w-full">
            <div>
              <BlurText
                text={firstName}
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: accentColor, fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text={lastName}
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.8] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: accentColor, fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture - conditionally rendered (disabled by default as requested: without an image) */}
            {showImage && imageUrl && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer border border-zinc-700">
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="w-full px-6 mb-16 text-center">
          <div className="flex justify-center">
            <BlurText
              text={tagline}
              delay={120}
              animateBy="words"
              direction="top"
              className="text-[13px] sm:text-[16px] md:text-[19px] lg:text-[21px] text-center font-mono tracking-wider uppercase text-[#8E9AAF] hover:text-[#FFFFFF] transition-colors duration-300 font-semibold"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={handleScroll}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 p-2 group"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-[#8E9AAF] group-hover:text-[#FFFFFF] transition-colors duration-300 animate-bounce" />
        </button>
      </main>
    </div>
  );
}
