import Header from '../components/aboutHeader';
import Options from '../components/options';
import Footer from '../components/footer';
import AboutEvents from '../components/aboutEvents';
import IntroOverlay from '../components/intro';
import { useSEO } from '../hooks/useSEO'; // Import the custom hook

function About() {
    // Call the hook at the top of your component
    useSEO({
        title: "About Us - AIChE VIT",
        description: "Discover the legacy of AIChE VIT. We are a premier student chapter dedicated to fostering innovation and leadership in Chemical Engineering.",
        url: "https://www.aichevit.in/",
        image: "https://www.aichevit.in/assets/logo-bjSTSeLV.png"
    });

    return (
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