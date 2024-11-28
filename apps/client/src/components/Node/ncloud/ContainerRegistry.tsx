import { useDimensionContext } from '@contexts/DimensionContext';
import { Node } from '@types';

type Props = Partial<Node>;
//TODO:
const Node3D = ({ properties }: Props) => {
    const width = 512;
    const height = 296;
    const point = `${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`;
    const isoMatrix = new DOMMatrix()
        .rotate(30)
        .skewX(-30)
        .scale(1, 0.8602)
        .translate(0, 0);
    return (
        <polygon
            points="0 0, 360 0, 360 360, 0 360"
            fill="#fff"
            stroke="#4286c5"
            transform={isoMatrix.translate(64, 0).toString()}
        ></polygon>
    );
};

const Node2D = ({ properties }: Props) => {
    return (
        <g>
            <polygon
                points="0 0, 360 0, 360 360, 0 360"
                fill="#fff"
                stroke="#4286c5"
            ></polygon>
            <svg x={-150} y={-110} overflow="visible">
                <g
                    fill="#693cc5"
                    fill-opacity="1"
                    stroke="none"
                    transform="scale(1.25) "
                >
                    <path
                        stroke="none"
                        d="M144 93.924l-14.834 8.565v19.577l16.954 9.789 14.835-8.565-6.358-3.67-8.477 4.893-10.597-6.117V106.16l8.478-4.894z"
                    ></path>
                    <path
                        stroke="none"
                        d="M148.24 93.924v7.342l8.476 4.894v9.788l6.358 3.671v-17.13z"
                    ></path>
                </g>
            </svg>
            <svg x={60} y={45} overflow="visible">
                <clipPath id="clip-2f42fc2f-d090-4c0b-b437-3ed1b55f73fd">
                    <polygon points="-58 -45, 302 -45, 302 315, -58 315"></polygon>
                </clipPath>
                <g
                    clip-path="url(#clip-2f42fc2f-d090-4c0b-b437-3ed1b55f73fd)"
                    font-family="Noto Sans"
                    font-size="32pt"
                    fill="#000000"
                    font-weight="bold"
                >
                    <text
                        stroke="#ffffff"
                        stroke-width="4"
                        style={{ userSelect: 'none' }}
                    >
                        <tspan>ECS Cluster</tspan>
                    </text>
                    <text>
                        <tspan>ECS Cluster</tspan>
                    </text>
                </g>
            </svg>
            <polygon
                points="0 0, 360 0, 360 360, 0 360"
                stroke-width="4"
                stroke="#4286c5"
                fill="none"
            ></polygon>
        </g>
    );
};
export default ({ properties }: Props) => {
    const { dimension } = useDimensionContext();
    return dimension === '2d' ? (
        <Node2D properties={properties} />
    ) : (
        <Node3D properties={properties} />
    );
};
