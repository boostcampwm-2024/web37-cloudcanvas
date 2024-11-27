export const isNcloudReference = (value: string): boolean => {
    const ncloudRefPattern = /^ncloud_[a-zA-Z_]+\.[a-zA-Z0-9_-]+\.[a-zA-Z_]+$/;
    return ncloudRefPattern.test(value);
};

export const isVariableReference = (value: string): boolean => {
    const varRefPattern = /^var\.[a-zA-Z_]+$/;
    return varRefPattern.test(value);
};

export const isProviderReference = (value: string): boolean => {
    const providerRefPattern = /^ncloud\.[a-zA-Z]+$/;
    return providerRefPattern.test(value);
};

export const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
        return `[${value.map((item) => formatValue(item)).join(', ')}]`;
    }

    if (typeof value === 'string') {
        if (
            isNcloudReference(value) ||
            isVariableReference(value) ||
            isProviderReference(value)
        ) {
            return value;
        }
        return `"${value}"`;
    }

    return String(value);
};

export const formatProperties = (
    properties: { [key: string]: any },
    indentLevel: number = 1,
): string => {
    const indent = '  '.repeat(indentLevel);
    const maxKeyLength = Math.max(
        ...Object.keys(properties).map((key) => key.length),
    );

    return Object.entries(properties)
        .map(([key, value]) => {
            const padding = ' '.repeat(maxKeyLength - key.length);

            if (
                typeof value === 'object' &&
                value !== null &&
                !Array.isArray(value)
            ) {
                return `${indent}${key} {
${formatProperties(value, indentLevel + 1)}
${indent}}`;
            }

            return `${indent}${key}${padding} = ${formatValue(value)}`;
        })
        .join('\n');
};
