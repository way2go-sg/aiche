import Header from '../components/aboutHeader';
import Options from '../components/options';
import Footer from '../components/footer';
import AboutEvents from '../components/aboutEvents';
import { useEffect } from 'react';
import IntroOverlay from '../components/intro';
function About() {
    useEffect(() => {
            document.title = 'About'; // Change the title for About page
        }, []);
    return (
        /* bg-[radial-gradient(circle_at_center,_#fdfbf7,_#d4b483)]*/
        <div className='flex flex-col transition-all duration-500 w-full bg-[radial-gradient(circle_at_center,_#fdfbf7,_#d4b483)] px-8 py-8 lg:px-14 lg:py-14'>
            <IntroOverlay />
            <Header />
            <Options />
            <AboutEvents />
            <Footer />
        </div>
    );
}

export default About;