require('@testing-library/jest-dom/extend-expect')
const { MockRoutes } = require('./mock')
const Router = require('../build/router')

import * as riot from 'riot'
import { template, expressionTypes, bindingTypes, getComponent } from '@riotjs/dom-bindings'

describe('Router Component', () => {

  const ctx = { }

  const HomeComponent = riot.component(MockRoutes[0].component)
  const NotFoundComponent = riot.component(MockRoutes[1].component)
  const WordComponent = riot.component(MockRoutes[2].component)

  const RootComponent = {
    name: 'root',
    template() {
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
      HomeComponent,
      NotFoundComponent,
      WordComponent,
      Router,
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
