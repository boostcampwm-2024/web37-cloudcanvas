import { Dimension, ViewBox } from '@/types';
import { create } from 'zustand';

type SvgStoreState = {
    viewBox: ViewBox;
    dimension: Dimension;
};

type SvgStoreAction = {
    setViewBox: ({ x, y, width, height }: ViewBox) => void;
    toggleDimension: () => void;
};

const useSvgStore = create<SvgStoreState & SvgStoreAction>((set) => ({
    dimension: '3d',
    viewBox: {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    setViewBox: ({ x, y, width, height }) =>
        set(() => ({ viewBox: { x, y, width, height } })),
    toggleDimension: () =>
        set((state) => ({
            dimension: state.dimension === '2d' ? '3d' : '2d',
        })),
}));

export default useSvgStore;
