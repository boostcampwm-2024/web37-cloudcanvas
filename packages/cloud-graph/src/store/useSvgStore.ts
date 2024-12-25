import { create } from 'zustand';

type SvgStore = {
    viewBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setViewBox: (x: number, y: number, width: number, height: number) => void;
};

const useSvgStore = create<SvgStore>((set) => ({
    viewBox: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    setViewBox: (x, y, width, height) =>
        set(() => ({ viewBox: { x, y, width, height } })),
}));

export default useSvgStore;
