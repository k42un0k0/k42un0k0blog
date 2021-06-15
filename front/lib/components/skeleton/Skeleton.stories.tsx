import React from 'react';

import Skeleton from './Skeleton';
import type { Story, Meta } from '@storybook/react';
import type { ComponentProps } from 'react';

export default {
  title: 'internal/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ComponentProps<typeof Skeleton>> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  style: {
    height: 300,
    width: 300,
  },
};
