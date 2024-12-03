import { NcloudGroupFactory, NcloudNodeFactory } from '@/src/models/ncloud';
import { DEFAULT_REGION, REGIONS } from '@/src/models/ncloud/constants';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useGraphContext } from '@contexts/GraphConetxt';
import useGraph from '@hooks/useGraph';
import useSelection from '@hooks/useSelection';
import { Region } from '@types';
import { findKeyByValue } from '@utils';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';

export default () => {
    const { selectedNodeId, selectedGroupId } = useSelection();
    const [selectedResource, setSelectedResource] = useState<
        | {
              id: string;
              type: string;
              properties: { [key: string]: any };
          }
        | undefined
    >(undefined);

    const [vpcList, setVpcList] = useState<{ [id: string]: string }>({});
    const [subnetList, setSubnetList] = useState<{ [id: string]: string }>({});
    const currentRegion = useRef(DEFAULT_REGION);

    const {
        nodes,
        groups,
        svgRef,
        updateNode,
        addNode,
        addNodeToGroup,
        addChildGroup,
        excludeNodeFromGroup,
        removeNodeFromGroup,
        addGroup,
        isExistGroup,
    } = useGraph();

    const {
        state: { viewBox },
    } = useGraphContext();
    const { dimension } = useDimensionContext();

    useEffect(() => {
        if (!selectedNodeId || !nodes[selectedNodeId]) {
            setSelectedResource(undefined);
            return;
        }

        const node = nodes[selectedNodeId];

        setSelectedResource({
            id: selectedNodeId,
            type: node.type,
            properties: node.properties,
        });
    }, [selectedNodeId, nodes]);

    useEffect(() => {
        if (!selectedNodeId) return;
        const node = nodes[selectedNodeId];
        const regionGroup = groups[node.properties.region?.id];
        if (!regionGroup) return;
        setVpcList({
            ...Object.fromEntries(
                regionGroup.childGroupIds.map((id) => [
                    id,
                    groups[id].properties.name,
                ]),
            ),
        });

        const vpcGroup = groups[node.properties.vpc?.id];
        if (!vpcGroup) return;
        setSubnetList({
            ...Object.fromEntries(
                vpcGroup.childGroupIds.map((id) => [
                    id,
                    groups[id].properties.name,
                ]),
            ),
        });
    }, [selectedNodeId, nodes]);

    useEffect(() => {
        currentRegion.current =
            selectedResource?.properties.region?.value ?? currentRegion.current;
    }, [selectedResource]);

    const findRegionGroup = (region: string) => {
        const prefixId = (id: string) => id.split('-')[0].toLowerCase();
        return Object.values(groups).find(
            (group) => prefixId(group.id) === region.toLowerCase(),
        );
    };

    const createResource = (type: string) => {
        if (!svgRef.current) return;

        const node = NcloudNodeFactory(type);
        const id = `node-${nanoid()}`;

        const region = REGIONS[currentRegion.current];
        addNode({
            ...node,
            id,
            properties: {
                ...node.properties,
                region: {
                    id: region.id,
                    value: region.value,
                },
            },
            point: {
                x: viewBox.x + 300,
                y: viewBox.y + viewBox.height / 2,
            },
        });

        const regionGroup = findRegionGroup(region.value);
        if (!regionGroup) {
            createRegion(region.id, region.value);
        }
        addNodeToGroup(regionGroup ? regionGroup.id : region.id, id);
    };

    const createRegion = (id: string, region: string) => {
        addGroup({
            ...NcloudGroupFactory('region'),
            id,
            nodeIds: [],
            properties: {
                name: REGIONS[region].label,
            },
        });
    };

    const changeRegion = (id: string, newRegion: Region) => {
        if (!selectedNodeId) return;
        const regionGroup = findRegionGroup(newRegion);

        if (!regionGroup) {
            createRegion(id, newRegion);
        }

        const regionId = regionGroup ? regionGroup.id : id;

        addNodeToGroup(regionId, selectedNodeId);

        const { properties } = nodes[selectedNodeId];
        if (properties.region) {
            const prevRegionId = findRegionGroup(properties.region.value)?.id;
            removeNodeFromGroup(prevRegionId!, selectedNodeId);
        }

        updateProperties(selectedNodeId, {
            region: {
                id: regionId,
                value: REGIONS[newRegion].value,
            },
        });
    };

    const createVpc = (id: string, newVpc: string) => {
        addGroup({
            ...NcloudGroupFactory('vpc'),
            id,
            nodeIds: [],
            properties: {
                name: newVpc,
            },
        });
    };

    const changeVpc = (id: string, newVpc: string) => {
        if (!selectedNodeId) return;
        const node = nodes[selectedNodeId];
        const prevVpcId = findKeyByValue(newVpc, vpcList);
        if (!prevVpcId) {
            createVpc(id, newVpc);
        }

        const idToUpdate = prevVpcId ?? id;
        const { properties } = node;
        addNodeToGroup(idToUpdate, selectedNodeId);
        addChildGroup(idToUpdate, properties.region.id, selectedNodeId);

        if (properties.vpc) {
            removeNodeFromGroup(properties.vpc.id, selectedNodeId);
        }

        updateProperties(selectedNodeId, {
            vpc: {
                id: idToUpdate,
                value: newVpc,
            },
        });
    };

    const createSubnet = (id: string, newSubnet: string) => {
        addGroup({
            ...NcloudGroupFactory('subnet'),
            id,
            nodeIds: [],
            properties: {
                name: newSubnet,
            },
        });
    };

    const changeSubnet = (id: string, newSubnet: string) => {
        if (!selectedNodeId) return;
        const node = nodes[selectedNodeId];
        const prevSubnetId = findKeyByValue(newSubnet, subnetList);
        if (!prevSubnetId) {
            createSubnet(id, newSubnet);
        }

        const idToUpdate = prevSubnetId ?? id;
        const { properties } = node;
        addNodeToGroup(idToUpdate, selectedNodeId);
        addChildGroup(idToUpdate, properties.vpc.id, selectedNodeId);

        if (properties.subnet) {
            removeNodeFromGroup(properties.subnet.id, selectedNodeId);
        }

        updateProperties(selectedNodeId, {
            subnet: {
                id: idToUpdate,
                value: newSubnet,
            },
        });
    };

    const removeVpc = (vpcId: string) => {
        if (!selectedNodeId) return;
        excludeNodeFromGroup(vpcId, selectedNodeId);
        updateProperties(selectedNodeId, {
            ...nodes[selectedNodeId].properties,
            vpc: undefined,
        });
    };

    const removeSubnet = (subnetId: string) => {
        if (selectedNodeId) {
            excludeNodeFromGroup(subnetId, selectedNodeId);
            updateProperties(selectedNodeId, {
                ...nodes[selectedNodeId].properties,
                subnet: undefined,
            });
        }
    };

    const updateProperties = (id: string, properties: any) => {
        updateNode(id, {
            properties: {
                ...nodes[id].properties,
                ...properties,
            },
        });
    };

    return {
        subnetList,
        vpcList,
        selectedResource,
        createResource,
        createRegion,
        createVpc,
        changeVpc,
        changeSubnet,
        updateProperties,
        removeVpc,
        removeSubnet,
        changeRegion,
    };
};
