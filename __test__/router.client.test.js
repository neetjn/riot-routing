require('@testing-library/jest-dom/extend-expect')
const Router = require('../dist/router.dev')

describe('Router Client', () => {
  const navigate = route => {
    window.location.hash = `#!${route}`
    window.dispatchEvent(new Event('popstate'))
  }

  const randomNumber = Math.round(Math.random(1, 9999))

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
        if (data.qargs.integer === randomNumber) {
          transition()
        } else {
          transition('not-found')
        }
      },
      path: '/number/:integer'
    }
  ]


  const routerComponent = {
    opts: {
      routes,
      default: '/',
      fallback: '/not-found'
    },
    update() {
    }
  }

  const ctx = { }

  beforeEach(() => {
    ctx.router = new Router(routerComponent)
  })

  it('Should handle the default route as intended', () => {
    // TODO: left here, should we add push event listener or just check router pushes?
  })
})
