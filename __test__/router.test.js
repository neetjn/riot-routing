require('@testing-library/jest-dom/extend-expect')
const { MockRoutes } = require('./mock')
import { component, register } from 'riot'
import RouterComponent from '../build/router'

describe('Router Component', () => {

  const ctx = { }

  const HomeComponent = MockRoutes[0].component
  const NotFoundComponent = MockRoutes[1].component
  const WordComponent = MockRoutes[2].component

  register(HomeComponent.name, HomeComponent)
  register(NotFoundComponent.name, NotFoundComponent)
  register(WordComponent.name, WordComponent)
  register(RouterComponent.name, RouterComponent)

  const RootComponent = {
    name: 'root',
    template(template, expressionTypes, bindingTypes, getComponent) {
      return template('<router expr0="expr0" default fallback="/"></router>', [
        {
          'type': bindingTypes.TAG,
          'getComponent': getComponent,
          'evaluate': function() {
            return 'router'
          },
          'slots': [],
          'attributes': [
            {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'routes',
              'evaluate': function(scope) {
                return scope.routes
              }
            },
            {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'default',
              'evaluate': function() {
                return '/'
              }
            },
            {
            'type': expressionTypes.ATTRIBUTE,
              'name': 'fallback',
              'evaluate': function() {
                return '/not-found'
              }
            }
          ],
          'redundantAttribute': 'expr0',
          'selector': '[expr0]'
        }
      ])
    },
    exports: {
      routes: [...MockRoutes.slice(0, 3)]
    }
  }

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app" />
    `
    const Root = component(RootComponent)
    ctx.root = Root(document.querySelector('#app'))
  })

  afterEach(() => {
    // ctx.root.unmount()
  })

  it('Default route should render', (done) => {
    setTimeout(() => {
      done()
    }, 1500)
    // const Component = component(MockRouterComponent)
  })
})
