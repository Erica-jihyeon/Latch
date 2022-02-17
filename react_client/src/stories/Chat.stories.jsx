import React from "react";

// import "Login.css";

import  Chat  from "../components/Chat";

export default {
  title: 'Chat',
  component: Chat,
};

const Template = (args) => <Chat {...args} />;

export const Default = Template.bind({});
Default.args = {};