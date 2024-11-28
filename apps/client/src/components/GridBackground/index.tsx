import { useDimensionContext } from '@contexts/DimensionContext';
import { useGraphContext } from '@contexts/GraphConetxt';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';

export default () => {
    const { dimension } = useDimensionContext();
    const {
        state: { viewBox },
    } = useGraphContext();

    const { x, y, width, height } = viewBox;

    const points = [
        `${x},${y}`,
        `${x + width},${y}`,
        `${x + width},${y + height}`,
        `${x},${y + height}`,
    ].join(' ');

    return (
        <>
            <GridPatternMinor points={points} dimension={dimension} />
            <GridPatternMajor points={points} dimension={dimension} />
        </>
    );
};
