import { Fragment, useState } from "react";
import NavBarDashboard from "../components/Fragments/Navigations/NavBarDashboard";
import FloatingActionButton from "../components/Elements/Buttons/FloatingActionButton";
import TemporaryDrawer from '../components/Fragments/Navigations/TemporaryDrawer';
import FixedDrawer from "../components/Fragments/Navigations/FixedDrawer";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import useToken from "../hooks/useToken";
import { DashboardOutlined, PieChartOutline, ShoppingBagOutlined, TrendingUp } from "@mui/icons-material";

type ListMenuType = {
    name: string;
    title: string;
    icon: React.ReactElement,
    route: string;
}

const listMenu: ListMenuType[] = [
    {
        name: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        route: '?view=dashboard'

    },
    {
        name: 'analisis',
        title: 'Analisis',
        icon: <PieChartOutline />,
        route: '?view=analisis'
    },
    {
        name: 'produk',
        title: 'Produk',
        icon: <ShoppingBagOutlined />,
        route: '?view=produk'
    },
    {
        name: 'traffic',
        title: 'Traffic',
        icon: <TrendingUp />,
        route: '?view=traffic'
    },
]


const DashboardPage = () => {
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
                        <TemporaryDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} listMenu={listMenu} />
                        <div className="md:hidden">
                            <FloatingActionButton isOpen={isOpen} toggleDrawer={toggleDrawer} />
                        </div>
                        <DashboardLayout />
                    </Fragment>
                    : <h1>Unathorzied</h1>
            }
        </main>
    )
}

export default DashboardPage;