import AnimatedList from './scrollHandler'
const items = [
  'Proudly received the Outstanding Student Chapter Award an awe-inspiring total of 9 times.',
  'Successfully organized the India Student Regional Conference (SRC) twice in 2018 and 2022.',
  'Won the Chem-E-Car competition in SRC 2018 and represented India in the ASC 2018.',
  'Won the K-2 category prize at the K-12 SRC in 2023 and 2024.',
  'Won the Grades 3–5 category at the K-12 SRC in 2023 and 2024.',
  'Qualified in the K-12 ASC in 2023 (K–2, 3–5) and 2024 (K–2, 3–5, 9–12 categories).',
  'Won 3rd place in the Chem-E-Car competition at SRC 2024 held at NIT Rourkela.',
  "Won 1st place in the Azeotropor (Chem-E-Car) at Azeotropy'25, IIT Bombay.",
  'Proudly hosted the AIChE India SRC 2018 at VIT Vellore, a qualifier for the ASC.',
  'Represented with ingenuity at the Annual Chem-E-Car Competition 2017 in Minneapolis.'
];

const Achievements = () => {
return (
    <div className="w-full flex flex-col items-center justify-center ma">
        <div className="options-text text-center mb-12">
        <AnimatedList className="backdrop-blur-[24px] backdrop-saturate-[100%] bg-[hsla(0,100%,50%,0)] rounded-[12px] border border-[rgba(255,255,255,0.5)]" items={items}  displayScrollbar={false} showGradients={true} enableArrowNavigation ={false}/>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-8 gap-6 flex flex-col w-full justify-center items-center">
        </div>
    </div>
);
    };

export default Achievements;

