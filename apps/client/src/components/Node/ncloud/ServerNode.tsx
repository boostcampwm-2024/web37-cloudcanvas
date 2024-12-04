import { useDimensionContext } from '@contexts/DimensionContext';
import { Node } from '@types';

type Props = Partial<Node>;

const Node3D = ({ properties }: Props) => {
    return (
        <>
            <svg
                width="128"
                height="111"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="1.414"
            >
                <path fill="#b8b8bb" d="M64 74v37l64-37V37L64 74Z"></path>
                <path fill="#d2d2d4" d="M0 37v37l64 37V74L0 37Z"></path>
                <path fill="#ececed" d="M0 37 64 0l64 37-64 37L0 37Z"></path>
                <path
                    fill="#83838a"
                    d="m64 73.407 62.111-35.86.514.889-62.487 36.078h-.276L.743 38.072l.514-.89L64 73.407Z"
                ></path>
                <path fill="#83838a" d="M63.486 74h1.027v36h-1.027z"></path>
                <path
                    fill="#000000"
                    d="M128 37v37l-64 37L0 74V37L64 0l64 37ZM2.054 38.185v34.63L64 108.627l61.946-35.812v-34.63L64 2.373 2.054 38.185Z"
                ></path>
            </svg>
            <svg x="49" y="14" width="80" height="36" overflow="visible">
                <rect
                    transform="matrix(0.707 0.409 -0.707 0.409 0 0)"
                    width="80"
                    height="36"
                    rx="5"
                    ry="5"
                    fill="#4286c5"
                ></rect>
                <text
                    transform="matrix(0.707 0.409 -0.707 0.409 0 0)"
                    x="50%"
                    y="80%"
                    fontFamily="Noto Sans"
                    textAnchor="middle"
                    fontWeight="normal"
                    fontSize="20pt"
                    fill="#ffffff"
                    style={{ userSelect: 'none' }}
                >
                    {properties?.server_spec_code?.split('-')[0].slice(0, 4)}
                </text>
            </svg>
        </>
    );
};

const Node2D = ({ properties }: Props) => {
    return (
        <>
            <svg width="90" height="90">
                <path
                    fill="#d86613"
                    d="M80.402 80.402H9.599V9.599h70.803zm-67.137-3.667h63.47v-63.47h-63.47Z"
                ></path>
                <path
                    fill="#d86613"
                    d="M19.719 1h3.666v10.432H19.72zm11.495 0h3.666v10.432h-3.666zm11.513 0h3.667v10.432h-3.667zM54.24 1h3.667v10.432H54.24zm11.514 0h3.666v10.432h-3.666zM19.719 78.57h3.666V89H19.72zm11.495 0h3.666V89h-3.666zm11.513 0h3.667V89h-3.667zm11.513 0h3.667V89H54.24zm11.514 0h3.666V89h-3.666zm12.815-58.41H89v3.666H78.57zm0 11.495H89v3.666H78.57zm0 11.513H89v3.667H78.57zm0 11.513H89v3.667H78.57zm0 11.495H89v3.667H78.57zM1 20.16h10.432v3.666H1zm0 11.495h10.432v3.666H1zm0 11.513h10.432v3.667H1zM1 54.68h10.432v3.667H1zm0 11.495h10.432v3.667H1z"
                ></path>
                <path
                    fill="#d86613"
                    d="M13.265 13.265h63.47v63.47h-63.47z"
                    opacity=".05"
                ></path>
            </svg>
            <svg x="18" y="27" width="54" height="36">
                <text
                    x="50%"
                    y="50%"
                    fontFamily="Noto Sans"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontWeight="bold"
                    fontSize="18pt"
                    fill="#d86613"
                    style={{ userSelect: 'none' }}
                >
                    {properties?.server_spec_code?.split('-')[0].slice(0, 4)}
                </text>
            </svg>
        </>
    );
};

export default ({ properties }: Partial<Node>) => {
    const { dimension } = useDimensionContext();
    return dimension === '2d' ? (
        <Node2D properties={properties} />
    ) : (
        <Node3D properties={properties} />
    );
};
