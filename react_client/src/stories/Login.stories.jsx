import React from "react";

// import "Login.css";

import  Login  from "../components/Login";

export default {
  title: 'Login',
  component: Login,
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {};