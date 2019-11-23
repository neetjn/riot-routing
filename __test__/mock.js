const { template, expressionTypes } = require('@riotjs/dom-bindings')

const MockRoutes = [
  {
    name: 'Home',
    component: {
      name: 'home',
      template() {
        return template(`
          <home>
            <h1>Home</h1>
          </home>
        `)
      }
    },
    path: ['/', '/home']
  },
  {
    name: 'Not Found',
    component: {
      name: 'not-found',
      template() {
        return template(`
          <not-found>
            <h1>Not Found</h1>
          </not-found>
        `)
      }
    },
    path: '/not-found'
  },
  {
    name: 'Word',
    component: {
      name: 'word',
      template() {
        return template('<word><h1 expr0="expr0"> </h1></word>', [{
          'redundantAttribute': 'expr0',
          'selector': '[expr0]',
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,
            'evaluate': function(scope) {
              return ['Word: ', scope.props.data.args.string].join('')
            }
          }]
        }])
      }
    },
    path: '/word/:string'
  },
  {
    name: 'Number',
    component: {
      name: 'number',
      template: `
      <number>
        <h1>Number: {{ props.data.args.integer }}</h1>
      </number>
      `
    },
    test: (data, transition) => {
      if (parseInt(data.args.integer) === 1337) {
        transition()
      } else {
        transition('not-found')
      }
    },
    path: '/number/:integer'
  }
]

const MockRouterComponent = {
  props: {
    routes: MockRoutes,
    default: '/',
    fallback: '/not-found'
  },
  update() {
  }
}

const MockFallbackRoutes = [
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

const MockRouterFallbackComponent = {
  props: {
    routes: MockFallbackRoutes,
    default: '/'
  },
  update() {
  }
}

module.exports = {
  MockRoutes,
  MockRouterComponent,
  MockRouterFallbackComponent
}
