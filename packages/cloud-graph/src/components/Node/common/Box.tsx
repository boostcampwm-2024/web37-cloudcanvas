import { GRID_HEIGHT_3D, GRID_WIDTH_3D } from '@/constants';
import { Dimension } from '@/types';

type BoxProps = {
    dimension: Dimension;
};

const Box3D = () => {
    return (
        <svg
            x={-GRID_WIDTH_3D / 2} //INFO: 보정값
            y={-GRID_HEIGHT_3D / 2}
            width="128"
            height="111"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
        >
            <path fill="#b8b8bb" d="M64 74v37l64-37V37L64 74Z"></path>
            <path fill="#d2d2d4" d="M0,37 v37 l64,37 V74 L0,37 Z"></path>
            <path fill="#ececed" d="M0,37 64,0 l64,37 -64,37 L0,37 Z"></path>
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
    );
};

const Box2D = () => {
    return (
        <rect
            width={90}
            height={90}
            stroke="blue"
            strokeWidth="2"
            fill="none"
        />
    );
};

function Box(props: BoxProps) {
    const { dimension } = props;
    return dimension === '3d' ? <Box3D /> : <Box2D />;
}

export default Box;
