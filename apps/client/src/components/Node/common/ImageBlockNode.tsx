import { useDimensionContext } from '@contexts/DimensionContext';
import { useColorScheme, useTheme } from '@mui/material';
import { calcIsoMatrixPoint, readFile } from '@utils';
import { DragEvent, useEffect, useState } from 'react';

type Props = {
    isInnerDropZone: boolean;
    imgSrc: string;
    onDrop: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDragOver: (e: DragEvent) => void;
};
const ImageBlock3D = ({
    isInnerDropZone,
    imgSrc,
    onDrop: handleDrop,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
}: Props) => {
    const matrix = calcIsoMatrixPoint({ x: 0, y: 0 });
    const theme = useTheme();
    return (
        <>
            <svg
                width="128"
                height="111"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="1.414"
            >
                <path fill="#b8b8bb" d="M64 74v37l64-37V37L64 74Z"></path>
                <path fill="#d2d2d4" d="M0 37v37l64 37V74L0 37Z"></path>
                <path
                    fill={
                        isInnerDropZone ? theme.palette.primary.main : '#ececed'
                    }
                    d="M0 37 64 0l64 37-64 37L0 37Z"
                ></path>
                <path
                    fill="#83838a"
                    d="m64 73.407 62.111-35.86.514.889-62.487 36.078h-.276L.743 38.072l.514-.89L64 73.407Z"
                ></path>
                <path fill="#83838a" d="M63.486 74h1.027v36h-1.027z"></path>
                <path
                    fill="#000000"
                    d="M128 37v37l-64 37L0 74V37L64 0l64 37ZM2.054 38.185v34.63L64 108.627l61.946-35.812v-34.63L64 2.373 2.054 38.185Z"
                ></path>
            </svg>
            <svg
                x="0"
                y="0"
                width="128"
                height="74"
                overflow="visible"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{ cursor: 'pointer' }}
            >
                <image
                    href={imgSrc}
                    x="37"
                    y="-37"
                    width="74"
                    height="74"
                    preserveAspectRatio="xMidYMid meet"
                    transform={matrix.toString()}
                />
            </svg>
        </>
    );
};

const ImageBlock2D = ({
    isInnerDropZone,
    imgSrc,
    onDrop: handleDrop,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
}: Props) => {
    const theme = useTheme();
    return (
        <svg
            width="90"
            height="90"
            overflow="visible"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <rect
                width="90"
                height="90"
                fill={
                    isInnerDropZone
                        ? theme.palette.primary.light
                        : 'transparent'
                }
            ></rect>
            <image
                href={imgSrc}
                x="0"
                y="0"
                width="90"
                height="90"
                preserveAspectRatio="xMidYMid meet"
            />
        </svg>
    );
};

export default () => {
    const { dimension } = useDimensionContext();
    const [imgSrc, setImgSrc] = useState<string>('/assets/upload.svg');
    const [isInnerDropZone, setIsInnerDropZone] = useState(false);

    const handleDrop = async (e: any) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            try {
                const src = await readFile(files[0]);
                setImgSrc(src);
            } catch (error) {
                console.error(error);
            }
        }
        setIsInnerDropZone(false);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsInnerDropZone(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsInnerDropZone(false);
    };
    return dimension === '2d' ? (
        <ImageBlock2D
            isInnerDropZone={isInnerDropZone}
            imgSrc={imgSrc}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        />
    ) : (
        <ImageBlock3D
            isInnerDropZone={isInnerDropZone}
            imgSrc={imgSrc}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        />
    );
};
