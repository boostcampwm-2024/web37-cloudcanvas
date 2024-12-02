import { useDimensionContext } from '@contexts/DimensionContext';
import { useGraphContext } from '@contexts/GraphConetxt';
import GridPatternMajor from './patterns/GridPatternMajor';
import GridPatternMinor from './patterns/GridPatternMinor';

export default () => {
    const { dimension } = useDimensionContext();
    const {
        state: { viewBox, initialViewBox },
    } = useGraphContext();

    const { x, y, width, height } = viewBox;

    const adjustWidth = viewBox.width + initialViewBox.width;
    const adjustHeight = viewBox.height + initialViewBox.height;

    const points = [
        `${x - adjustWidth},${y - adjustHeight}`,
        `${x + adjustWidth * 2},${y - adjustHeight}`,
        `${x + adjustWidth * 2},${y + adjustHeight * 2}`,
        `${x - adjustWidth},${y + adjustHeight * 2}`,
    ].join(' ');

    return (
        <>
            <GridPatternMinor points={points} dimension={dimension} />
            <GridPatternMajor points={points} dimension={dimension} />
        </>
    );
};
