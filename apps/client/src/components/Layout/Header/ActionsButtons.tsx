import { urls } from '@/src/apis';
import { getPropertyFilters } from '@/src/models/ncloud';
import { ServerRequiredFields } from '@/src/models/ncloud/Server';
import { transformObject, validateObject } from '@/src/models/ncloud/utils';
import CodeDrawer from '@components/CodeDrawer';
import ShareDialog from '@components/ShareDialog';
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
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const url = useLocation();

    const handleOpenShareDialog = () => {
        setOpen(true);
    };
    const handleCloseShareDialog = () => {
        setOpen(false);
    };

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

    const CURRENT_ALLOWED_TYPES = ['server', 'object-storage', 'db-mysql'];
    const validateResource = (
        resources: {
            type: string;
            properties: any;
        }[],
    ) => {
        const validResult: { type: string; isValid: boolean }[] = [];
        resources.forEach((resource) => {
            if (
                !validateObject(
                    resource.properties,
                    getPropertyFilters(resource.type),
                )
            ) {
                validResult.push({ type: resource.type, isValid: false });
            }
        });

        return validResult;
    };
    const handleConvertTerraform = () => {
        let resources = selectedResource
            ? [
                  {
                      type: selectedResource.type,
                      properties: transformObject(selectedResource.properties),
                  },
              ]
            : Object.values(nodes)
                  .filter((node) => CURRENT_ALLOWED_TYPES.includes(node.type))
                  .map((node) => ({
                      type: node.type,
                      properties: transformObject(node.properties),
                  }));

        const validResult = validateResource(resources);
        const isValid = validResult.every((result) => result.isValid);
        if (!isValid) {
            validResult.forEach((result) => {
                alert(`${result.type} is not valid properties`);
            });
            return;
        }

        const Converter = new TerraformConverter();
        Converter.addResourceFromJson(resources);
        setTerraformCode(Converter.generate());
        setOpenDrawer(true);
    };

    const handleSave = () => {
        saveArchitecture();
    };

    return (
        <>
            <Button onClick={handleOpenShareDialog}>Share</Button>
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
            <ShareDialog open={open} onClose={handleCloseShareDialog} />
        </>
    );
};
