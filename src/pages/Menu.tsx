import MenuOptions from "../components/menuOptions";
import { useSEO } from '../hooks/useSEO';

function Menu() {
    useSEO({
        title: 'Menu - AIChE VIT',
        description: 'Navigate the AIChE VIT website. Access our events, team, insider content, and more.',
        url: 'https://www.aichevit.in/menu',
        image: 'https://www.aichevit.in/assets/logo-bjSTSeLV.png'
    });

    return (
        <div className='flex flex-col w-full h-dvh'>
            <MenuOptions />
        </div>
    );
}

export default Menu;