import { useDimensionContext } from '@contexts/DimensionContext';
import { Node } from '@types';

type Props = Partial<Node>;
//TODO:
const Node3D = ({ properties }: Props) => {
    return (
        <g>
            <polygon
                points="64 0, 320 148, 64 296, -192 148"
                fill="#ececed"
            ></polygon>
            <svg x="34" y="-108" overflow="visible">
                <g
                    fill="#4286c5"
                    fillOpacity="1"
                    stroke="none"
                    transform="scale(1.25) matrix(0.707 0.409 -0.707 0.409 0 0)"
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
            <polygon
                points="-192 148, 64 296, 64 334, -192 186"
                fill="#d2d2d4"
                stroke="#83838a"
            ></polygon>
            <polygon
                points="64 296, 320 148, 320 178, 64 326"
                fill="#b8b8bb"
                stroke="#83838a"
            ></polygon>
            <polygon
                points="-192 185, 64 333, 64 327, -192 179"
                fill="#326ca2"
                stroke="#326ca2"
            ></polygon>
            <polygon
                points="64 333, 320 185, 320 179, 64 327"
                fill="#26527b"
                stroke="#26527b"
            ></polygon>
            <polygon
                points="64 0, -192 148, -192 185, 64 333, 320 185, 320 148"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
            ></polygon>
            <svg x="74" y="41" overflow="visible">
                <clipPath id="clip-adcdd432-1660-44d6-96f3-755297b72a97">
                    <polygon points="-10 -43, 246 105, -10 253, -266 105"></polygon>
                </clipPath>
                <g
                    clip-path="url(#clip-adcdd432-1660-44d6-96f3-755297b72a97)"
                    fontFamily="Noto Sans"
                    fontSize="32pt"
                    fill="#000000"
                    fontWeight="bold"
                >
                    <text
                        stroke="#ffffff"
                        strokeWidth="4"
                        transform="matrix(0.707 0.409 -0.707 0.409 0 0)"
                    >
                        <tspan>ECS Cluster</tspan>
                    </text>
                    <text transform="matrix(0.707 0.409 -0.707 0.409 0 0)">
                        <tspan>ECS Cluster</tspan>
                    </text>
                </g>
            </svg>
        </g>
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
                    clipPath="url(#clip-2f42fc2f-d090-4c0b-b437-3ed1b55f73fd)"
                    fontFamily="Noto Sans"
                    fontSize="32pt"
                    fill="#000000"
                    fontWeight="bold"
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