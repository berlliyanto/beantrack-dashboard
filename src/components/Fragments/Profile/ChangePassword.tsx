import { FormEvent, useState } from "react";
import Button from "../../Elements/Buttons/Button";
import InputPassword from "../../Elements/Input/InputPassword";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileService } from "../../../services/auth/profile";
import { Toaster, toast } from "react-hot-toast";
import { clearTokenAfterLogout } from "../../../redux/slice/authSlice";

const ChangePassword = () => {

    const token = useSelector((state: any) => state.token);
    const [errorPw, setErrorPw] = useState<boolean>(false);
    const dispatch = useDispatch();

    const {mutate, isPending} = updateProfileService(
        () => {
            toast.success("Berhasil Ganti Password\nSilahkan Login Kembali", {duration: 1500});
            setTimeout(() => {
                dispatch(clearTokenAfterLogout());
                window.location.replace('/login');
            }, 2000);
        },
        (error) => {
            toast.error(error.response.data.message.password[0]);
            setErrorPw(true);
            setTimeout(() => {
                setErrorPw(false);
            }, 3500);
        },
        token
    )

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPW = e.currentTarget.newPassword.value;
        const confirmPW = e.currentTarget.confirmPassword.value;
        if(newPW !== confirmPW){
            toast.error('Password tidak sama');
            setErrorPw(true);
            setTimeout(() => {
                setErrorPw(false);
            }, 3500);
            return;
        }

        const formData = new FormData();
        formData.append('password', confirmPW);

        mutate(formData)
    }

    return (
        <section className="p-4 ml-4 my-4 flex flex-col gap-3 bg-white border border-[#DADADA] rounded-lg">
            <h1 className="text-slate-800 font-bold mb-4 ">Ubah Password</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label htmlFor="">Password baru</label>
                <InputPassword id="newPassword" name="newPassword" error={errorPw} />
                <label htmlFor="">Konfirmasi Password</label>
                <InputPassword id="confirmPassword" name="confirmPassword" error={errorPw} />
                <Button disabled={false} text={isPending ? "Loading..." : "Ubah Password"} className="self-end h-fit p-2 text-sm" />
            </form>
            <Toaster />
        </section>
    )
}

export default ChangePassword;