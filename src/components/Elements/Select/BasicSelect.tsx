import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

interface BasicSelectInterface {
    summaryBy: string;
    onChange: (sum: string) => void;
}

const BasicSelect: React.FC<BasicSelectInterface> = ({summaryBy, onChange}) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <div className=''>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Sort</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={summaryBy}
                    defaultValue='Harian'
                    label="Age"
                    onChange={handleChange} 
                    className='text-sm'
                >
                    <MenuItem value={'Daily'}>Harian</MenuItem>
                    <MenuItem value={'Weekly'}>Mingguan</MenuItem>
                    <MenuItem value={'Monthly'}>Bulanan</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default BasicSelect;