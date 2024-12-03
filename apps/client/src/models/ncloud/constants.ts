import { nanoid } from 'nanoid';

export const SERVER_OS_IMAGES = [
    { code: '19463675', name: 'rokcy-8.8-base', hyperVisor: 'KVM' },
    { code: '25624115', name: 'rocky-8.10-base', hyperVisor: 'XEN' },
    { code: '23221307', name: 'win-2022-en', hyperVisor: 'KVM' },
    { code: '23214590', name: 'ubuntu-22.04', hyperVisor: 'KVM' },
];

export const SERVER_IMAGE_SPEC_CODE: {
    [key: string]: { code: string; info: string }[];
} = {
    '25624115': [
        { code: 'c2-g2-s50', info: 'vCPU 2EA, Memory 4GB, [SSD]Disk 50GB' },
        { code: 'c4-g2-s50', info: 'vCPU 4EA, Memory 8GB, [SSD]Disk 50GB' },
        { code: 'c8-g2-s50', info: 'vCPU 8EA, Memory 16GB, [SSD]Disk 50GB' },
        { code: 'c16-g2-s50', info: 'vCPU 16EA, Memory 32GB, [SSD]Disk 50GB' },
        { code: 'c32-g2-s50', info: 'vCPU 32EA, Memory 64GB, [SSD]Disk 50GB' },
        { code: 'c2-g2-h50', info: 'vCPU 2EA, Memory 4GB, Disk 50GB' },
        { code: 'c4-g2-h50', info: 'vCPU 4EA, Memory 8GB, Disk 50GB' },
        { code: 'c8-g2-h50', info: 'vCPU 8EA, Memory 16GB, Disk 50GB' },
        { code: 'c16-g2-h50', info: 'vCPU 16EA, Memory 32GB, Disk 50GB' },
        { code: 'c32-g2-h50', info: 'vCPU 32EA, Memory 64GB, Disk 50GB' },
    ],
    '19463675': [
        { code: 'ci2-g3', info: 'vCPU 2EA, Memory 4GB' },
        { code: 'ci4-g3', info: 'vCPU 4EA, Memory 8GB' },
        { code: 'ci8-g3', info: 'vCPU 8EA, Memory 16GB' },
        { code: 'ci16-g3', info: 'vCPU 16EA, Memory 32GB' },
        { code: 'ci32-g3', info: 'vCPU 32EA, Memory 64GB' },
        { code: 'ci48-g3', info: 'vCPU 48EA, Memory 96GB' },
        { code: 'ci64-g3', info: 'vCPU 64EA, Memory 128GB' },
    ],
    '23221307': [
        { code: 'ci2-g3', info: 'vCPU 2EA, Memory 4GB' },
        { code: 'ci4-g3', info: 'vCPU 4EA, Memory 8GB' },
        { code: 'ci8-g3', info: 'vCPU 8EA, Memory 16GB' },
        { code: 'ci16-g3', info: 'vCPU 16EA, Memory 32GB' },
        { code: 'ci32-g3', info: 'vCPU 32EA, Memory 64GB' },
        { code: 'ci48-g3', info: 'vCPU 48EA, Memory 96GB' },
        { code: 'ci64-g3', info: 'vCPU 64EA, Memory 128GB' },
    ],
    '23214590': [
        { code: 'ci2-g3', info: 'vCPU 2EA, Memory 4GB' },
        { code: 'ci4-g3', info: 'vCPU 4EA, Memory 8GB' },
        { code: 'ci8-g3', info: 'vCPU 8EA, Memory 16GB' },
        { code: 'ci16-g3', info: 'vCPU 16EA, Memory 32GB' },
        { code: 'ci32-g3', info: 'vCPU 32EA, Memory 64GB' },
        { code: 'ci48-g3', info: 'vCPU 48EA, Memory 96GB' },
        { code: 'ci64-g3', info: 'vCPU 64EA, Memory 128GB' },
    ],
};

const krRegionId = `kr-region-unique`;
const jpRegionId = `jp-region-unique`;
const sgRegionId = `sg-region-unique`;
export const REGIONS: { [key: string]: any } = {
    KR: {
        id: krRegionId,
        value: 'KR',
        label: 'Korea',
    },
    JP: {
        id: jpRegionId,
        value: 'JP',
        label: 'Japan',
    },
    SG: {
        id: sgRegionId,
        value: 'SG',
        label: 'Singapore',
    },
};

export const DEFAULT_REGION = 'KR';
