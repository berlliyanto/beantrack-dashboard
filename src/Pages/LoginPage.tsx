import ButtonSocmed from "../components/Elements/Buttons/ButtonSocmed";
import { Divider } from "@mui/material";
import FormLogin from "../components/Fragments/Forms/FormLogin";
import AuthLayout from "../components/Layouts/AuthLayout";
import { Fragment } from "react";
import NavBar from "../components/Fragments/Navigations/NavBar";
import AuthHero from "../components/Elements/Hero/AuthHero";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTokenAfterLoginSuccess } from "../redux/slice/authSlice";
import loginService from "../services/auth/login";
import toast, { Toaster } from 'react-hot-toast';


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mutate, isPending } = loginService(
        (success) => {
            const { data } = success;
            console.log(success)
            if (data.code == 200) {
                dispatch(saveTokenAfterLoginSuccess(data.data.token));
                toast.success('Login Berhasil', {
                    duration: 1000
                })
                setTimeout(() => {
                    navigate( '/dashboard?view=dashboard', { replace: true });
                }, 1500);
            }
        },
        () => {
            toast.error('Email atau Password Salah', {
                duration: 3000
            })
        }
    );

    const handleLogin = (email: any, password: any) => {
        mutate({ email, password })
    }

    return (
        <Fragment>
            <NavBar />
            <main className="block pb-10 md:pb-0 md:py-6 md:pl-16 md:pr-6 md:flex md:justify-between md:gap-10 lg:pl-24 2xl:items-center">
                <article className="md:w-[400px] lg:w-[600px]">
                    <div className="hidden md:block md:pb-8 2xl:absolute 2xl:top-6">
                        <img src="images/3_BEANTRACK.svg" alt="" />
                    </div>
                    <AuthLayout title="Welcome to BeanTrack" subtitle="Login to your account">
                        <section id="socmed" className="flex flex-col gap-3 md:flex-row md:justify-center md:gap-5">
                            <ButtonSocmed text="Login with Apple" icon="icons/apple.png" className="md:hidden" />
                            <ButtonSocmed text="Login with Google" icon="icons/google.png" className="md:hidden" />
                            <img src="icons/apple.png" alt="apple" className="hidden md:block" />
                            <img src="icons/google.png" alt="google" className="hidden md:block" />
                        </section>
                        <section className="flex items-center gap-2 justify-between">
                            <Divider className="flex-1" />
                            <h5 className="text-slate-400">OR</h5>
                            <Divider className="flex-1" />
                        </section>
                        <section>
                            <FormLogin handleLogin={handleLogin} isPending={isPending} />
                        </section>
                    </AuthLayout>
                </article>
                <AuthHero />
            </main>
            <Toaster />
        </Fragment>
    )
}

export default LoginPage;