import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds } from '@types';

type Props = {
    bounds: Bounds;
    color: string;
    text?: string;
};

const convertToIsoMatrix = (x: number, y: number) => {
    const isoMatrix = new DOMMatrixReadOnly()
        .rotate(30)
        .skewX(-30)
        .scale(1, 0.8602);
    const top1Matrix = isoMatrix.translate(x, y);
    top1Matrix.e = 0;
    top1Matrix.f = 0;
    return top1Matrix;
};
export default ({ bounds, color, text }: Props) => {
    const { dimension } = useDimensionContext();
    const fontSize = 30;
    const textLength = text ? (text.length > 7 ? 7 : text.length) : 0;
    const rectWidth = fontSize * textLength;
    const rectHeight = 50;
    const rectY = 10;
    const rectX = dimension === '2d' ? 10 : 90;

    const matrix = convertToIsoMatrix(bounds.x, bounds.y).toString();
    const centerX = rectWidth / 2 + rectX;
    const centerY = rectY + rectHeight / 2;

    const transform = dimension === '2d' ? '' : matrix;

    const label = text
        ? text.length > 7
            ? `${text.slice(0, 6)}..`
            : text
        : '';
    return (
        <svg overflow="visible">
            <rect
                transform={transform}
                x={rectX}
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
                    x={centerX}
                    y={centerY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    style={{ userSelect: 'none' }}
                >
                    <tspan>{label}</tspan>
                </text>
            </g>
        </svg>
    );
};
