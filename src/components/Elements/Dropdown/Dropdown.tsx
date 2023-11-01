import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';

interface DropDownMenuProps {
    menu: string[];
    handleConnect: (item: string) => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({menu, handleConnect}) => {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { color: 'neutral' } }} 
            >
                <MoreVert />
            </MenuButton>
            <Menu>
                {
                    menu.map((item,index) => (
                        <MenuItem key={index} onClick={() => handleConnect(item)}>{item}</MenuItem>
                    ))
                }
            </Menu>
        </Dropdown>
    );
}

export default DropDownMenu;