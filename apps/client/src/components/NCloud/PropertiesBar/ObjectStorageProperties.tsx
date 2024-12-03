import useNCloud from '@hooks/useNCloud';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

type Props = {};

export default ({}: Props) => {
    const { selectedResource, updateProperties } = useNCloud();

    const [bucketName, setBucketName] = useState('');

    useEffect(() => {
        if (!selectedResource) return;
        const { properties } = selectedResource;
        setBucketName(properties.bucketName ?? '');
    }, [selectedResource]);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setBucketName(newName);
        if (!selectedResource) return;
        updateProperties(selectedResource.id, { bucketName: newName });
    };

    return (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
        >
            <FormControl
                variant="standard"
                sx={{
                    minWidth: 200,
                }}
            >
                <InputLabel>Resource Name</InputLabel>
                <Input
                    id="bucketName"
                    value={bucketName}
                    placeholder="bucket name"
                    autoComplete="off"
                    onKeyDown={(e) => e.stopPropagation()}
                    onChange={handleChangeName}
                />
            </FormControl>
        </Stack>
    );
};
