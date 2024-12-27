import { GRID_HEIGHT_3D, GRID_SIZE_2D, GRID_WIDTH_3D } from '@/constants';
import useSvgStore from '@/store/useSvgStore';

function GridBackground() {
    const dimension = useSvgStore((state) => state.dimension);
    const viewBox = useSvgStore((state) => state.viewBox);

    if (!dimension) return null;

    const gridConfig =
        dimension === '2d'
            ? {
                  width: GRID_SIZE_2D,
                  height: GRID_SIZE_2D,
                  subPath: `M 0 ${GRID_SIZE_2D / 2} h ${GRID_SIZE_2D} M ${GRID_SIZE_2D / 2} 0 v ${GRID_SIZE_2D}`,
                  mainPath: `M 0 0 h ${GRID_SIZE_2D} v ${GRID_SIZE_2D} h ${-GRID_SIZE_2D} v ${-GRID_SIZE_2D}`,
              }
            : {
                  width: GRID_WIDTH_3D,
                  height: GRID_HEIGHT_3D,
                  subPath: `M ${GRID_WIDTH_3D / 2} 0 l ${GRID_WIDTH_3D / 2} ${GRID_HEIGHT_3D / 2} l ${-GRID_WIDTH_3D / 2} ${GRID_HEIGHT_3D / 2} l ${-GRID_WIDTH_3D / 2} ${-GRID_HEIGHT_3D / 2}  z`,
                  mainPath: `M 0 0 l ${GRID_WIDTH_3D} ${GRID_HEIGHT_3D} M ${GRID_WIDTH_3D} 0 l ${-GRID_WIDTH_3D} ${GRID_HEIGHT_3D}`,
              };

    return (
        <>
            <defs>
                <pattern
                    id="grid"
                    width={gridConfig.width}
                    height={gridConfig.height}
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        id="grid-sub"
                        d={gridConfig.subPath}
                        fill="none"
                        stroke="#bbb"
                        strokeDasharray={4}
                    />
                    <path
                        id="grid-main"
                        d={gridConfig.mainPath}
                        fill="none"
                        stroke="black"
                    />
                </pattern>
            </defs>
            <rect
                x={viewBox.x}
                y={viewBox.y}
                width={viewBox.width}
                height={viewBox.height}
                fill="url(#grid)"
            />
        </>
    );
}

export default GridBackground;
