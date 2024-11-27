import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {};

const REGION_OPTIONS = [
    { value: 'kr', label: 'Korea' },
    { value: 'jp', label: 'Japan' },
];

export default ({}: Props) => {
    const [region, setRegion] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRegion(event.target.value as string);
    };

    return (
        <Box minWidth={150}>
            <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                    value={region}
                    label="Region"
                    onChange={handleChange}
                    autoWidth
                >
                    <MenuItem value="">None</MenuItem>
                    {REGION_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
