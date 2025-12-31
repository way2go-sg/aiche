import { useEffect } from "react";
import Boardheader from "../components/boardHeader";
import Footer from "../components/footer";
import Features from "../components/features";



function Community() {
    useEffect(() => {
        document.title = 'Team';
    }, []);
    return (
        <div className='flex flex-col w-full bg-[#551d1c] px-8 py-8 lg:px-14 lg:py-14'>
            <Boardheader details="" title="The Team" />
            <Features />
            <Footer />
        </div>
        
    );
}

export default Community;
