import Skeleton from './Skeleton';
import type { Story, Meta } from '@storybook/react';
import type { ComponentProps } from 'react';

export default {
  title: 'internal/Skeleton',
  component: Skeleton,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof Skeleton>> = (args) => <Skeleton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  style: {
    height: 300,
    width: 300,
  },
};
