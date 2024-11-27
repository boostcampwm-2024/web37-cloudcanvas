import {
    SERVER_IMAGE_SPEC_CODE,
    SERVER_OS_IMAGES,
} from '@/src/models/ncloud/constants';
import useNCloud from '@hooks/useNCloud';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

type Props = {};

export default ({}: Props) => {
    const { selectedResource, updateProperties } = useNCloud();

    const [serverImageCode, setServerImageCode] = useState<string>('');
    const [specCode, setSpecCode] = useState<string>('');

    const [name, setName] = useState('');

    useEffect(() => {
        if (!selectedResource) return;
        const { properties } = selectedResource;
        setName(properties.name || '');
        setServerImageCode(properties.server_image_number || '');
        setSpecCode(properties.server_spec_code || '');
    }, [selectedResource]);

    const handleChangeImage = (e: SelectChangeEvent) => {
        const code = e.target.value as string;
        if (!selectedResource) return;
        setServerImageCode(code);
        const firstSpecCode = SERVER_IMAGE_SPEC_CODE[code][0]?.code;

        setSpecCode(firstSpecCode);
        updateProperties(selectedResource.id, {
            server_image_number: code.toLowerCase(),
            server_spec_code: firstSpecCode.toLowerCase(),
        });
    };

    const handleChangeSpec = (e: SelectChangeEvent) => {
        const code = e.target.value as string;
        if (!selectedResource) return;
        setSpecCode(code);
        updateProperties(selectedResource.id, { server_spec_code: code });
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (!selectedResource) return;
        updateProperties(selectedResource.id, { name: newName });
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
                    id="name"
                    value={name}
                    placeholder="Resource Name"
                    autoComplete="off"
                    onKeyDown={(e) => e.stopPropagation()}
                    onChange={handleChangeName}
                />
            </FormControl>
            <FormControl
                variant="standard"
                sx={{
                    minWidth: 'max-content',
                }}
            >
                <InputLabel id="server-image-label">Server Image</InputLabel>
                <Select
                    labelId="server-image"
                    id="server-image"
                    value={serverImageCode}
                    onChange={handleChangeImage}
                    MenuProps={{
                        disablePortal: true,
                    }}
                    sx={{ minWidth: 200 }}
                >
                    {SERVER_OS_IMAGES.map((os) => (
                        <MenuItem key={os.code} value={os.code}>
                            {`${os.name}-${os.hyperVisor}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl
                variant="standard"
                sx={{
                    minWidth: 'max-content',
                }}
            >
                <InputLabel id="server-product-code-label">Spec</InputLabel>
                <Select
                    labelId="server-product-code"
                    id="server-product-code"
                    value={specCode}
                    onChange={handleChangeSpec}
                    MenuProps={{
                        disablePortal: true,
                    }}
                    sx={{ minWidth: 200 }}
                >
                    {SERVER_IMAGE_SPEC_CODE[serverImageCode]?.map(
                        (spec: any) => (
                            <MenuItem key={spec.code} value={spec.code}>
                                {spec.info}
                            </MenuItem>
                        ),
                    ) || <MenuItem disabled>No specs available</MenuItem>}
                </Select>
            </FormControl>
        </Stack>
    );
};
