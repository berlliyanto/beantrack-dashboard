import { VisibilityOff, Visibility } from "@mui/icons-material"
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material"
import { useState } from "react";

interface InputPasswordProps {
    error: boolean;
    id: string;
    name: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ error, id, name }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <OutlinedInput
            
            error={error}
            name={name}
            placeholder="Input your password"
            id={id}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}

export default InputPassword;