import { useDimensionContext } from '@contexts/DimensionContext';
import { Node } from '@types';

const Node3D = () => {
    return (
        <svg width="128" height="137.5">
            <path
                fill="#a4c5ec"
                d="m.459 45.817.288 54.364 62.724 36.215-.288-54.364-15.681-27.161L16.14 36.764.459 45.817Z"
            ></path>
            <path
                fill="#79aae4"
                d="m79.079 54.954 31.326-18.087 15.501 8.95.216 54.405-62.651 36.173-.216-54.405L79.08 54.954Z"
            ></path>
            <path
                fill="#cee0f5"
                d="M16.14 36.763 47.502 54.87l31.506.125 31.326-18.087-.18-18.211L78.791.59 47.609.694 16.284 18.781l-.144 17.982Z"
            ></path>
            <path
                fill="#cee0f5"
                d="m48.294 54.829 31.506.125L63.975 81.99 48.294 54.829Z"
            ></path>
            <path
                fill="#a4c5ec"
                d="m16.644 18.157-.18 18.003L.819 45.193l15.825-27.036Zm93.581 17.982.18-18.003 15.681 27.161-15.861-9.158Z"
            ></path>
            <path
                fill="none"
                stroke="#2a75cd"
                d="m48.006 54.996 31.182-.104-15.501 27.265-15.681-27.161ZM.459 45.817l.288 54.364 62.724 36.215-.288-54.364-15.681-27.161L16.14 36.764.459 45.817Zm78.765 9.054 31.326-18.087 15.861 9.158-.108 54.176-62.832 36.277.288-54.28 15.465-27.244Z"
                strokeLinejoin="round"
            ></path>
            <path
                fill="none"
                stroke="#2a75cd"
                d="M16.14 36.763 47.502 54.87l31.506.125 31.326-18.087-.18-18.211L78.791.59 47.609.694 16.284 18.781l-.144 17.982Z"
                strokeLinejoin="round"
            ></path>
            <path
                fill="none"
                stroke="#000000"
                d="m1.468 100.181-.324-54.343 15.825-27.036L48.294.715 79.44.632l31.362 18.107 15.717 27.14-.144 54.197-62.543 36.111-62.364-36.006Z"
                strokeWidth="2"
            ></path>
            <path
                fill="#0078d4"
                d="M85.421 14.699C76.374 9.476 66.066 7.09 62.797 8.978L32.646 26.386c-3.269 1.888.227 8.311 9.183 13.481 8.956 5.171 19.808 7.241 23.168 5.302l30.151-17.408c3.361-1.835-.772-7.891-9.728-13.062Zm-2.361 1.363c6.398 3.694 9.972 7.645 8.065 8.746s-8.751-.963-15.148-4.656-9.972-7.645-8.064-8.746c1.997-1.154 8.751.962 15.148 4.656ZM59.005 31.956l-3.29-1.899 5.358-3.094-5.734 1.199c-1.547.365-2.641.153-3.829-.533s-1.556-1.423-1.014-2.264l2.169-3.362-5.358 3.093-3.016-1.741 8.355-4.824c.999-.577 1.909-.786 3.095-.52.575.187 1.124.399 1.643.634 1.075.624 1.403 1.557.833 2.368l-2.892 4.413 7.735-1.617c1.405-.329 3.021-.14 4.102.481a4.4 4.4 0 0 1 1.098.949c.572.659.316 1.454-.627 1.945l-1.18.681-.092-.158-7.356 4.247Zm11.788 6.701c-1.816 1.049-4.552.518-6.471-.485l-6.489-3.746 2.361-1.363 6.488 3.746c.366.211 1.275-.208 1.275-.208l-1.552-.476-2.467-1.425c-2.193-1.266-2.474-2.687-1.204-3.526l4.087-2.359-.369-.947 4.753 2.744-4.45 2.569c-.091.052 0 .105.366.316l3.198 1.847 4.541-2.622 3.29 1.899-7.357 4.037Z"
            ></path>
        </svg>
    );
};

const Node2D = () => {
    return (
        <>
            <svg width="90" height="90">
                <defs>
                    <linearGradient
                        id="sql"
                        x1="2.59"
                        x2="15.41"
                        y1="10.16"
                        y2="10.16"
                        gradientTransform="translate(-2.647 -2.647) scale(5.29412)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#005ba1"></stop>
                        <stop offset=".07" stopColor="#0060a9"></stop>
                        <stop offset=".36" stopColor="#0071c8"></stop>
                        <stop offset=".52" stopColor="#0078d4"></stop>
                        <stop offset=".64" stopColor="#0074cd"></stop>
                        <stop offset=".82" stopColor="#006abb"></stop>
                        <stop offset="1" stopColor="#005ba1"></stop>
                    </linearGradient>
                </defs>
                <path
                    fill="url(#sql)"
                    d="M45 24.565c-18.741 0-33.935-5.294-33.935-12.283v65.436c0 6.723 14.929 12.176 33.458 12.282H45c18.741 0 33.935-5.294 33.935-12.282V12.282c0 6.83-15.194 12.283-33.935 12.283z"
                ></path>
                <path
                    fill="#e8e8e8"
                    d="M78.935 12.282c0 6.83-15.194 12.283-33.935 12.283S11.065 19.27 11.065 12.282C11.065 5.294 26.259 0 45 0s33.935 5.294 33.935 12.282"
                ></path>
                <path
                    fill="#50e6ff"
                    d="M71.047 11.276c0 4.342-11.7 7.836-26.047 7.836-14.347 0-26.047-3.494-26.047-7.836 0-4.34 11.7-7.782 26.047-7.782 14.347 0 26.047 3.494 26.047 7.782"
                ></path>
                <path
                    fill="#198ab3"
                    d="M45 13.235a61.147 61.147 0 0 0-20.594 3.018A60.459 60.459 0 0 0 45 19.112a59.03 59.03 0 0 0 20.594-3.07A62.682 62.682 0 0 0 45 13.234Z"
                ></path>
                <path
                    fill="#f2f2f2"
                    d="M64.27 45v8.63h-5.294a2.065 2.065 0 0 1-1.535-.742V45h-7.147v9.424a4.87 4.87 0 0 0 5.294 4.711h7.888l1.377-.688s-.583 2.17-1.377 2.277h-12.6v5.294H64.96a6.406 6.406 0 0 0 6.511-6.724V45Zm-16.464 0v-2.594a3.706 3.706 0 0 0-2.541-4.077 9.212 9.212 0 0 0-2.648-.423 4.976 4.976 0 0 0-4.817 3.07l-4.13 10.06-5.294-10.06a4.924 4.924 0 0 0-4.553-3.07 7.624 7.624 0 0 0-2.7.476c-1.853.583-2.276 1.8-2.276 3.865v17.524h6.194V47.965l3.335 8.311a5.718 5.718 0 0 0 5.294 3.495c2.33 0 3.283-1.377 4.236-3.495l3.547-7.994v11.383H47.7V45Z"
                ></path>
            </svg>
        </>
    );
};
export default ({}: Partial<Node>) => {
    const { dimension } = useDimensionContext();
    return dimension === '2d' ? <Node2D /> : <Node3D />;
};