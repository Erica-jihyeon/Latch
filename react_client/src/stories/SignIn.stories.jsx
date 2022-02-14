import React from "react";

// import "SignIn.css";

import  SignIn  from "../components/SignIn";

export default {
  title: 'SignIn',
  component: SignIn,
};

const Template = (args) => <SignIn {...args} />;

export const Default = Template.bind({});
Default.args = {};