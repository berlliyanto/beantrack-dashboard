
import { Divider } from "@mui/material";
import FormRegister from "../components/Fragments/Forms/FormRegister";
import AuthLayout from "../components/Layouts/AuthLayout";
import ButtonSocmed from "../components/Elements/Buttons/ButtonSocmed";
import { Fragment } from "react";
import NavBar from "../components/Fragments/Navigations/NavBar";
import AuthHero from "../components/Elements/Hero/AuthHero";
import registerService from "../services/auth/register";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate();

    const {mutate, isPending} = registerService(
        () => {
            toast.success("Register Success");
            setTimeout(() => {
                navigate('/login', {replace: true});
            }, 1000);
            
        },
        (error) => {
            const {password, phone} = error.response.data.message;
            if(password) toast.error(password[0]);
            if(phone) toast.error(phone[0]);
        }
    )
    
    const handleRegister = (formData: FormData) => mutate(formData);

    return (
        <Fragment>
            <NavBar />
            <main className="block pb-10 md:pb-0 md:py-6 md:pl-16 md:pr-6 md:flex md:justify-between md:gap-10 lg:pl-24 md:items-center">
                <article className="md:w-[400px] lg:w-[600px]">
                    <div className="hidden md:block md:pb-8 2xl:absolute 2xl:top-6 xl:hidden">
                        <img src="images/3_BEANTRACK.svg" alt="" />
                    </div>
                    <AuthLayout title="Register Now" subtitle="Create your account" routeBack="/login">
                        <section className="md:mb-4">
                            <FormRegister handleRegister={handleRegister} isPending={isPending} />
                        </section>
                        <section className="flex items-center gap-2 justify-between md:hidden">
                            <Divider className="flex-1" />
                            <h5 className="text-slate-400">OR</h5>
                            <Divider className="flex-1" />
                        </section>
                        <section id="socmed" className="flex flex-col gap-3 md:flex-row md:justify-center md:gap-5 md:hidden">
                            <ButtonSocmed text="Login with Apple" icon="icons/apple.png" className="md:hidden" />
                            <ButtonSocmed text="Login with Google" icon="icons/google.png" className="md:hidden" />
                            <img src="icons/apple.png" alt="apple" className="hidden md:block"/>
                            <img src="icons/google.png" alt="google" className="hidden md:block"/>
                        </section>
                    </AuthLayout>
                </article>
                <AuthHero />
            </main>
            <Toaster />
        </Fragment>
    )
}

export default RegisterPage;