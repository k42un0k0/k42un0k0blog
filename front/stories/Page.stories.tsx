import React from 'react';

import * as HeaderStories from './Header.stories';
import { Page } from './Page';
import type { PageProps } from './Page';
import type { Story, Meta } from '@storybook/react';

export default {
  title: 'Example/Page',
  component: Page,
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
