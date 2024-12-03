import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { OnChangeValue } from 'react-select';
import { useState } from 'react';
import Creatable, { useCreatable } from 'react-select/creatable';
import { Stack, FormControl } from '@mui/material';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import useFetch from '@hooks/useFetch';
import { urls } from '../apis';
type Props = {
    open: boolean;
    onClose: () => void;
};

export default ({ open, onClose }: Props) => {
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { groups },
    } = useGroupContext();
    const {
        state: { edges },
    } = useEdgeContext();

    const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

    const { execute: saveArchitecture } = useFetch(urls('share'), {
        method: 'POST',
    });

    const handleClose = () => {
        onClose();
    };

    const handleChange = (values: OnChangeValue<any, any>) => setTags(values);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const title = formJson.title;
        const cloudTags = tags.map((tag) => tag.value);

        saveArchitecture({
            cost: 0,
            tags: cloudTags,
            architecture: {
                nodes,
                groups,
                edges,
            },
            title,
        });
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Share</DialogTitle>
            <DialogContent
                sx={{
                    minWidth: '600px',
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <label>Title</label>
                        <TextField
                            margin="dense"
                            id="title"
                            name="title"
                            variant="outlined"
                            type="text"
                            fullWidth
                            inputProps={{
                                style: { height: '36px', padding: '2px 8px' },
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <label style={{ marginBottom: 8 }}>Tags</label>
                        <Creatable
                            isMulti
                            name="tags"
                            value={tags}
                            onChange={handleChange}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    display: 'none',
                                }),
                                dropdownIndicator: () => ({ display: 'none' }),
                                indicatorSeparator: () => ({ display: 'none' }),
                            }}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};
