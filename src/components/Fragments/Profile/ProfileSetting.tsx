import { Skeleton, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Button from "../../Elements/Buttons/Button";
import { useSelector } from "react-redux";
import { profileService, updateProfileService } from "../../../services/auth/profile";
import { Toaster, toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type ProfileDataType = {
    role_id: number | string;
    name: string;
    email: string;
    phone: number | string;
}

const ProfileSetting = () => {
    const queryClient = useQueryClient();
    const token = useSelector((state: any) => state.token)
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
    const [profileData, setProfileData] = useState<ProfileDataType>({
        role_id: 0,
        name: '',
        email: '',
        phone: 0,
    });

    const { data, isLoading, isRefetching } = profileService(token, 'getProfileMenu');

    useEffect(() => {
        if (data) {
            const { name, email, phone, role_id } = data.data.data.user;
            setProfileData((state) => ({
                ...state,
                role_id,
                name,
                email,
                phone,
            }))
        }
    }, [data])

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.currentTarget.files?.[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarPreview(event.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setAvatarPreview(undefined);
        }
    }

    const { mutate, isPending } = updateProfileService(
        (success) => {
            queryClient.invalidateQueries({queryKey : ['getProfileMenu']})
            queryClient.invalidateQueries({queryKey : ['getProfileNav']})
            toast.success(success.data.message, {duration:2000});
        },
        (error) => {
            console.log(error)
            toast.error("Gagal Update", {duration:2000});
        },
        token
    )

    const handleUpdateProfile = () => {
        const { role_id, email, name, phone } = profileData;
        if (!email || !name || !phone) return;
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone.toString());
        formData.append("role_id", role_id.toString());
        mutate(formData);
    }

    return (
        <section className="p-4 ml-4 my-4 flex flex-col gap-3 bg-white border border-[#DADADA] rounded-lg">
            <h1 className="text-slate-800 font-bold mb-4 ">Pengaturan Profile</h1>
            <div className="flex items-start gap-5">
                <div className="">
                    <label htmlFor="image" className="w-16 h-16 mx-auto rounded-full overflow-hidden md:w-24 md:h-24">
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Avatar Preview" className="object-cover" width={80} />
                        ) : (
                            <div className="h-16 w-16 rounded-full bg-slate-400 flex items-center justify-center md:w-24 md:h-24">
                                img
                            </div>
                        )}
                    </label>
                    <input type="file" name="image" id="image" accept=".jpg, .jpeg, .png, .svg" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </div>
                <div className="flex flex-col w-full gap-2">
                    {
                        isLoading || isRefetching ?
                            <Fragment>
                                <Skeleton variant="rounded" width={'100%'} height={60} />
                                <br />
                                <Skeleton variant="rounded" width={'100%'} height={60} />
                                <br />
                                <Skeleton variant="rounded" width={'100%'} height={60} />
                            </Fragment>
                            :
                            <Fragment>
                                <label htmlFor="name">Name :</label>
                                <TextField type="text" name="name" id="name" value={profileData.name} onChange={(e) => setProfileData((state) => ({ ...state, name: e.target.value }))} />
                                <label htmlFor="email">Email :</label>
                                <TextField type="email" name="email" id="email" value={profileData.email} onChange={(e) => setProfileData((state) => ({ ...state, email: e.target.value }))} />
                                <label htmlFor="phone">No Hp :</label>
                                <TextField type="number" name="phone" id="phone" value={profileData.phone} onChange={(e) => setProfileData((state) => ({ ...state, phone: e.target.value }))} />
                            </Fragment>
                    }
                </div>
            </div>
            <Button disabled={false} text={isPending ? "Loading..." : "Perbaharui Profil"} className="self-end text-sm h-auto py-2 px-2" onClick={handleUpdateProfile} />
            <Toaster />
        </section>
    )
}

export default ProfileSetting;