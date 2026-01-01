import Boardheader from "../components/boardHeader";
import Footer from "../components/footer";
import Features from "../components/features";
import { useSEO } from '../hooks/useSEO';

function Community() {
    // Replaced useEffect with the SEO hook
    useSEO({
        title: "The Team - AIChE VIT",
        description: "Meet the dedicated board and team members behind AIChE VIT. Passionate individuals driving innovation and excellence in our student chapter.",
        url: "https://www.aichevit.in/board",
        image: "https://www.aichevit.in/assets/logo-bjSTSeLV.png"
    });

    return (
        <div className='flex flex-col w-full bg-[#551d1c] px-8 py-8 lg:px-14 lg:py-14'>
            <Boardheader details="" title="The Team" />
            <Features />
            <Footer />
        </div>
    );
}

export default Community;