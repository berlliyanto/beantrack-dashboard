import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { ReactElement } from 'react';

interface StandaloneToggleButtonProps {
    icon: ReactElement;
}

const StandaloneToggleButton: React.FC<StandaloneToggleButtonProps> = ({icon}) => {
    const [selected, setSelected] = React.useState(false);

    return (
        <ToggleButton
            sx={{width: 34, height: 34,}}
            value="check"
            selected={selected}
            onChange={() => {
                setSelected(!selected);
            }}
        >
            {icon}
        </ToggleButton>
    );
}

export default StandaloneToggleButton;