import { useEffect } from "react";
import MenuOptions from "../components/menuOptions";



function Menu() {
    useEffect(() => {
        document.title = 'Menu'; // Change the title for About page
      }, []);
    return (
        <div className='flex flex-col w-full h-dvh'>
            <MenuOptions />
        </div>
        
    );
}

export default Menu;
