import { useDimensionContext } from '@contexts/DimensionContext';
import { Node } from '@types';

type Props = Partial<Node>;

const convertToIsoMatrix = (x: number, y: number) => {
    const isoMatrix = new DOMMatrix()
        .rotate(30)
        .skewX(-30)
        .scale(1, 0.8602)
        .translate(x, y);

    return isoMatrix; // 결과 행렬 반환
};
const Node3D = ({ properties }: Props) => {
    const matrix = convertToIsoMatrix(0, 0);

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

            {/* <g */}
            {/*     x="58" */}
            {/*     y="19" */}
            {/*     transform={`matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`} */}
            {/* > */}
            {/*     <svg></svg> */}
            {/*     <path */}
            {/*         d="M15.948,2h.065a10.418,10.418,0,0,1,.972.528Q22.414,5.65,27.843,8.774a.792.792,0,0,1,.414.788c-.008,4.389,0,8.777-.005,13.164a.813.813,0,0,1-.356.507q-5.773,3.324-11.547,6.644a.587.587,0,0,1-.657.037Q9.912,26.6,4.143,23.274a.7.7,0,0,1-.4-.666q0-6.582,0-13.163a.693.693,0,0,1,.387-.67Q9.552,5.657,14.974,2.535c.322-.184.638-.379.974-.535" */}
            {/*         style={{ fill: '#009639' }} */}
            {/*     /> */}
            {/*     <path */}
            {/*         d="M8.767,10.538q0,5.429,0,10.859a1.509,1.509,0,0,0,.427,1.087,1.647,1.647,0,0,0,2.06.206,1.564,1.564,0,0,0,.685-1.293c0-2.62-.005-5.24,0-7.86q3.583,4.29,7.181,8.568a2.833,2.833,0,0,0,2.6.782,1.561,1.561,0,0,0,1.251-1.371q.008-5.541,0-11.081a1.582,1.582,0,0,0-3.152,0c0,2.662-.016,5.321,0,7.982-2.346-2.766-4.663-5.556-7-8.332A2.817,2.817,0,0,0,10.17,9.033,1.579,1.579,0,0,0,8.767,10.538Z" */}
            {/*         style={{ fill: '#fff' }} */}
            {/*     /> */}
            {/* </g> */}
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
            {/* <svg xmlns="http://www.w3.org/2000/svg" x="30" y="27"> */}
            {/*     <title>file_type_nginx</title> */}
            {/*     <path */}
            {/*         d="M15.948,2h.065a10.418,10.418,0,0,1,.972.528Q22.414,5.65,27.843,8.774a.792.792,0,0,1,.414.788c-.008,4.389,0,8.777-.005,13.164a.813.813,0,0,1-.356.507q-5.773,3.324-11.547,6.644a.587.587,0,0,1-.657.037Q9.912,26.6,4.143,23.274a.7.7,0,0,1-.4-.666q0-6.582,0-13.163a.693.693,0,0,1,.387-.67Q9.552,5.657,14.974,2.535c.322-.184.638-.379.974-.535" */}
            {/*         style={{ fill: '#009639' }} */}
            {/*     /> */}
            {/*     <path */}
            {/*         d="M8.767,10.538q0,5.429,0,10.859a1.509,1.509,0,0,0,.427,1.087,1.647,1.647,0,0,0,2.06.206,1.564,1.564,0,0,0,.685-1.293c0-2.62-.005-5.24,0-7.86q3.583,4.29,7.181,8.568a2.833,2.833,0,0,0,2.6.782,1.561,1.561,0,0,0,1.251-1.371q.008-5.541,0-11.081a1.582,1.582,0,0,0-3.152,0c0,2.662-.016,5.321,0,7.982-2.346-2.766-4.663-5.556-7-8.332A2.817,2.817,0,0,0,10.17,9.033,1.579,1.579,0,0,0,8.767,10.538Z" */}
            {/*         style={{ fill: '#fff' }} */}
            {/*     /> */}
            {/* </svg> */}
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
                    {properties?.server_spec_code?.value
                        .split('-')[0]
                        .slice(0, 4)}
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
