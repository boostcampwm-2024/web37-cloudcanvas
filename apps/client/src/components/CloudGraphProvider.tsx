import { DimensionProvider } from '@contexts/DimensionContext';
import { EdgeProvider } from '@contexts/EdgeContext';
import { GraphProvider } from '@contexts/GraphConetxt';
import { GroupProvider } from '@contexts/GroupContext';
import { NodeProvider } from '@contexts/NodeContext';
import { SelectionProvider } from '@contexts/SelectionContext';
import { SvgProvider } from '@contexts/SvgContext';
import { calcViewBoxBounds } from '@helpers/viewBox';
import { Edge, Group, Node } from '@types';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

type Props = {
    children: ReactNode;
    initialData: {
        id: string;
        title: string;
        architecture: {
            nodes: Record<string, Node>;
            edges: Record<string, Edge>;
            groups: Record<string, Group>;
        };
    };
};
const CloudGraphContext = createContext<any>({});

export default ({ children, initialData }: Props) => {
    const architecture = initialData?.architecture;
    const [data, setData] = useState(initialData);
    return (
        <CloudGraphContext.Provider value={{ data, setData }}>
            <DimensionProvider>
                <SvgProvider>
                    <GraphProvider
                        initialViewBox={
                            architecture?.nodes
                                ? calcViewBoxBounds(
                                      architecture?.nodes,
                                      {
                                          x: 0,
                                          y: 0,
                                          width: document.body.clientWidth * 3,
                                          height:
                                              document.body.clientHeight * 3,
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
                        <GroupProvider initialGroups={architecture?.groups}>
                            <NodeProvider initialNodes={architecture?.nodes}>
                                <EdgeProvider
                                    initialEdges={architecture?.edges}
                                >
                                    <SelectionProvider>
                                        {children}
                                    </SelectionProvider>
                                </EdgeProvider>
                            </NodeProvider>
                        </GroupProvider>
                    </GraphProvider>
                </SvgProvider>
            </DimensionProvider>
        </CloudGraphContext.Provider>
    );
};

export const useCloudGraph = () => {
    const state = useContext(CloudGraphContext);
    return state;
};
