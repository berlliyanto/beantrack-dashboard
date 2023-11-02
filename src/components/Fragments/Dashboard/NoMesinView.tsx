import { motion } from "framer-motion"; 

interface NoMesinViewInterface {
    text: string;
}

const NoMesinView:React.FC<NoMesinViewInterface> = ({text}) => {
    return (
        <motion.section initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 1}}
        className="flex justify-center items-center flex-col gap-5">
            <div className="h-48 w-48 md:w-80 md:h-80">
                <img src="images/bg-nomesin.svg" alt="kopi" />
            </div>
            <h1 className="text-xl md:text-4xl text-slate-600 font-bold">{text}</h1>
        </motion.section>
    )
}

export default NoMesinView;