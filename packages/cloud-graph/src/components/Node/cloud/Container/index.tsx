import { Dimension, GridSize } from '@/types';
import Container3D from './Container3D';
import Container2D from './Container2D';

export type ContainerProps = {
    dimension: Dimension;
    size: GridSize;
};

function Container(props: ContainerProps) {
    const { dimension, size } = props;

    return dimension === '3d' ? (
        <Container3D size={size as Required<GridSize>} />
    ) : (
        <Container2D size={size} />
    );
}

export default Container;
