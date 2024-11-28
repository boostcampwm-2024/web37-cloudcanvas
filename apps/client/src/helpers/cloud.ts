import { getSvgPoint } from '@utils';

export const getInitPoint = (svg: SVGSVGElement) => {
    const svgRect = svg.getBoundingClientRect();

    const leftCenterSvg = getSvgPoint(svg, {
        x: svgRect.left,
        y: svgRect.top,
    });

    return {
        x: leftCenterSvg.x + 200,
        y: svgRect.height / 3,
    };
};
