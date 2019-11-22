require('@testing-library/jest-dom/extend-expect')
const { RouterClient } = require('../src/lib/router.client.js')

describe('Router Client', () => {
  const ctx = { }

  const getState = () => ctx.client.state.slice(-1)[0]

  const getLocation = () => window.location.hash.split('#!').slice(-1)[0]

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
      name: 'Word',
      component: {
        name: 'word',
        template: '<word></word>'
      },
      path: '/word/:string'
    },
    {
      name: 'Number',
      component: {
        name: 'number',
        template: '<number></number>'
      },
      test: (data, transition) => {
        if (data.qargs.integer === 1337) {
          transition()
        } else {
          transition('not-found')
        }
      },
      path: '/number/:integer'
    }
  ]

  const routerComponent = {
    props: {
      routes,
      default: '/',
      fallback: '/not-found'
    },
    update() {
    }
  }

  beforeEach(() => {
    ctx.client = new RouterClient(routerComponent)
  })

  afterEach(() => {
    if (ctx.client.router.running) {
      ctx.client.router.stop()
    }
  })

  it('Should handle the default route as intended', (done) => {
    ctx.client.router.start()
    setTimeout(() => {
      expect(getLocation()).toEqual(routerComponent.props.default)
      done()
    }, 500)
  })

  it ('Should handle fallbacks as intended', (done) => {
    ctx.client.router.start()
    navigate('/hello-world')
    setTimeout(() => {
      expect(getLocation()).toEqual(routerComponent.props.fallback)
      done()
    }, 500)
  })

  it('Should handle wildcard fallback as intended', (done) => {
    const mockRoutes = [
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
        path: ['/not-found', '*']
      }
    ]

    const mockComponent = {
      props: {
        routes: mockRoutes,
        default: '/'
      },
      update() {
      }
    }

    ctx.client = new RouterClient(mockComponent)
    ctx.client.router.start()

    navigate('/hello-world')

    setTimeout(() => {
      expect(getState().source.name).toBe(mockRoutes[1].name)
      done()
    }, 500)
  })

  it('Should provide arguments and query arguments as expected', (done) => {
    ctx.client.router.start()
    navigate('/word/hello-world?foo=bar&bar=foo')
    setTimeout(() => {
      const state = getState()
      expect(state.args.string).toEqual('hello-world')
      expect(state.qargs.foo).toEqual('bar')
      expect(state.qargs.bar).toEqual('foo')
      done()
    }, 500)
  })
})
