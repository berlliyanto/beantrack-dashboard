import { useDispatch, useSelector } from "react-redux";
import { profileService } from "../../../services/auth/profile";
import AccountMenu from "../../Elements/AccountMenu/AccountMenu";
import Toggle from "../../Elements/Toggle/Toggle";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import { clearTokenAfterLogout } from "../../../redux/slice/authSlice";
import { logoutService } from "../../../services/auth/logout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toggleDarkMode } from "../../../redux/slice/darkModeSlice";

const NavBarDashboard = () => {
    const token = useSelector((state: any) => state.token);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector((state:any) => state.darkMode);

    const { data, isFetching } = profileService(token, "getProfileNav")
    const { mutate, isPending } = logoutService(
        () => {
            setOpen(false);
            dispatch(clearTokenAfterLogout());
            navigate('/login', { replace: true });
        },
        () => {
            setOpen(false)
        }
    );

    useEffect(() => {
        if (data?.status == 200) {
            setName(data?.data?.data.user.name)
            setEmail(data?.data?.data.user.email)
        }
        if(isPending) setOpen(true)
    }, [data, isPending])

    useEffect(() => {
        if(darkMode){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    },[darkMode])

    const handleLogout = () => mutate({ token })
    const changeTheme = () => {
        dispatch(toggleDarkMode());
    }

    return (
        <motion.header initial={{opacity: 0, translateY: -50}} animate={{opacity:1, translateY: 0}} transition={{duration: 1}}
        className="md:fixed flex justify-between items-center h-[80px] w-full py-[24px] px-[16px] bg-white border-b border-[#DADADA] z-50 duration-300 ">
            <a href="/dashboard?view=dashboard" className="">
                <img src="images/3_BEANTRACK.svg" alt="" />
            </a>
            <div className="flex gap-2 items-center">
                <Toggle icon={`icons/${darkMode ? 'sun' : 'moon'}.svg`} onClick={changeTheme} />
                <Toggle icon="icons/bell.svg" onClick={()=>{}}/>
                <div className="block md:hidden">
                    <AccountMenu handleLogout={handleLogout} />
                </div>
                <div className="hidden gap-1 border border-[#DADADA] rounded-md p-1 md:px-2 md:flex duration-300 hover:bg-slate-100">
                    {isFetching ? <Skeleton variant="circular" width={40} height={40} /> : <AccountMenu handleLogout={handleLogout} />}
                    <div className="">
                        {isFetching ?
                            <>
                                <Skeleton variant="text" sx={{ fontSize: '1rem', width: 150 }} />
                                <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
                            </> :
                            <>
                                <p className="text-[16px] text-[#111111]">{name}</p>
                                <p className="text-[12px] text-[#A0A6B1]">{email}</p>
                            </>}
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </motion.header>
    )
}

export default NavBarDashboard;