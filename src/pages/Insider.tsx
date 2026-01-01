import Insider from "../components/insiderHeader"
import FoodBestSection from "../components/banner";
import Footer from "../components/footer";
import tube from "../assets/tube.webp"
import TestimonialWall from "../components/testimonials";
import Conferences from "../components/conferences";
import { useSEO } from '../hooks/useSEO';

function Insiderpage() {
    // Replaced useEffect with useSEO
    useSEO({
        title: 'The Insider - AIChE VIT',
        description: 'Explore the best of AIChE VIT. From member testimonials to conference highlights, discover what makes our chapter truly unique.',
        url: 'https://www.aichevit.in/insider',
        image: 'https://www.aichevit.in/assets/logo-bjSTSeLV.png'
    });

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

export default Insiderpage;