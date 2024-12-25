import { TRANSFORM_MATIRX } from '@/constants';
import useSvgStore from '@/store/useSvgStore';

type GridProps = {
    points: string;
    transform?: string;
};

const MinorGrid = ({ points, transform }: GridProps) => (
    <g>
        <pattern
            id="gridPatternMinor"
            x="0"
            y="0"
            width="90"
            height="90"
            patternUnits="userSpaceOnUse"
        >
            <path
                d="M -45 45 L 135 45"
                stroke="#eeeeee"
                stroke-width="1"
            ></path>
            <path
                d="M 45 -45 L 45 135"
                stroke="#eeeeee"
                stroke-width="1"
            ></path>
        </pattern>
        <polygon
            points={points}
            transform={transform}
            fill="url(#gridPatternMinor)"
        ></polygon>
    </g>
);
const MajorGrid = ({ points, transform }: GridProps) => (
    <g>
        <pattern
            id="gridPatternMajor"
            x="0"
            y="0"
            width="90"
            height="90"
            patternUnits="userSpaceOnUse"
        >
            <path
                d="M 0 0 L 90 0 90 90 0 90 z"
                stroke="#54626f"
                stroke-width="1"
                fill="none"
            ></path>
        </pattern>
        <polygon
            points={points}
            transform={transform}
            fill="url(#gridPatternMajor)"
        ></polygon>
    </g>
);

function GridBackground() {
    const viewBox = useSvgStore((state) => state.viewBox);

    const padding = 2;
    const points = `
${viewBox.x - viewBox.width * padding} ${viewBox.y - viewBox.height * padding},
${viewBox.x + viewBox.width * padding} ${viewBox.y - viewBox.height * padding},
${viewBox.x + viewBox.width * padding} ${viewBox.y + viewBox.height * padding},
${viewBox.x - viewBox.width * padding} ${viewBox.y + viewBox.height * padding}
`;
    const transform = TRANSFORM_MATIRX;
    return (
        <>
            <MinorGrid points={points} transform={transform} />
            <MajorGrid points={points} transform={transform} />
        </>
    );
}

export default GridBackground;
