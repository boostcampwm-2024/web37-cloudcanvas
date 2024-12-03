import { DimensionProvider } from '@contexts/DimensionContext';
import { EdgeProvider } from '@contexts/EdgeContext';
import { GraphProvider } from '@contexts/GraphConetxt';
import { GroupProvider } from '@contexts/GroupContext';
import { NodeProvider } from '@contexts/NodeContext';
import { SelectionProvider } from '@contexts/SelectionContext';
import { SvgProvider } from '@contexts/SvgContext';
import { calcViewBoxBounds } from '@helpers/viewBox';
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
                <GraphProvider
                    initialViewBox={
                        initialData?.nodes
                            ? calcViewBoxBounds(
                                  initialData?.nodes,
                                  {
                                      x: 0,
                                      y: 0,
                                      width: document.body.clientWidth * 3,
                                      height: document.body.clientHeight * 3,
                                  },
                                  '2d',
                              )
                            : {
                                  x: 0,
                                  y: 0,
                                  width: document.body.clientWidth * 2,
                                  height: document.body.clientHeight * 2,
                              }
                    }
                >
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
