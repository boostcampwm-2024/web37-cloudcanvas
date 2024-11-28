import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

export default ({
    platforms,
}: {
    platforms: Array<{
        value: string;
        title: string;
        imgUrl: string;
    }>;
}) => {
    const [value, setValue] = useState(platforms.at(0)!.value);
    const handleChange = (event: SelectChangeEvent) =>
        setValue(event.target.value);
    return (
        <Select
            value={value}
            onChange={handleChange}
            fullWidth
            sx={{
                [`& .MuiSelect-select`]: {
                    px: 1.5,
                    py: 1,
                },
            }}
        >
            {platforms.map(({ value, title, imgUrl }) => (
                <MenuItem key={value} value={value}>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemAvatar>
                            <Avatar alt="aws" src={imgUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={title} />
                    </ListItem>
                </MenuItem>
            ))}
        </Select>
    );
};
