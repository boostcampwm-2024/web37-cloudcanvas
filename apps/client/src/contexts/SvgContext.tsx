import {
    createContext,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef,
} from 'react';

type SvgContextProps = {
    svgRef: RefObject<SVGSVGElement>;
};

const SvgContext = createContext<SvgContextProps | undefined>(undefined);

export const SvgProvider = ({ children }: PropsWithChildren) => {
    const svgRef = useRef<SVGSVGElement>(null);

    return (
        <SvgContext.Provider value={{ svgRef }}>{children}</SvgContext.Provider>
    );
};

export const useSvgContext = () => {
    const context = useContext(SvgContext);
    if (!context) {
        throw new Error('SvgContext: context is undefined');
    }
    return context;
};
