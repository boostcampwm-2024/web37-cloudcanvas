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
import { useDimensionContext } from '@contexts/DimensionContext';
import useGraph from '@hooks/useGraph';
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
    const { updatePointForDimension } = useGraph();
    const { data: graphData, setData: setGraphData } = useCloudGraph();
    const { dimension } = useDimensionContext();

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

        let updatedNodes = nodes;
        let updatedEdges = edges;
        // 서버에 저장시 2d로 변환
        if (dimension === '3d') {
            const { updatedNodes: _updatedNodes, updatedEdges: _updatedEdges } =
                updatePointForDimension(nodes, edges, '2d');

            updatedNodes = _updatedNodes;
            updatedEdges = _updatedEdges;
        }
        const resp = await saveArchitecture({
            cost: 0,
            architecture: {
                nodes: updatedNodes,
                edges: updatedEdges,
                groups,
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
                    minWidth: '300px',
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <label>Title</label>
                        <TextField
                            margin="dense"
                            defaultValue={
                                graphData?.title ? graphData.title : ''
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
