import React, { useState } from 'react';
import { Quote, ChevronDown, ChevronUp } from 'lucide-react';

// Importing assets (Ensure these paths are correct in your project)
import img1 from '../assets/testimonials/sanatan.jpeg';
import img2 from '../assets/testimonials/aarya.jpeg';
import img3 from '../assets/testimonials/smrti.jpeg';
import img4 from '../assets/testimonials/harsha.jpeg';
import img5 from '../assets/testimonials/kanishk.jpeg';
import img7 from '../assets/testimonials/jefin.jpeg';
import img8 from '../assets/testimonials/shardul.jpeg';
import img9 from '../assets/testimonials/gautham.jpeg';
import img6 from '../assets/testimonials/rishab.jpeg';

const testimonials = [
  {
    id: 1,
    name: "Sanatan Iyer",
    role: "Ex Podcast Head and Webmaster",
    text: "AIChE is a family where we learn and grow together. It has helped me build skills such as communication, teamwork, and technical knowledge. Being part of the Podcast and Webmaster domains gave me great opportunities to network and improve my communication skills. Some of the most memorable moments were the Chem-E-Car night slips, the ChemE Jeopardy we practiced and participated in, which was really fun and sharpened our minds, as well as the events we took part in and organized, which made the journey even more special.",
    image: img1 
  },
  {
    id: 5,
    name: "Aarya Sinha",
    role: "Ex Chairperson",
    text: "I will wear this honor with pride through every aspect of my life, where I was able to contribute my heart, mind, and soul to the AIChE - VIT Student Chapter, which gave me a pedestal to stand on in the form of people, opportunities, and lessons. Reflecting on it, the beauty lies in the legacy of AIChE, which is evergreen and urges everyone on this path to bring out their best in front of the world.",
    image: img2
  },
  {
    id: 7,
    name: "Smrti K",
    role: "Ex Vice Chairperson",
    text: "Two years, countless trials, and memories that will last a lifetime. My journey at AIChE-VIT has been nothing short of transformative. From brainstorming sessions that stretched into the night to moments of quiet triumph when everything finally fell into place, this chapter has been both my challenge and my home. To the next generations, may you continue to build not just wings and events, but also trust, memories, and bonds that last far beyond your tenure.",
    image: img3
  },
  {
    id: 8,
    name: "Harsha",
    role: "Ex Senior Core Committee",
    text: "Two years ago, I joined ChemE Cube thinking it would just be another technical project. Spoiler alert: it turned out to be a full-blown adventure. From endless design discussions to ambitious experiments. In the middle of all the chaos, I surprised myself. I learned to open up, let go of fear, and actually express my thoughts. More importantly, through this journey I met an incredible bunch of people who became more than teammates; they became friends, and honestly, a second family.",
    image: img4
  },
  {
    id: 3,
    name: "Kanishk Kumar",
    role: "Ex ESC Liaison",
    text: "Two years, countless trials, bombs and just enough drama to rival a soap opera. Being part of the ChemE Cube team at AIChE-VIT has been nothing short of an education, sometimes in engineering, and sometimes in diplomacy. From heated “debates” over the correct reaction to dramatic last minute redesigns that questioned both science and sanity, the journey has been as chaotic as it has been rewarding.",
    image: img5 // Explicitly null for testing fallback
  },
  {
    id: 6,
    name: "Rishab Lanka",
    role: "Ex Senior Core Comittee",
    text: "I vividly remember my introduction to AIChE by my seniors. Ever since then it’s been a nonstop adventure. Traversing through competitions, events and deadlines, I found myself embracing this team and wanted to scale new heights together. The late night shenanigans in the lab, pre-event jitters or the seeing models work on principles you’ve only theorized about, this chapter has given me a space to express myself, understand and grow into a better version of myself.",
    image: img6
  },
  {
    id: 9,
    name: "Jefin Mathew",
    role: "Ex K12 & Outreach Head",
    text: "As Shardul Sharma once said, “You work hard, you party harder.” I joined the chapter simply to make everyone laugh and disappear when the actual work arrived, but fate had other plans. Professionalism was the standard. The creative freedom this platform offers, and the fruits it bears, are unmatched. From my first big stage to leading my very own team, this chapter has shaped a significant part of my career.",
    image: img7
  },
  {
    id: 4,
    name: "Shardul Sharma",
    role: "Ex Events Head",
    text: "I initially joined this chapter to strengthen my CV, but it became a space that honed my people skills and channelled my competitive spirit productively. The journey was far richer than I anticipated. From staying up all night with teammates to prepare for the Student Regional Conference, sharing laughter and stress in equal measure, to stepping into an executive role and learning to navigate crises without seniors to guide us.",
    image: img8
  },
  {
    id: 2,
    name: "Gautham Binoy",
    role: "Ex Senior Core Committee",
    text: "During my tenure at AIChE VIT-Vellore, I transitioned from an active junior member to a key senior core representative. My contributions spanned the Editorial and Management domains, where I honed my communication and organizational skills. This experience culminated in my role as an organizer for Chemathon, the chapter's flagship event. This role provided invaluable opportunities to lead complex projects and collaborate with diverse teams.",
    image: img9
  },
];

const CHAR_LIMIT = 180;
const THEME_RED = '#91191a';

const TestimonialWall: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold heading-text text-white sm:text-6xl tracking-tight">
            Insider Perspectives
          </h2>
          <div className="mt-4 h-1 w-24 bg-white/30 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Stories of growth, resilience, and family from within the AIChE-VIT community.
          </p>
        </div>

        {/* The Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {testimonials.map((item) => {
             const isLongText = item.text.length > CHAR_LIMIT;
             const isExpanded = expandedId === item.id;
             const displayedText = isExpanded || !isLongText
               ? item.text 
               : `${item.text.substring(0, CHAR_LIMIT).trim()}...`;

            return (
              <div 
                key={item.id} 
                className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative group h-full"
              >
                {/* Quote Icon */}
                <div className="mb-6" style={{ color: THEME_RED }}>
                  <Quote size={40} strokeWidth={1.5} className="opacity-80" />
                </div>

                {/* Text Content */}
                <div className="flex-grow mb-6">
                   <p className="text-gray-700 leading-relaxed italic">
                    "{displayedText}"
                  </p>
                  
                  {isLongText && (
                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className="mt-3 flex items-center gap-1 text-sm font-semibold hover:opacity-70 focus:outline-none transition-all"
                      style={{ color: THEME_RED }}
                    >
                      {isExpanded ? (
                        <>Read Less <ChevronUp size={16} /></>
                      ) : (
                        <>Read More <ChevronDown size={16} /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Author Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 mt-auto">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-offset-2"
                      style={{ color: THEME_RED }}
                    />
                  ) : (
                    <div 
                      className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                      style={{ backgroundColor: THEME_RED }}
                    >
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                    <p 
                      className="text-[10px] font-bold uppercase tracking-wider mt-1" 
                      style={{ color: THEME_RED }}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialWall;