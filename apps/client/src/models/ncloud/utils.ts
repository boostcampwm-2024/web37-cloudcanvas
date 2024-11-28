export const transformObject = (obj: any) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            if (
                typeof value === 'object' &&
                value !== null &&
                'value' in value
            ) {
                return [key, value.value];
            }
            return [key, value];
        }),
    );
};

export const validateObject = (
    obj: any,
    requiredFields: Record<string, boolean>,
) => {
    return Object.entries(requiredFields).every(([key, isRequired]) => {
        if (!isRequired) {
            return true;
        }

        const value = obj[key];
        if (typeof value === 'object' && value !== null && 'value' in value) {
            return Boolean(value.value);
        }
        return Boolean(value);
    });
};
