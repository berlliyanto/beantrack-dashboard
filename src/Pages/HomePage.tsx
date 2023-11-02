import { ArrowRightAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <main className="relative h-screen w-full flex justify-center items-center bg-cover overflow-hidden sm:justify-start sm:pl-20 md:pl-32">
            <div className="absolute bottom-0 left-0 bg-gradient-to-r from-[#272727] from-40% via-[#373737] to-[#5c5c5c]  w-full h-full -z-10 sm:from-70%"></div>
            <div className="hidden md:block absolute right-0 top-0 z-10 h-screen w-[420px]">
                <img src="images/Vector.png" alt="" className="object-cover" />
            </div>
            <section className="flex flex-col">
                <motion.div initial={{opacity: 0, translateY: -100}} animate={{opacity:1, translateY: 0}} transition={{duration: 1}}
                className="w-fit h-fit bg-gradient-to-r from-white/40 to-white/20 py-3 px-7 rounded-full border border-white">
                    <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
                </motion.div>
                <motion.h1 initial={{opacity: 0, translateX: -100}} animate={{opacity:1, translateX: 0}} transition={{duration: 1}} 
                className="text-white text-[60px] font-bold tracking-wide sm:text-[120px]">Beantrack</motion.h1>
                <motion.div initial={{opacity: 0, translateY: 100}} animate={{opacity:1, translateY: 0}} transition={{duration: 1}}
                onClick={() => navigate('/login')}
                className="w-fit h-fit bg-gradient-to-r from-white/40 to-white/20 py-2 px-3 animate-pulse self-center rounded-full border border-white flex items-center justify-between gap-4 mt-6 cursor-pointer sm:self-end">
                    <h1 className="text-white text-xl font-semibold">Get Started</h1>
                    <ArrowRightAlt className="text-white" sx={{width: 30}} />
                </motion.div>
            </section>
        </main>
    )
}

export default HomePage;