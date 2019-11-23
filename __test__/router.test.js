require('@testing-library/jest-dom/extend-expect')
const { MockRoutes } = require('./mock')

import * as riot from 'riot'

describe('Router Component', () => {

  const ctx = { }

  const HomeComponent = riot.component(MockRoutes[0].component)
  const NotFoundComponent = riot.component(MockRoutes[1].component)
  const WordComponent = riot.component(MockRoutes[2].component)

  const RootComponent = {
    name: 'root',
    template: `
    <root>
      <router routes={routes}
              default='/'
              fallback='/' />
    </root>
    `,
    exports: {
      HomeComponent,
      NotFoundComponent,
      WordComponent,
      routes: [...MockRoutes.slice(0, 3)]
    }
  }

  beforeEach(() => {
    document.body.innerHTML = `
      <root />
    `
    ctx.root = riot.component(RootComponent)(document.querySelector('root'))
  })

  afterEach(() => {
    ctx.root.unmount()
  })

  it('', (done) => {
    setTimeout(() => {
      console.log(document.body.innerHTML)
      done()
    }, 500)
    // const Component = riot.component(MockRouterComponent)
  })
})
