const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="index.js"></script>
  </body>
</html>
`

const indexJs = `import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// eslint-disable-next-line
ReactDOM.render(<App />, document.getElementById('root'))
`

const app = `import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Component from './components/Component'

export default () => (
  <BrowserRouter>
    <Route exact path='/' component={Component} />
  </BrowserRouter>
)
`

const component = `import React from 'react'

export default () => (
  <div>
    Create Lite App
  </div>
)
`

const eslintrc = `---
root: true
extends:
  - airbnb
plugins:
  - html
rules:
  semi:
    - error
    - never
  jsx-quotes: 
    - error
    - prefer-single
  arrow-body-style:
    - error
    - as-needed
  indent:
    - error
    - 2
`

const readme = `# About
\`create-lite-app\` generates a lightweight React app that has basic routing (react-router), linting (eslint) and bundling (parceljs) configured by default. The base dependencies are installed in the initialization process so all scripts should be ready run immediately.

# Getting Started
## Running Locally
Parcel runs the app at http://localhost:1234 by default
\`\`\`
npm run start
\`\`\`

## Linting
eslint is configured to extend \`airbnb\` with the following customizations:
- Rules
  - semicolons: never
  - jsx-quotes: prefer single quotes
  - arrow-body-style: enforces no braces where they can be omitted
  - indent: enforce 2 space indent
- Plugins
  - html
### Locally
Run eslint locally and see the results in the console
\`\`\`
npm run lint
\`\`\`

### Fix
Run eslint locally and fix errors if possible
\`\`\`
npm run lint:fix
\`\`\`
`

module.exports = { indexHtml, indexJs, app, component, eslintrc, readme }