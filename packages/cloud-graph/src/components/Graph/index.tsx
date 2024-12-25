import useSvgStore from '@/store/useSvgStore';
import { PropsWithChildren, useLayoutEffect } from 'react';

function Graph({ children }: PropsWithChildren) {
    const setViewBox = useSvgStore((state) => state.setViewBox);
    const viewBox = useSvgStore((state) => state.viewBox);

    useLayoutEffect(() => {
        const updateSize = () => {
            setViewBox(0, 0, window.innerWidth, window.innerHeight);
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [setViewBox]);

    return (
        <svg
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            width="100%"
            height="100%"
        >
            {children}
        </svg>
    );
}

export default Graph;
