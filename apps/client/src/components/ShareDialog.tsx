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
type Props = {
    open: boolean;
    onClose: () => void;
};

export default ({ open, onClose }: Props) => {
    const [selected, setSelected] = useState([
        { value: 'cloud', label: 'Cloud' },
    ]);

    const handleClose = () => {
        console.log(111);
        onClose();
    };

    const handleChange = (values: OnChangeValue<any, any>) =>
        setSelected(values);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                        (formData as any).entries(),
                    );
                    const email = formJson.email;
                    // handleClose();
                },
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
                        />
                    </FormControl>
                    <FormControl>
                        <label style={{ marginBottom: 8 }}>Tags</label>
                        <Creatable
                            isMulti
                            name="colors"
                            value={selected}
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
