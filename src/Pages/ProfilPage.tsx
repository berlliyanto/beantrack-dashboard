import { Fragment, useState } from "react";
import FloatingActionButton from "../components/Elements/Buttons/FloatingActionButton";
import FixedDrawer from "../components/Fragments/Navigations/FixedDrawer";
import NavBarDashboard from "../components/Fragments/Navigations/NavBarDashboard";
import TemporaryDrawer from "../components/Fragments/Navigations/TemporaryDrawer";
import useToken from "../hooks/useToken";
import { PasswordOutlined, PeopleAltOutlined } from '@mui/icons-material';
import ProfileLayout from "../components/Layouts/ProfileLayout";

type ListMenuType = {
    name: string;
    title: string;
    icon: React.ReactElement;
    route: string;
}

const listMenu: ListMenuType[] = [
    {
        name: 'profile',
        title: 'Profil Saya ',
        icon: <PeopleAltOutlined />,
        route: '?view=profile',
    },
    {
        name: 'password',
        title: 'Ganti Password',
        icon: <PasswordOutlined />,
        route: '?view=password'
    },
]

const ProfilePage = () => {
    const { isAuth } = useToken();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };

    return (
        <main className="bg-slate-100/40">
            {
                isAuth ?
                    <Fragment>
                        <NavBarDashboard />
                        <FixedDrawer listMenu={listMenu} />
                        <TemporaryDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} listMenu={listMenu}/>
                        <div className="md:hidden">
                            <FloatingActionButton isOpen={isOpen} toggleDrawer={toggleDrawer} />
                        </div>
                        <ProfileLayout />
                    </Fragment>
                    : <h1>Unathorzied</h1>
            }
        </main>
    )
}

export default ProfilePage;