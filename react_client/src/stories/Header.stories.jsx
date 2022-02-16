import React from 'react';

import Test from '../components/Test';

export default {
  title: 'Header',
  component: Test,
};

const Template = (args) => <Test {...args} />;

export const Default = Template.bind({});
Default.args = {};