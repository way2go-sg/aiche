import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

// Import Pages
import About from './pages/About';
import Community from './pages/Community';
import Food from './pages/Events';
import Retail from './pages/Insider';
import Menu from './pages/Menu';
import AicheGallery from './components/gallery';
// Import Assets
import logo from './assets/logo.png';

// --- Configuration ---
// This array controls your entire navigation structure.
// Add a new item here, and it automatically appears in Mobile and Desktop views.
const NAV_ITEMS = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    component: <About />,
    bgColor: '#d4b483',
    activeColor: '#d4b483', // Home stays same color
    hasLogo: true, 
  },
  {
    id: 'events',
    path: '/events',
    label: 'Events',
    component: <Food />,
    bgColor: '#8e1a1a',
    activeColor: '#8e1a1a',
    delay: 0,
  },
  {
    id: 'insider',
    path: '/insider',
    label: 'Insider',
    component: <Retail />,
    bgColor: '#7a1410',
    activeColor: '#7a1410',
    delay: 0.3,
  },
  {
    id: 'board',
    path: '/board',
    label: 'Board',
    component: <Community />,
    bgColor: '#551d1c',
    activeColor: '#551d1c',
    delay: 0.6,
  },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1024);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Mobile View ---
  if (!isDesktop) {
    return (
      <>
        <Routes>
          {NAV_ITEMS.map((item) => (
            <Route 
              key={item.id} 
              path={item.path} 
              element={<div className="box-border h-screen w-full m-0 p-0">{item.component}</div>} 
            />
          ))}
          {/* Extra Route for Menu if it doesn't fit the panel structure */}
          <Route path="/menu" element={<div className="box-border h-screen w-full m-0 p-0"><Menu /></div>} />
          {/* Extra Route for Menu if it doesn't fit the panel structure */}
          <Route path="/gallery" element={<div className="box-border h-screen w-full m-0 p-0"><AicheGallery /></div>} />
        </Routes>
        <Analytics />
      </>
    );
  }

  // --- Desktop View ---
  return (
    <div className="relative h-full w-full m-0 p-0 overflow-x-hidden selection:bg-black selection:text-white">
      <div className="flex w-full h-full">
        
        {NAV_ITEMS.map((item) => {
          // Fix: Ensure comparison handles uppercase/lowercase URLs correctly
          const isActive = location.pathname.toLowerCase() === item.path.toLowerCase();

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                opacity: { duration: 1, ease: "easeOut", delay: item.delay || 0 },
              }}
              // Determine width and color based on active state
              className={`relative transition-all duration-500 cursor-pointer overflow-hidden ${
                isActive ? 'w-[88%] h-screen z-10' : 'w-[4%]'
              }`}
              style={{ backgroundColor: isActive ? item.activeColor : item.bgColor }}
              onClick={() => {
                if (!isActive) {
                  navigate(item.path);
                  window.scrollTo(0, 0);
                }
              }}
            >
              {isActive ? (
                // --- EXPANDED CONTENT ---
                <div className="scrollable h-full cursor-default">
                  {item.component}
                </div>
              ) : (
                // --- COLLAPSED TAB ---
                <div className="h-full relative text-black flex justify-center">
                  {item.hasLogo ? (
                    <div className="w-16 h-fit mt-16 px-0.5">
                      <img className="w-full" src={logo} alt="Logo" />
                    </div>
                  ) : (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 tracking-wider options-text text-xl whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
        
      </div>
      <Analytics />
    </div>
  );
}

export default App;