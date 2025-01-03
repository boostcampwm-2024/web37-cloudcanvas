import { TRANSFORM_MATRIX } from '@/constants';
import { Dimension } from '@/types';

interface RectProps extends React.ComponentProps<'rect'> {
    dimension: Dimension;
}

function Rect(props: RectProps) {
    const { dimension, ...rectProps } = props;

    const transform = dimension === '3d' ? TRANSFORM_MATRIX : '';
    return <rect transform={transform} {...rectProps} />;
}

export default Rect;
