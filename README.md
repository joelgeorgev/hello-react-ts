# React TypeScript Setup Guide

[![Build Status](https://travis-ci.org/joelgeorgev/react-ts-setup-guide.svg?branch=master)](https://travis-ci.org/joelgeorgev/react-ts-setup-guide)

> Step by step guide to setup a React app written in TypeScript.

Check out the app [here](https://joelgeorgev.github.io/react-ts-setup-guide).

## Add .gitattributes

From project root, run:

```bash
$ touch .gitattributes
```

Paste below code snippet inside .gitattributes to configure line endings for the repository. 

```
* text=auto
*.js text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
```

For an explanation of above code and why it is recommended to configure line endings, read [here](https://help.github.com/articles/dealing-with-line-endings/).

## Add .gitignore

From project root, run:

```bash
$ touch .gitignore
```

Paste below code snippet inside .gitignore to prevent version tracking for node_modules and dist folders. 

```
/node_modules
/dist
```

## Initialize package.json

From project root, run:

```bash
$ npm init
```

## Add index.html and index.js

### index.html

From project root, run:

```bash
$ mkdir template
$ cd template/
$ touch index.html
```

Paste below code snippet in index.html.

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>React TypeScript Setup Guide</title>
</head>

<body>
    <div id="root"></div>
</body>

</html>
```

### index.js

From project root, run:

```bash
$ mkdir src
$ cd src/
$ touch index.js
```

Paste below code snippet in index.js.

```js
console.log('It works!');
```

## Install and configure Webpack

### Install dependencies

```bash
$ npm i webpack webpack-dev-server html-webpack-plugin clean-webpack-plugin path --save-dev
```

### Configure Webpack

From project root, run:

```bash
$ touch webpack.config.js
```

Paste below code snippet in webpack.config.js.

```js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './template/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
```

### Add start and build scripts in package.json

```json
{
    "scripts": {
        "start": "webpack-dev-server",
        "build": "webpack"
    }
}
```

### Test the Webpack configuration

```bash
$ npm start
```

Open localhost:8080 and check if 'It works!' is displayed in the console. If yes, our webpack setup is working. :-)

## Setup TypeScript

### Install dependencies

```bash
$ npm i typescript ts-loader --save-dev
```

### Configure TypeScript compiler

From project root, run:

```bash
$ touch tsconfig.json
```

Paste below code snippet in tsconfig.json.

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react",
        "allowJs": true
    }
}
```

Rename index.js to index.ts.

### Integrate TypeScript with Webpack

Update/add below properties in webpack.config.js.

```js
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
```

## Setup React

### Install dependencies

```bash
$ npm i react react-dom --save
$ npm i @types/react @types/react-dom --save-dev
```

### Add App.tsx in src folder

From project root, run:

```bash
$ cd src/
$ touch App.tsx
```

Paste below code snippet in App.tsx.

```tsx
import * as React from 'react';

export class App extends React.PureComponent<{}, {}> {
    render() {
        return (<div>React TS</div>);
    }
}
```

### Rename index.ts to index.tsx and update content

Paste below code snippet in index.tsx.

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### Update entry point in webpack.config.js to point to index.tsx.

## Setup Testing using Jest

### Install dependencies

```bash
$ npm i jest @types/jest ts-jest --save-dev
```

### Setup Jest

Paste below code snippet in package.json.

```json
{
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
}
```

Add test script in package.json.

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

### Add App.test.tsx in src folder

From project root, run:

```bash
$ cd src/
$ touch App.test.tsx
```

Paste below code snippet in App.test.tsx.

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

it('smoke test', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
```

## Setup linting using TSLint

### Install and setup TSLint

```bash
$ npm i tslint -g
```

From project root, run:

```bash
$ npm i tslint --save-dev
$ tslint --init
```

### Add lint script in package.json

```json
{
    "scripts": {
        "lint": "tslint -c tslint.json './src/**/*.ts*'"
    }
}
```

## Deploy to GitHub Pages

### Install gh-pages

```bash
$ npm i gh-pages --save-dev
```

### Add deploy scripts and update homepage in package.json

```json
{
    "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
    },
    "homepage": "https://joelgeorgev.github.io/react-ts-setup-guide"
}
```

### Publish

```bash
$ npm run deploy
```

## License
MIT