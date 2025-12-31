import { useEffect } from "react";
import Insider from "../components/insiderHeader"
import FoodBestSection from "../components/banner";
import Footer from "../components/footer";
import tube from "../assets/tube.png"
import TestimonialWall from "../components/testimonials";
import Conferences from "../components/conferences";

function Retail() {
    useEffect(() => {
        document.title = 'Insider'; // Change the title for About page
      }, []);
    return (
        <div className='flex flex-col w-full bg-[#7a1410] px-8 py-8 lg:px-14 lg:py-14'>
            <Insider hours=" " schedule=" " title="The Insider" bgHover='hover:bg-[rgb(200,60,60)]'/>
            <FoodBestSection image1={tube} image2={tube} title="The Best of AIChE" subtitle="Showcasing the finest achievements" />
            <TestimonialWall />
            <Conferences />
            <Footer />
        </div>
        
    );
}

export default Retail;
