require('@testing-library/jest-dom/extend-expect')
const Router = require('../dist/router.dev')

describe('Router Client', () => {
  const navigate = route => {
    window.location.hash = `#!${route}`
    window.dispatchEvent(new Event('popstate'))
  }

  const routes = [
    {
      name: 'Home',
      component: {
        name: 'home',
        template: '<home></home>'
      },
      path: ['/', '/home']
    },
    {
      name: 'Not Found',
      component: {
        name: 'not-found',
        template: '<not-found></not-found>'
      },
      path: '/not-found'
    },
    {
      name: 'Number',
      component: {
        name: 'number',
        template: '<number></number>'
      },
      test: (data, transition) => {
        // TODO: left here
      },
      path: '/number/:integer'
    }
  ]
})
