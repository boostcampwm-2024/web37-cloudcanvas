import { Dimension, ViewBox } from '@/types';
import { create } from 'zustand';

type SvgStore = {
    viewBox: ViewBox;
    setViewBox: ({
        x,
        y,
        width,
        height,
    }: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    dimension: Dimension;
    toggleDimension: () => void;
    svgRef: React.RefObject<SVGSVGElement>;
    setSvgRef: (ref: React.RefObject<SVGSVGElement>) => void;
};

const useSvgStore = create<SvgStore>((set) => ({
    viewBox: {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    setViewBox: ({ x, y, width, height }) =>
        set(() => ({ viewBox: { x, y, width, height } })),
    dimension: '2d',
    toggleDimension: () =>
        set((state) => ({
            dimension: state.dimension === '2d' ? '3d' : '2d',
        })),
    svgRef: { current: null },
    setSvgRef: (ref) => set(() => ({ svgRef: ref })),
}));

export default useSvgStore;
