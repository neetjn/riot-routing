require('@testing-library/jest-dom/extend-expect')
import { component, register } from 'riot'
import { install } from '../dist/riot-routing'
const { MockRootComponent, MockRoutes } = require('./mock')

describe('Router Component', () => {

  const getLocation = () => window.location.hash.split('#!').slice(-1)[0]

  const navigate = route => {
    window.location.hash = `#!${route}`
    window.dispatchEvent(new Event('popstate'))
  }

  const ctx = { }

  install(register)

  const HomeComponent = MockRoutes[0].component
  const NotFoundComponent = MockRoutes[1].component
  const WordComponent = MockRoutes[2].component

  register(HomeComponent.name, HomeComponent)
  register(NotFoundComponent.name, NotFoundComponent)
  register(WordComponent.name, WordComponent)

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app" />
    `
    const Root = component(MockRootComponent)
    ctx.root = Root(document.querySelector('#app'))
  })

  afterEach(() => {
    ctx.root.unmount()
  })

  it('Default route should render', done => {
    setTimeout(() => {
      console.log(document.body.innerHTML)
      const h1 = document.querySelector('router > slot > home > h1')
      expect(h1)
        .not.toBeNull()
      expect(h1.textContent)
        .toEqual('Home')
      done()
    }, 500)
  })

  it('Fallback route should render', done => {
    navigate('/hello-world')
    setTimeout(() => {
      expect(getLocation())
        .toEqual('/not-found')
      const h1 = document.querySelector('router > slot > not-found > h1')
      expect(h1)
        .not.toBeNull()
      expect(h1.textContent)
        .toEqual('Not Found')
      done()
    }, 500)
  })

  it('Should provide arguments as expected', done => {
    navigate('/word/hello')
    setTimeout(() => {
      const h1 = document.querySelector('router > slot > word > h1')
      expect(h1)
        .not.toBeNull()
      expect(h1.textContent)
        .toBe('Word: hello')
      done()
    })
  })
})
