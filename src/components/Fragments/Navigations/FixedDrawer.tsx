import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Search } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetURLParams } from '../../../hooks/useGetURLParams';

type ListMenuType = {
    name: string
    title: string;
    icon: React.ReactElement,
    route: string;
}

interface FixedDrawerInterface {
    listMenu: ListMenuType[];
}

const FixedDrawer: React.FC<FixedDrawerInterface> = ({ listMenu }) => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const view = useGetURLParams(search, 'view');
    
    const changeView = (route: string) => {
        if (route) {
            navigate(`${pathname}${route}`)
        }
    }

    const list = () => (
        <List>
            {
                listMenu.map((item, index) => (
                    <ListItem key={index} disablePadding className={`${view == item.name ? 'bg-slate-200/50' : ''}`}>
                        <ListItemButton
                            onClick={() => changeView(item.route)}>
                            <ListItemIcon >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText className={`${view == item.name ? 'text-emerald-500' : 'text-[#737373]'}`} primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    );

    return (
        <aside className="hidden h-screen w-60 border-r border-[#DADADA] bg-white fixed left-0 top-0 z-10 pt-20 md:flex md:flex-col md:justify-between ani">
            <section>
                <div className='relative px-4 box-border mt-4'>
                    <input type='text' className='border w-52 border-[#DADADA] rounded-md py-2 pl-8 text-slate-800 placeholder:text-slate-800 outline-none focus:ring-1 ring-emerald-400' placeholder='Pencarian' />
                    <Search className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-800' />
                </div>
                {list()}
            </section>
            <section>

            </section>
        </aside>
    )
}

export default FixedDrawer