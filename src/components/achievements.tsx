import AnimatedList from './scrollHandler'
const items = [
  'Represented the chapter with ingenuity at the Annual Chem-E-Car Competition 2017 in Minneapolis.',
  'Hosted the AIChE India SRC 2018 at VIT Vellore and won the Chem-E-Car competition to represent India at ASC.',
  'Organized the India Student Regional Conference (SRC) for the second time in 2022.',
  'Swept the K–2 and Grades 3–5 categories at the K-12 SRC 2023 and qualified for the K-12 ASC.',
  'Repeated victories in K–2 and 3–5 at K-12 SRC 2024 and qualified in three categories for the ASC.',
  'Secured 3rd place in the Chem-E-Car competition at SRC 2024 held at NIT Rourkela.',
  "Dominated Azeotropy’25 with 1st place in Chem-E-Car at IIT Bombay.",
  'Claimed Runners-up at SRC 2025 Chem-E-Car and ranked in the top 20 at ASC.',
  'Crushed K-12 competitions in 2025: Winners in Grades 3–5 & 9–12, and top finishes in K–2 & 6–8.',
  'Honored as an Outstanding Student Chapter for the 10th time, marking a decade of excellence.'
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

