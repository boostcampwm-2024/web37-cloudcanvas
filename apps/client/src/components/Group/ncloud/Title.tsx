import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds } from '@types';

type Props = {
    bounds: Bounds;
    color: string;
    text?: string;
};

const convertToIsoMatrix = (bounds: Bounds) => {
    const isoMatrix = new DOMMatrixReadOnly()
        .rotate(30)
        .skewX(-30)
        .scale(1, 0.8602);
    const top1Matrix = isoMatrix.translate(bounds.x, bounds.y);
    top1Matrix.e = 0;
    top1Matrix.f = 0;
    return top1Matrix;
};
export default ({ bounds, color, text }: Props) => {
    const { dimension } = useDimensionContext();
    const fontSize = 30;
    const rectWidth = fontSize * (text?.length ?? 0);
    const offset = dimension === '2d' ? 20 : 30;
    const rectX = bounds.width;
    const rectY = 20;
    const rectHeight = 50;

    const matrix = convertToIsoMatrix(bounds).toString();
    const centerX = rectX + rectWidth / 2;
    const centerY = rectY + rectHeight / 2;

    const transform = dimension === '2d' ? '' : matrix;
    return (
        <svg overflow="visible">
            <rect
                transform={transform}
                x={rectX - rectWidth - offset}
                y={rectY}
                rx="12"
                ry="12"
                width={rectWidth}
                height={rectHeight}
                fill={color}
                opacity="0.8"
            ></rect>
            <g fontWeight="bold" fontSize={fontSize} fill="#fff">
                <text
                    transform={transform}
                    x={centerX - rectWidth - offset}
                    y={centerY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    style={{ userSelect: 'none' }}
                >
                    <tspan>{text ?? ''}</tspan>
                </text>
            </g>
        </svg>
    );
};
