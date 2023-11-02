import { ArrowBack } from "@mui/icons-material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    routeBack: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children, routeBack }) => {
    const navigate = useNavigate();

    return (
        <motion.article initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}
        className="px-4 flex flex-col gap-6 md:gap-3">
            <section id="welcome" className="flex flex-col gap-5">
                <ArrowBack className="text-slate-900 cursor-pointer rounded-full hover:bg-slate-100" onClick={() => navigate(routeBack)}/>
                <div className="flex flex-col gap-1">
                    <h1 className="text-[32px] font-bold text-slate-800 tracking-tighter md:text-[26px]">{title}</h1>
                    <h4 className="text-lg text-slate-600 md:text-[16px]">{subtitle}</h4>
                </div>
            </section>
            {children}
        </motion.article>
    )
}

export default AuthLayout;