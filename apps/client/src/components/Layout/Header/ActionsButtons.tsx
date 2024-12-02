import { urls } from '@/src/apis';
import { ServerRequiredFields } from '@/src/models/ncloud/Server';
import { transformObject, validateObject } from '@/src/models/ncloud/utils';
import CodeDrawer from '@components/CodeDrawer';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import useFetch from '@hooks/useFetch';
import useNCloud from '@hooks/useNCloud';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TerraformConverter } from 'terraform/converter/TerraformConverter';

export default () => {
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { groups },
    } = useGroupContext();
    const {
        state: { edges },
    } = useEdgeContext();

    const { selectedResource } = useNCloud();
    const { dimension, changeDimension } = useDimensionContext();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [terraformCode, setTerraformCode] = useState('');
    const navigate = useNavigate();
    const url = useLocation();

    const { execute: saveArchitecture } = useFetch(urls('privateArchi', ''), {
        method: 'POST',
        body: {
            cost: 273,
            architecture: {
                nodes,
                groups,
                edges,
            },
            title: 'fucking',
        },
    });

    const handleConvertTerraform = () => {
        if (!selectedResource) return;
        const nodeProperties = {
            type: selectedResource.type,
            name: selectedResource.properties.name,
            properties: transformObject(selectedResource.properties),
        };

        if (!validateObject(nodeProperties.properties, ServerRequiredFields)) {
            alert('Is not valid');
            return;
        }

        const Converter = new TerraformConverter();
        Converter.addResourceFromJson([nodeProperties]);
        setTerraformCode(Converter.generate());
        setOpenDrawer(true);
    };

    const handleSave = () => {
        saveArchitecture();
    };

    return (
        <>
            <Button onClick={handleSave}>Share</Button>
            <Button onClick={handleSave}>Save</Button>
            <Button
                className="graph-ignore-select"
                onClick={handleConvertTerraform}
            >
                Converter
            </Button>
            <ToggleButtonGroup
                value={dimension}
                exclusive
                onChange={() =>
                    changeDimension(dimension === '2d' ? '3d' : '2d')
                }
                sx={{
                    height: '38px',
                }}
            >
                <ToggleButton value="2d">2D</ToggleButton>
                <ToggleButton value="3d">3D</ToggleButton>
            </ToggleButtonGroup>

            <CodeDrawer
                code={terraformCode}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            />
        </>
    );
};
