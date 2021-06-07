import React from 'react';

import Skelton from './Skelton';
import type { Story, Meta } from '@storybook/react';
import type { ComponentProps } from 'react';

export default {
  title: 'internal/Skelton',
  component: Skelton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ComponentProps<typeof Skelton>> = (args) => <Skelton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  style: {
    height: 300,
    width: 300,
  },
};
