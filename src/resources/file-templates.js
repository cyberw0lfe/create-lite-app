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
`

module.exports = { indexHtml, indexJs, app, component, eslintrc }