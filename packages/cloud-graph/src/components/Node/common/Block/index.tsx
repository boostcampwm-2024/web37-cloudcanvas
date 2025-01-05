import { Dimension, GridSize } from '@/types';
import Block3D from './Block3D';
import Block2D from './Block2D';

type BlockProps = {
    dimension: Dimension;
    size: GridSize;
};

function Block({ dimension, size }: BlockProps) {
    return dimension === '3d' ? (
        <Block3D size={size as Required<GridSize>} />
    ) : (
        <Block2D size={size} />
    );
}

export default Block;
