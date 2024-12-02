import { DimensionProvider } from '@contexts/DimensionContext';
import { EdgeProvider } from '@contexts/EdgeContext';
import { GraphProvider } from '@contexts/GraphConetxt';
import { GroupProvider } from '@contexts/GroupContext';
import { NodeProvider } from '@contexts/NodeContext';
import { SelectionProvider } from '@contexts/SelectionContext';
import { SvgProvider } from '@contexts/SvgContext';
import { Edge, Group, Node } from '@types';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    initialData: {
        nodes: Record<string, Node>;
        edges: Record<string, Edge>;
        groups: Record<string, Group>;
    };
};
export default ({ children, initialData }: Props) => {
    return (
        <DimensionProvider>
            <SvgProvider>
                <GraphProvider initialZoomFactor={3}>
                    <GroupProvider initialGroups={initialData?.groups}>
                        <NodeProvider initialNodes={initialData?.nodes}>
                            <EdgeProvider initialEdges={initialData?.edges}>
                                <SelectionProvider>
                                    {children}
                                </SelectionProvider>
                            </EdgeProvider>
                        </NodeProvider>
                    </GroupProvider>
                </GraphProvider>
            </SvgProvider>
        </DimensionProvider>
    );
};
