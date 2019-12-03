# riot-routing

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fneetjn%2Friot-routing%2Fbadge&style=flat)](https://actions-badge.atrox.dev/neetjn/riot-routing/goto)
[![codecov](https://codecov.io/gh/neetjn/riot-routing/branch/master/graph/badge.svg)](https://codecov.io/gh/neetjn/riot-routing)
[![npm version](https://badge.fury.io/js/riot-routing.svg)](https://badge.fury.io/js/riot-routing)

[![NPM](https://nodei.co/npm/riot-routing.png)](https://nodei.co/npm/riot-routing/)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Lightweight Riot.js client sided router built on top of the [core-routing](https://github.com/neetjn/core-routing) project using the HTML 5 history api.

### Support

> Support is available for older browsers without the HTML 5 history api, however events may be dispatched irregularly and all features may not be available.

| Chome  | Edge | Firefox | Opera    | Safari |
|--------|------|---------|----------|--------|
| 5.0+ ✔ |  ✔   | 4.0+ ✔  | 11.50+ ✔ | 5.0+ ✔ |

### About

This project was created in wake of a redesign of the [riot-view-router](https://github.com/neetjn/riot-view-router) project. 

## Install

To install via NPM:
```sh
npm install riot-routing
```
For a quick start using jsdelivr:
```html
<script src="https://cdn.jsdelivr.net/npm/corriote-routing/dist/riot-routing.browser.js"></script>
```

### Use

The router at it's core is quite simple to use. The project exposes two Riot.js components that can be imported like so:

```js
import { Router, LinkTo } from 'riot-routing'

...

export default {
  components: {
    Router,
    LinkTo
  }
}
```

When referencing from a browser, a global definition `Router` will be exposed:

TBD

```html
<script src="https://cdn.jsdelivr.net/npm/riot-routing/dist/riot-routing.browser.js"></script>
<script>
  const router = new Router(...);
</script>
```

### Example

> The router component takes three props (`default` and `fallback` are optional):

```html
<root>
  <router default="/"
          fallback="/not-found"
          routes={routes}/>
  <script>
    import { Router, LinkTo } from 'riot-routing'

    import Home from './components/home.riot'
    import NotFound from './components/not-found.riot'
    import UserProfile from './components/user-profile.riot'

    const routes = [
      {
        component: Home.name,
        path: ['/', '/home']
      },
      {
        component: NotFound.name,
        path: '/not-found'
      },
      {
        componentName: 'user-profile',
        path: '/user/:userId',
        test(data, transition) {
          if (data.args.userId) {
            ...
          } else {
            transition('/not-found')
          }
        }
      }
    ]

    export default {
      components: {
        Home,
        NotFound,
        UserProfile
      },
      routes
    }
  </script>
</root>
```

## Development

Refer to the following npm commands to simplify your development workflow:

* **lint** - Lint core project and tests.
* **pretty** - Use prettier to clean/format core project.
* **test** - Run test suite.
* **build:component** - Compile router component for testing.
* **build** - Lint, compile, and test the project.

## Contributors

* **John Nolette** (john@neetgroup.net)

Contributing guidelines are as follows,

* Any new features or bug fixes must include either a test.
  * Branches for bugs and features should be structured like so, `issue-x-username`.
* Before putting in a pull request, be sure to verify you've built all your changes and your code adheres to the defined TS and JS style rules.
  * Use `npm run lint` to lint your code and `npm run pretty` to format.
* Include your name and email in the contributors list.

---

Copyright (c) 2019 John Nolette Licensed under the MIT license.
