import { TextField } from "@mui/material";
import Button from "../../Elements/Buttons/Button";
import { Link } from "react-router-dom";
import InputPassword from "../../Elements/Input/InputPassword";
import React, { FormEvent, Fragment, RefObject, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


interface FormRegisterInterface {
    handleRegister: ({ }: FormData) => void;
    isPending: boolean;
}

const FormRegister: React.FC<FormRegisterInterface> = ({ handleRegister, isPending }) => {
    const [errorInput, setErrorInput] = useState({
        nama: false,
        noTelp: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const noTelpRef: RefObject<HTMLInputElement> = useRef(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formRegisterData = new FormData();
        const name = e.currentTarget.nama.value;
        const phone = e.currentTarget.noTelp.value;
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const confirmPassword = e.currentTarget.confirmPassword.value;


        if (name === "" || phone === "" || email === "" || password === "" || confirmPassword === "") {
            toast.error("Please fill all fields");
            return;
        }

        if (!phone.startsWith('62')) {
            setErrorInput((state) => ({ ...state, noTelp: true }));
            toast.error('Nomor ponsel harus dimulai dengan 62');
            return;
        }

        if (password !== confirmPassword) {
            setErrorInput((state) => ({ ...state, confirmPassword: true, password: true }));
            toast.error('Password tidak sama');
            return
        }

        formRegisterData.append('name', name);
        formRegisterData.append('phone', phone);
        formRegisterData.append('email', email);
        formRegisterData.append('password', password);
        formRegisterData.append('password_confirmation', confirmPassword);

        handleRegister(formRegisterData);
    }

    useEffect(() => {
        if (noTelpRef.current?.value) {
            if (noTelpRef.current?.value.startsWith('62')) {
                setErrorInput((state) => ({ ...state, noTelp: false }));
            }
        }
    }, [noTelpRef.current?.value]);



    return (
        <Fragment>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label htmlFor="nama" className="text-slate-800 font-bold">Nama/Nama Perusahaan</label>
                <TextField id="nama" name="nama" type="nama" variant="outlined" placeholder="Input your name" error={errorInput.nama} />
                <label htmlFor="no-telp" className="text-slate-800 font-bold">No Telp</label>
                <TextField id="noTelp" name="noTelp" type="number" variant="outlined" placeholder="Input your phone number (62)" error={errorInput.noTelp} inputRef={noTelpRef} />
                <label htmlFor="email" className="text-slate-800 font-bold">Email</label>
                <TextField id="email" name="email" type="email" variant="outlined" placeholder="Input your email" error={errorInput.email} />
                <label htmlFor="outlined-adornment-password" className="text-slate-800 font-bold">Password</label>
                <InputPassword error={errorInput.password} id="outlined-adornment-password1" name="password" />
                <label htmlFor="outlined-adornment-password" className="text-slate-800 font-bold">Konfirmasi Password</label>
                <InputPassword error={errorInput.confirmPassword} id="outlined-adornment-password2" name="confirmPassword" />
                <Button text={isPending ? "Loading..." : "Sign Up"} className="mt-3" disabled={isPending} />
                <h4 className="text-sm text-slate-600 text-center mt-3">Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link></h4>
            </form>
            <Toaster />
        </Fragment>
    )
}

export default FormRegister;