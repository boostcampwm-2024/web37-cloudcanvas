import Connector from '@components/Connectors/Connector';
import { Node } from '@types';

type Props = {
    node: Node;
};

export default ({ node }: Props) => {
    return (
        <>
            {Object.entries(node.connectors).map(([type, point]) => (
                <Connector
                    key={`${node.id}-${type}`}
                    point={point}
                    visible={false}
                />
            ))}
        </>
    );
};
