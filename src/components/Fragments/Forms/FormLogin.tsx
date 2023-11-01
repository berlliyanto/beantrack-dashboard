import { TextField } from "@mui/material"
import Button from "../../Elements/Buttons/Button"
import { Link } from "react-router-dom"
import InputPassword from "../../Elements/Input/InputPassword"
import { FormEvent, Fragment, useState } from "react"

interface FormLoginInterface {
    isPending: boolean;
    handleLogin: (email: any, password: any) => void;
}

const FormLogin: React.FC<FormLoginInterface> = ({isPending, handleLogin}) => {
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        if (email === "" || password === "") {
            setEmailError(true);
            setPasswordError(true);
            setTimeout(() => {
                setEmailError(false);
                setPasswordError(false);
            }, 2000);
            return;
        }
        handleLogin(email, password);
    }

    return (
        <Fragment>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-slate-800 font-bold md:text-[14px]">Email</label>
                <TextField id="email" name="email" type="email" variant="outlined" placeholder="Input your email" error={emailError} />
                <label htmlFor="outlined-adornment-password" className="text-slate-800 font-bold md:text-[14px]">Password</label>
                <InputPassword error={passwordError} id="outlined-adornment-password" name="password"/>
                <Link to="/" className="inline-block self-end text-sm text-primary font-semibold">Forgot Password?</Link>
                <Button text={isPending ? "Loading..." : "Sign In"} className="mt-3" disabled={isPending} />
                <h4 className="text-sm text-slate-600 text-center mt-3">Don't have an account? <Link to="/register" className="text-primary font-semibold">Register</Link></h4>
            </form>
        </Fragment>
    )
}

export default FormLogin;