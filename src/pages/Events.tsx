import EventHeader from "../components/EventHeader_temp";
import Footer from "../components/footer";
import GravitasEventGallery from "../components/eventsPage";
//import MediumSection from "../components/Blogs";
import Spotlight from "../components/Spotlight";
import { useSEO } from '../hooks/useSEO';

function Events() {
    useSEO({
        title: 'Events - AIChE VIT',
        description: 'Explore our flagship events, workshops, and hackathons including Chemathon 6.0. Join AIChE VIT in fostering technical excellence and innovation.',
        url: 'https://www.aichevit.in/events',
        image: 'https://www.aichevit.in/assets/logo-bjSTSeLV.png'
    });

    return (
        <div className="relative w-full min-h-screen bg-[#8e1a1a] text-black overflow-x-hidden selection:bg-black selection:text-[#c94141]">
            <Spotlight/>
            <EventHeader 
                hours="" 
                schedule="Our Flagship Event" 
                title="Chemathon 6.0" 
            />
            <GravitasEventGallery />
            {/*<MediumSection username="@aichevit" />*/}
            <Footer />
        </div>
    );
}

export default Events;