import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const BasicSelect = () => {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div className=''>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Sort</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    defaultValue='Harian'
                    label="Age"
                    onChange={handleChange} 
                    className='text-sm'
                >
                    <MenuItem value={'harian'}>Harian</MenuItem>
                    <MenuItem value={'mingguan'}>Mingguan</MenuItem>
                    <MenuItem value={'bulanan'}>Bulanan</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default BasicSelect;