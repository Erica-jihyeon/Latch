import '!css-loader!../src/App.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  backgrounds: {
    default: 'presentation',
    values: [
      {
        name: 'presentation',
        value: 'radial-gradient(circle, rgba(247,137,80,1) 0%, rgba(158,155,141,1) 59%, rgba(69,172,201,1) 100%);'
      }
    ]
  }
}