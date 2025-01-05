import { Dimension, GridSize } from '@/types';
import Box3D from './Block3D';
import Box2D from './Block2D';

type BlockProps = {
    dimension: Dimension;
    size: GridSize;
};

function Box({ dimension, size }: BlockProps) {
    return dimension === '3d' ? (
        <Box3D size={size as Required<GridSize>} />
    ) : (
        <Box2D size={size} />
    );
}

export default Box;
