import type { Preview } from '@storybook/react';
import React from 'react';
import Graph from '../src/components/Graph';
import GridBackground from '../src/components/GridBackground';

const preview: Preview = {
    parameters: {},
    decorators: [
        (Story) => (
            <Graph>
                <GridBackground />
                <Story />
            </Graph>
        ),
    ],
};

export default preview;
