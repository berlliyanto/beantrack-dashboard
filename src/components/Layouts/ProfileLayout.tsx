import { useLocation } from "react-router-dom";
import ProfileSetting from "../Fragments/Profile/ProfileSetting";
import { useGetURLParams } from "../../hooks/useGetURLParams";
import { Fragment, ReactNode, useEffect, useState } from "react";
import ChangePassword from "../Fragments/Profile/ChangePassword";

type ListMenuProfileType = {
    name: string;
    menu: React.ReactElement;
}

const listMenu: ListMenuProfileType[] = [
    {
        name: 'profile',
        menu: <ProfileSetting />
    },
    {
        name: 'password',
        menu: <ChangePassword />
    }
]

const ProfileLayout = () => {
    
    const {search} = useLocation();
    const view = useGetURLParams(search, 'view');
    const [currentView, setCurrentView] = useState<string>(view)
    
    useEffect(() => {
        setCurrentView(view);
    },[search, view])

    const renderMenuProfile = (): ReactNode => {
        return listMenu.map((item, index) => (
            <Fragment key={index}>
                {currentView == item.name && item.menu}
            </Fragment>
        ))
    }

    return (
        <article className="p-4 md:pt-20 md:pl-60">
            {renderMenuProfile()}
        </article>
    )
}

export default ProfileLayout;