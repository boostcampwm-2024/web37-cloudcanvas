import { useEffect, useState } from 'react';

const keyMap = {
    space: ' ',
    enter: 'Enter',
    esc: 'Escape',
    backspace: 'Backspace',
    control: 'Control',
    shift: 'Shift',
};
export default (key: keyof typeof keyMap) => {
    const [activeKey, setActiveKey] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === keyMap[key]) {
                setActiveKey(true);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === keyMap[key]) {
                setActiveKey(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [key]);

    return activeKey;
};
