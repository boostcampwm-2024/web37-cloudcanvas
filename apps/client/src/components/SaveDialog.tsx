import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import useFetch from '@hooks/useFetch';
import { FormControl, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { urls } from '../apis';
import { useCloudGraph } from './CloudGraphProvider';
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
    const { data: graphData, setData: setGraphData } = useCloudGraph();

    const navigate = useNavigate();
    const params = useParams();
    const { execute: saveArchitecture } = useFetch(
        urls('privateArchi', params?.id ?? ''),
        {
            method: params?.id ? 'PATCH' : 'POST',
        },
    );

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const title = (e.target as any).title.value;

        const resp = await saveArchitecture({
            cost: 0,
            architecture: {
                nodes,
                groups,
                edges,
            },
            title,
        });
        if (resp?.id) {
            navigate(`${resp.id}`);
        }

        setGraphData((prev: any) => ({
            ...prev,
            title,
        }));
        onClose();
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
            <DialogTitle>Save</DialogTitle>
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
                            defaultValue={
                                graphData.title ? graphData.title : ''
                            }
                            id="title"
                            name="title"
                            required={true}
                            variant="outlined"
                            type="text"
                            fullWidth
                            inputProps={{
                                style: { height: '36px', padding: '2px 8px' },
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
