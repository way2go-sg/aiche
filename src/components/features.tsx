import image3 from '../assets/board/ameya.webp';
import image2 from '../assets/board/ananya.webp';
import image from '../assets/board/shyla.webp';
import image4 from '../assets/board/samyak.webp';
import image5 from '../assets/board/kailash.webp';
import image6 from '../assets/board/sharma.webp';
import image7 from '../assets/board/aadya.webp';
import image8 from '../assets/board/abhilash.webp';
import image9 from '../assets/board/imthiyaz.webp';
import image10 from '../assets/board/lakshmi.webp';
import image11 from '../assets/board/kavya.webp';
import image12 from '../assets/board/arpit.webp';
import image13 from '../assets/board/abhishek.webp';
import image14 from '../assets/board/kathakali.webp';

const teamMembers = [
  { name: "Ameya Shukla", role: "Chairperson", img: image3, link: "https://www.linkedin.com/in/ameya-shukla-35059927a" },
  { name: "Ananya Lakshmi", role: "Vice Chairperson", img: image2, link: "https://www.linkedin.com/in/ananya-lakshmi-55542428b" },
  { name: "Shyla Gupta", role: "Secretary", img: image, link: "https://www.linkedin.com/in/shyla-gupta-a16371304" },
  { name: "Samayak Nitesh Chajjed", role: "Co-Secretary, Management Head", img: image4, link: "https://www.linkedin.com/in/samyakchhajed" },
  { name: "Arpit Wibhute", role: "Finance Head", img: image12, link: "https://www.linkedin.com/in/arpit-wibhute-06594b28a/" },
  { name: "Abhilash", role: "Podcast Head and Webmaster", img: image8, link: "https://www.linkedin.com/in/abhilash-anilkumar-709bb228a" },
  { name: "Abhishek Nair", role: "Design & Media Head", img: image13, link: "https://www.linkedin.com/in/abhishek-nair-n-a7954a304/" },
  { name: "Lakshmi", role: "Editorial & Documentation Head", img: image10, link: "https://www.linkedin.com/in/lakshmi-raman-469a5b28a/" },  
  { name: "Kailash V", role: "ChemECar & Technical Head", img: image5, link: "#kailash" },
  { name: "Sharma AK", role: "ChemECube & R&D Head", img: image6, link: "https://www.linkedin.com/in/sharma-a-k-b3597428a" },
  { name: "Aadya Saxena", role: "K12 & Outreach Head", img: image7, link: "https://www.linkedin.com/in/aadya-saxena-750574281" },  
  { name: "Kathakali Mishra", role: "ESC Liaison", img: image14, link: "https://www.linkedin.com/in/kathakali-mishra-a30b2828a]" },
  { name: "Imthiyaz Ahmed", role: "Events Head", img: image9, link: "https://www.linkedin.com/in/imthiyaz-ahmed-32254b304" },
  { name: "Kaavyashree S", role: "Global Communications Head", img: image11, link: "https://www.linkedin.com/in/kaavyashree-sathiyanarayanan-360032287" },

];

const Features = () => {
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full px-4 py-12">

      <div className="mb-16">
        <h2 className="heading-text text-6xl lg:text-8xl tracking-tight font-bold">
          Featuring...
        </h2>
        <div className="h-2 w-24 bg-black mt-4 ml-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            onClick={() => handleClick(member.link)}
            className="group cursor-pointer flex flex-col gap-4 relative"
          >

            <div className="relative overflow-hidden w-full aspect-[3/4] border-2 border-black">
              <img 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                src={member.img} 
                alt={member.name} 
              />
              
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="border-l-4 border-black pl-4 transition-all duration-300 group-hover:pl-6">
              <h3 className="heading-text text-2xl lg:text-3xl font-bold uppercase leading-none mb-1">
                {member.name}
              </h3>
              <p className="font-mono text-sm text-white uppercase tracking-wider">
                {member.role}
              </p>
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 bg-white p-2 border border-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;