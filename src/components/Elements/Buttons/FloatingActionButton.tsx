import { Fab } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface FloatingActionButtonProps {
    isOpen: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({isOpen, toggleDrawer}) => {


    return (
        <div className="fixed bottom-5 left-5 z-50" >
            <Fab style={{ backgroundColor: '#3A7358' }} aria-label="add" onClick={toggleDrawer(true)} >
                {isOpen ? <CloseIcon className="text-white" /> : <MenuIcon className="text-white" />}
            </Fab>
        </div>
    )
}

export default FloatingActionButton;