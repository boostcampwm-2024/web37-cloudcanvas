import { useDimensionContext } from '@contexts/DimensionContext';
import { Node } from '@types';

const Node3D = () => {
    return (
        <>
            <svg width="96" height="113.438">
                <g transform="translate(412.599 -86.957)">
                    <path
                        fill="#3c3c3c"
                        d="M-411.594 145.123v18.088l31.33 18.089h31.33l31.33-18.089v-18.088l-31.33-18.089h-31.33z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="#090909"
                        d="m-348.934 181.3 31.33-18.089V181.3l-31.33 18.088z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="#232323"
                        d="M-380.264 181.3h31.33v18.088h-31.33zm-31.33-18.089V181.3l31.33 18.088V181.3z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="none"
                        stroke="#000"
                        d="m-411.594 163.211 31.33 18.089h31.33l31.33-18.089m-62.66 18.089v18.088m31.33-18.088v18.088"
                        strokeWidth="1.005"
                    ></path>
                    <path
                        fill="none"
                        stroke="#000000"
                        d="M-411.594 145.123V181.3l31.33 18.088h31.33l31.33-18.088v-36.177l-31.33-18.089h-31.33z"
                        strokeWidth="2.01"
                    ></path>
                    <path
                        fill="#3c3c3c"
                        d="M-411.594 125.588v18.088l31.33 18.089h31.33l31.33-18.089v-18.088l-31.33-18.089h-31.33z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="#090909"
                        d="m-348.934 161.765 31.33-18.089v18.089l-31.33 18.088z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="#232323"
                        d="M-380.264 161.765h31.33v18.088h-31.33zm-31.33-18.089v18.089l31.33 18.088v-18.088z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="none"
                        stroke="#000"
                        d="m-411.594 143.676 31.33 18.089h31.33l31.33-18.089m-62.66 18.089v18.088m31.33-18.088v18.088"
                        strokeWidth="1.005"
                    ></path>
                    <path
                        fill="none"
                        stroke="#000000"
                        d="M-411.594 125.588v36.177l31.33 18.088h31.33l31.33-18.088v-36.177l-31.33-18.089h-31.33z"
                        strokeWidth="2.01"
                    ></path>
                    <path
                        fill="#3c3c3c"
                        d="M-411.594 106.05v18.09l31.33 18.088h31.33l31.33-18.089v-18.088l-31.33-18.089h-31.33z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="#090909"
                        d="m-348.934 142.228 31.33-18.089v18.089l-31.33 18.088z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="#232323"
                        d="M-380.264 142.228h31.33v18.088h-31.33zm-31.33-18.088v18.088l31.33 18.088v-18.088z"
                        fillRule="evenodd"
                    ></path>
                    <path
                        fill="none"
                        stroke="#000"
                        d="m-411.594 124.14 31.33 18.088h31.33l31.33-18.089m-62.66 18.089v18.088m31.33-18.088v18.088"
                        strokeWidth="1.005"
                    ></path>
                    <path
                        fill="none"
                        stroke="#000000"
                        d="M-411.594 106.05v36.178l31.33 18.088h31.33l31.33-18.088V106.05l-31.33-18.089h-31.33z"
                        strokeWidth="2.01"
                    ></path>
                    <circle
                        cx="-95.405"
                        cy="325.596"
                        r="21.926"
                        fill="#f4b934"
                        transform="scale(1.22475 .7071) rotate(45)"
                    ></circle>
                    <g>
                        <path
                            fill="#ffffff"
                            d="m-127.434 301.586-.302-.818q-.136-.375-.321-.512-.18-.136-.638-.136h-.545v-1.144h1.007q.887 0 1.364.375.482.375.813 1.26l2.23 5.94h-1.744l-1.085-2.862-1.144 2.862h-1.743z"
                            transform="matrix(3.51718 2.03071 -3.51718 2.03071 1146.824 -241.7)"
                            fontFamily="Droid Serif"
                            fontSize="9.971"
                        ></path>
                    </g>
                </g>
            </svg>
        </>
    );
};

const Node2D = () => {
    return (
        <svg width="90" height="90">
            <path fill="#ed8031" d="M0 0h90v90H0z"></path>
            <g fill="#ffffff">
                <path d="M72.6 75H57.816a1.2 1.2 0 0 1-1.08-.684L35.832 30.6h-8.844a1.2 1.2 0 0 1-1.2-1.2V16.2a1.2 1.2 0 0 1 1.2-1.2h18.48a1.2 1.2 0 0 1 1.08.684L67.356 59.4H72.6a1.2 1.2 0 0 1 1.2 1.2v13.2a1.2 1.2 0 0 1-1.2 1.2zm-14.028-2.4H71.4V61.8h-4.8a1.2 1.2 0 0 1-1.08-.684L44.712 17.4H28.2v10.8h8.4a1.2 1.2 0 0 1 1.08.684z"></path>
                <path d="M32.976 75h-15.6a1.2 1.2 0 0 1-1.02-.564 1.2 1.2 0 0 1-.06-1.2l16.32-34.092a1.2 1.2 0 0 1 1.08-.684 1.2 1.2 0 0 1 1.08.672L42.588 55.2a1.2 1.2 0 0 1 0 1.044l-8.52 18a1.2 1.2 0 0 1-1.092.756zm-13.68-2.4H32.22l7.956-16.8-6.468-13.38z"></path>
            </g>
        </svg>
    );
};
export default ({}: Partial<Node>) => {
    const { dimension } = useDimensionContext();
    return dimension === '2d' ? <Node2D /> : <Node3D />;
};
