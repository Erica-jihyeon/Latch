import React from "react";

// import "Login.css";

import  Home  from "../components/Home";

export default {
  title: 'Home',
  component: Home,
};

const Template = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {};