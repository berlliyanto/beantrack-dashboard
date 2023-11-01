import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetURLParams } from '../../../hooks/useGetURLParams';

type ListMenuType = {
    name: string
    title: string;
    icon: React.ReactElement,
    route: string;
}

interface TemporaryDrawerProps {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    isOpen: boolean;
    listMenu: ListMenuType[]
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({ toggleDrawer, isOpen, listMenu }) => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const view = useGetURLParams(search, 'view');

    const changeView = (route: string) => {
        if (route) {
            navigate(`${pathname}${route}`)
        }
    }

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {
                    listMenu.map((item, index) => (
                        <ListItem key={index} disablePadding className={`${view == item.name ? 'bg-slate-200/50' : ''}`}>
                            <ListItemButton 
                                onClick={() => changeView(item.route)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText className={`${view == item.name ? 'text-emerald-500' : 'text-[#737373]'}`} primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
        >
            <div className='mx-auto mt-3 mb-3'>
                <img src="images/3_BEANTRACK.svg" alt="" />
            </div>
            <Divider />
            <div className='relative px-4 box-border mt-4'>
                <input type='text' className='relative border border-[#DADADA] rounded-md h-10 w-56 pl-8 text-slate-800 placeholder:text-slate-800 outline-none focus:ring-1 ring-emerald-400' placeholder='Pencarian'/>
                <Search className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-800' />
            </div>
            {list()}
            <div onClick={toggleDrawer(false)}
                className='bg-slate-200 w-fit rounded-full shadow-lg p-3 absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer duration-300 hover:bg-slate-300'>
                <CloseIcon className="text-slate-800" />
            </div>
        </Drawer>
    );
}

export default TemporaryDrawer;