import { Dimension } from '@types';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

type DimensionState = {
    dimension: Dimension;
    changeDimension: (newDimension: Dimension) => void;
};

const DimensionContext = createContext<DimensionState | null>(null);

export const DimensionProvider = ({ children }: { children: ReactNode }) => {
    const [dimension, setDimension] = useState<Dimension>('2d');

    const changeDimension = (newDimension: Dimension) => {
        if (dimension === newDimension) return;
        setDimension(newDimension);
    };

    return (
        <DimensionContext.Provider
            value={{
                dimension,
                changeDimension,
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
