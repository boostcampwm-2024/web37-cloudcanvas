export const CloudCanvasIcon = ({ width = 40 }: { width?: number }) => {
    return (
        <svg width={width} viewBox="-1000 -1000 2000 2000">
            <defs>
                <line
                    id="vertical-line"
                    x1={-500}
                    y1={-100}
                    x2={-500}
                    y2={500}
                    width={10}
                    stroke="black"
                    strokeWidth={50}
                />
                <line
                    id="horizontal-line"
                    x1={-500}
                    y1={0}
                    x2={500}
                    y2={0}
                    width={10}
                    stroke="black"
                    strokeWidth={50}
                />
            </defs>
            <rect
                x={-1000}
                y={-1000}
                width={2000}
                height={2000}
                rx={200}
                fill="#def"
            />
            <rect
                x={-800}
                y={-800}
                width={1600}
                height={1600}
                fill="none"
                stroke="black"
                strokeWidth={100}
                rx={150}
            />
            <use href="#vertical-line" />
            <use href="#vertical-line" transform="translate(250)" />
            <use href="#vertical-line" transform="translate(500)" />
            <use href="#vertical-line" transform="translate(750)" />
            <use href="#vertical-line" transform="translate(1000)" />
            <use href="#horizontal-line" transform="translate(0, 250)" />
            <use href="#horizontal-line" transform="translate(0, 500)" />
            <circle cx={-500} cy={500} r={75} fill="black" />
            <circle cx={500} cy={500} r={85} fill="black" />
            <circle cx={-500} cy={250} r={60} fill="black" />
            <circle cx={0} cy={500} r={60} fill="black" />
            <g>
                <path
                    d="M -600 0 L 600 0 A 1 1 0 1 0 450 -550 A 330 330 0 0 0 -200 -600 A 250 250 0 0 0 -600 -400 A 1 1 0 0 0 -600 0 Z"
                    fill="white"
                    stroke="white"
                    strokeWidth={250}
                />
                <path
                    d="M -600 0 L 600 0 A 1 1 0 1 0 450 -550 A 330 330 0 0 0 -200 -600 A 250 250 0 0 0 -600 -400 A 1 1 0 0 0 -600 0 Z"
                    fill="none"
                    stroke="black"
                    strokeWidth={100}
                    strokeLinejoin="round"
                />
            </g>
            <g transform="translate(220,-610)">
                <polygon
                    points="0,0 -120,200 -120,800 120,800 120,200"
                    fill="#eee"
                    stroke="#eee"
                    strokeWidth={100}
                    strokeLinejoin="round"
                />
                <polygon
                    points="0,0 -120,200 -120,800 120,800 120,200"
                    fill="white"
                    stroke="white"
                    strokeWidth={30}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    rx={500}
                />
                <path
                    d="M 0 0 l -45 75 q 45 20 90 0 L 0 0"
                    fill="black"
                    stroke="black"
                    strokeWidth={30}
                    strokeLinecap="round"
                />
                <path
                    d="M -135 200 l 0 600 q 0 15 15 15 l 75 0 0 -635 q -50 60 -90 20"
                    fill="#5af"
                />
                <path
                    d="M -45 180 l 0 635 90 0 0 -635 c -45 60 -45 60 -90 0"
                    fill="#4bf"
                />
                <path
                    d="M 135 200 l 0 600 q 0 15 -15 15 l -75 0 0 -635 q 50 60 90 20"
                    fill="#4aa"
                />
                <rect x={-135} y={700} width={270} height={50} fill="#c7a" />
            </g>
        </svg>
    );
};
