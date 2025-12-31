import React from 'react';
import { SlSocialLinkedin } from "react-icons/sl";
import { LiaInstagram, LiaMedium, LiaYoutube } from "react-icons/lia";

// Define the shape of a footer link
interface FooterLink {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

const Footer = () => {
  const openUrl = (url: string) => window.open(url, "_blank");

  // Data configuration for easy management
  const links: FooterLink[] = [
    {
      id: 'email',
      icon: <LiaYoutube className="text-3xl md:text-4xl" />,
      label: "Youtube",
      action: () => openUrl("https://www.youtube.com/@aichevitstudentchapter5152/"),
    },
    {
      id: 'linkedin',
      icon: <SlSocialLinkedin className="text-3xl md:text-4xl" />,
      label: "LinkedIn",
      action: () => openUrl("https://www.linkedin.com/in/aiche-vit-student-chapter/"),
    },
    {
      id: 'instagram',
      icon: <LiaInstagram className="text-3xl md:text-4xl" />,
      label: "Instagram",
      action: () => openUrl("https://www.instagram.com/aiche_vit/"),
    },
    {
      id: 'medium',
      icon: <LiaMedium className="text-3xl md:text-4xl" />,
      label: "Medium",
      action: () => openUrl("https://medium.com/@aichevit"),
    },
  ];

  return (
    <div className="w-full mt-12 md:mt-16 text-black">
      
      {/* The Divider */}
      <div className="mb-8 md:mb-12 opacity-80">
      </div>

      {/* The Social Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 border-black border-dashed md:border-2 mx-4 md:mx-0">
        {links.map((link, index) => (
          <div
            key={link.id}
            onClick={link.action}
            className={`
              group relative flex flex-col items-center justify-center 
              py-12 cursor-pointer transition-all duration-300
              border-2 border-dashed border-black md:border-0
              ${index !== links.length - 1 ? 'md:border-r-2 md:border-dashed md:border-black' : ''}
              hover:bg-black hover:text-[#E6D5B8]
            `}
          >
            {/* Icon Container with pop effect */}
            <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
              {link.icon}
            </div>
            
            {/* Label */}
            <div className="font-mono text-sm md:text-base uppercase tracking-widest font-bold">
              {link.label}
            </div>

            {/* Corner Accents for that "Ticket" look */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-[#E6D5B8] transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-[#E6D5B8] transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Copyright Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-4 font-mono text-xs md:text-sm tracking-tighter opacity-70 pb-8">
        <span className="uppercase">
          &copy; AIChE-VIT {new Date().getFullYear()}
        </span>
        <span className="hidden md:block">
          // EST. 2025 // VELLORE CAMPUS
        </span>
      </div>
    </div>
  );
};

export default Footer;