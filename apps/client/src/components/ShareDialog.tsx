import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import { calculateNodeBoundingBox } from '@helpers/node';
import useFetch from '@hooks/useFetch';
import { FormControl, Stack, useColorScheme, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { OnChangeValue } from 'react-select';
import Creatable from 'react-select/creatable';
import { urls } from '../apis';
import useGraph from '@hooks/useGraph';

type Props = {
    open: boolean;
    onClose: () => void;
};

const reactSelectStyles = (mode: string, theme: any) => ({
    control: (provided: any) => ({
        ...provided,
        backgroundColor:
            mode === 'dark' ? '#393939' : theme.palette.background.paper,
        borderColor:
            mode === 'dark' ? theme.palette.grey[700] : theme.palette.divider,
        minHeight: '40px',
        height: '40px',
        boxShadow: 'none',
        '&:hover': {
            borderColor: mode === 'dark' ? '#fff' : theme.palette.text.primary,
        },
        '&:focus-within': {
            borderColor:
                mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
        },
    }),
    input: (provided: any) => ({
        ...provided,
        color:
            mode === 'dark'
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
    }),
    menu: (provided: any) => ({
        ...provided,
        display: 'none',
    }),
    dropdownIndicator: () => ({ display: 'none' }),
    indicatorSeparator: () => ({ display: 'none' }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor:
            mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color:
            mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.text.primary,
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color:
            mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.text.primary,
        ':hover': {
            backgroundColor:
                mode === 'dark'
                    ? theme.palette.grey[600]
                    : theme.palette.grey[400],
            color:
                mode === 'dark'
                    ? theme.palette.common.white
                    : theme.palette.text.primary,
        },
    }),
});

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

    const { svgRef } = useSvgContext();
    const { dimension } = useDimensionContext();
    const { mode } = useColorScheme();
    const theme = useTheme();

    const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

    const { error, execute: shareArchitecture } = useFetch(urls('share'), {
        method: 'POST',
    });

    const getCloneSvg = (svg: SVGSVGElement) => {
        const allNodeBoundsBox = calculateNodeBoundingBox(
            Object.values(nodes),
            dimension,
        );
        const padding = 90 * 8;

        const viewBox = `${allNodeBoundsBox.minX - padding} ${
            allNodeBoundsBox.minY - padding
        } ${allNodeBoundsBox.width + padding * 2} ${
            allNodeBoundsBox.height + padding * 2
        }`;

        const svgClone = svg.cloneNode(true) as SVGSVGElement;
        svgClone.setAttribute('viewBox', viewBox);

        return svgClone;
    };

    const handleClose = () => {
        onClose();
    };

    const handleChange = (values: OnChangeValue<any, any>) => setTags(values);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const title = formJson.title;
        if (!title) {
            alert('Please enter title');
            return;
        }
        const cloudTags = tags.map((tag) => tag.value);

        if (svgRef.current === null) {
            console.error('svg ref is null');
            return;
        }

        const svgClone = getCloneSvg(svgRef.current);

        let updatedNodes = nodes;
        let updatedEdges = edges;
        // 서버에 저장시 2d로 변환
        if (dimension === '3d') {
            const { updatedNodes: _updatedNodes, updatedEdges: _updatedEdges } =
                updatePointForDimension(nodes, edges, '2d');

            updatedNodes = _updatedNodes;
            updatedEdges = _updatedEdges;
        }

        await shareArchitecture({
            cost: 0,
            tags: cloudTags,
            architecture: {
                nodes: updatedNodes,
                edges: updatedEdges,
                groups,
                svg: svgClone.outerHTML,
            },
            title,
        });

        if (error) {
            alert('Failed to share');
        } else {
            alert('Successfully shared');
        }
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
                            styles={reactSelectStyles(mode!, theme)}
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
