import Stroke from '@/components/Svg/Stroke';
import { GRID_SIZE_2D } from '@/constants';
import { GridSize } from '@/types';

type Server2DProps = {
    size: GridSize;
};

function Server2D(props: Server2DProps) {
    const { size } = props;
    const width = GRID_SIZE_2D * size.cols;
    const height = GRID_SIZE_2D * size.rows;

    const strokePoints = [
        { x: 0, y: 0 }, // topLeft
        { x: width, y: 0 }, // topRight
        { x: width, y: height }, // bottomRight
        { x: 0, y: height }, // bottomLeft
    ];

    return (
        <>
            <g transform="translate(0 0)">
                <svg width={width} height={height}>
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
                {/* TODO: Extract Text Node */}
                {/* <svg x="99" y="387" width="72" height="36"> */}
                {/*     <text */}
                {/*         transform="" */}
                {/*         font-family="Noto Sans" */}
                {/*         text-anchor="middle" */}
                {/*         x="50%" */}
                {/*         font-weight="bold" */}
                {/*         font-size="18pt" */}
                {/*         y="75%" */}
                {/*         fill="#d86613" */}
                {/*     > */}
                {/*         M7g */}
                {/*     </text> */}
                {/* </svg> */}
            </g>
            <Stroke points={strokePoints} />
        </>
    );
}

export default Server2D;
