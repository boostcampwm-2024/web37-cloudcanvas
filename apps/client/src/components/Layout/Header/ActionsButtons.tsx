import { urls } from '@/src/apis';
import { getPropertyFilters } from '@/src/models/ncloud';
import { transformObject, validateObject } from '@/src/models/ncloud/utils';
import CodeDrawer from '@components/CodeDrawer';
import SaveDialog from '@components/SaveDialog';
import ShareDialog from '@components/ShareDialog';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import useFetch from '@hooks/useFetch';
import useNCloud from '@hooks/useNCloud';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TerraformConverter } from 'terraform/converter/TerraformConverter';

const CURRENT_ALLOWED_RESOURCE_TYPES = ['server', 'object-storage', 'db-mysql'];
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
    const [openShare, setOpenShare] = useState(false);
    const [openSave, setOpenSave] = useState(false);
    const params = useParams();

    const handleOpenShareDialog = () => setOpenShare(true);
    const handleCloseShareDialog = () => setOpenShare(false);

    const handleOpenSaveDialog = () => setOpenSave(true);
    const handleCloseSaveDialog = () => setOpenSave(false);

    const { execute: saveArchitecture } = useFetch(
        urls('privateArchi', params?.id ?? ''),
        {
            method: params?.id ? 'PATCH' : 'POST',
        },
    );

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
                  .filter((node) =>
                      CURRENT_ALLOWED_RESOURCE_TYPES.includes(node.type),
                  )
                  .map((node) => ({
                      type: node.type,
                      properties: transformObject(node.properties),
                  }));

        const validResult = validateResource(resources);
        const isValid = validResult.every((result) => result.isValid);
        if (!isValid) {
            let errorMessages = '';
            validResult.forEach((result) => {
                errorMessages += `${result.type}, `;
            });

            alert(`${errorMessages.slice(0, -2)} properties are not valid`);
            return;
        }

        const Converter = new TerraformConverter();
        Converter.addResourceFromJson(resources);
        setTerraformCode(Converter.generate());
        setOpenDrawer(true);
    };

    return (
        <>
            <Button onClick={handleOpenShareDialog}>Share</Button>
            <Button onClick={handleOpenSaveDialog}>Save</Button>
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
            <ShareDialog open={openShare} onClose={handleCloseShareDialog} />
            <SaveDialog open={openSave} onClose={handleCloseSaveDialog} />
        </>
    );
};
