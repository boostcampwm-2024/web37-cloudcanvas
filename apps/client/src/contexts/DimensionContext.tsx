import { Dimension } from '@types';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

type DimensionState = {
    dimension: Dimension;
    prevDimension: Dimension;
    toggleDimension: () => void;
};

const DimensionContext = createContext<DimensionState | null>(null);

export const DimensionProvider = ({ children }: { children: ReactNode }) => {
    const [dimension, setDimension] = useState<Dimension>('2d');
    const prevDimensionRef = useRef<Dimension | null>('2d');

    const toggleDimension = () => {
        prevDimensionRef.current = dimension;
        setDimension((prev) => (prev === '2d' ? '3d' : '2d'));
    };

    return (
        <DimensionContext.Provider
            value={{
                dimension,
                prevDimension: prevDimensionRef.current!,
                toggleDimension,
            }}
        >
            {children}
        </DimensionContext.Provider>
    );
};

export const useDimensionContext = () => {
    const context = useContext(DimensionContext);
    if (!context) throw new Error('DimensionContext: context is undefined');

    return context;
};
