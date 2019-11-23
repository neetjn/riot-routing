require('@testing-library/jest-dom/extend-expect')
const { RouterClient } = require('../src/lib/router.client')
const { MockRouterComponent, MockRouterFallbackComponent } = require('./mock')

describe('Router Client', () => {
  const ctx = { }

  const getLocation = () => window.location.hash.split('#!').slice(-1)[0]

  const navigate = route => {
    window.location.hash = `#!${route}`
    window.dispatchEvent(new Event('popstate'))
  }

  beforeEach(() => {
    ctx.client = RouterClient(MockRouterComponent)
  })

  afterEach(() => {
    if (ctx.client.router.running) {
      ctx.client.router.stop()
    }
  })

  it('Should handle the default route as intended', done => {
    ctx.client.router.start()
    setTimeout(() => {
      expect(getLocation())
        .toEqual(MockRouterComponent.props.default)
      done()
    }, 500)
  })

  it ('Should handle fallbacks as intended', done => {
    ctx.client.router.start()
    navigate('/hello-world')
    setTimeout(() => {
      expect(getLocation())
        .toEqual(MockRouterComponent.props.fallback)
      done()
    }, 500)
  })

  it('Should handle wildcard fallback as intended', done => {
    ctx.client = RouterClient(MockRouterFallbackComponent)
    ctx.client.router.start()
    navigate('/hello-world')
    setTimeout(() => {
      expect(ctx.client.state.source.name)
        .toBe(MockRouterFallbackComponent.props.routes[1].name)
      done()
    }, 500)
  })

  it('Should provide arguments and query arguments as expected', done => {
    ctx.client.router.start()
    navigate('/word/hello-world?foo=bar&bar=foo')
    setTimeout(() => {
      const state = ctx.client.state
      expect(state.args.string)
        .toEqual('hello-world')
      expect(state.qargs.foo)
        .toEqual('bar')
      expect(state.qargs.bar)
        .toEqual('foo')
      done()
    }, 500)
  })

  it ('Should properly handle route tests', done => {
    ctx.client.router.start()
    navigate('/number/5')
    setTimeout(() => {
      expect(getLocation())
        .toEqual('/not-found')
      navigate('/number/1337')
      setTimeout(() => {
        expect(getLocation())
          .toEqual('/number/1337')
        done()
      })
    }, 500)
  })
})
