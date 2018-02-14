# React TypeScript Setup Guide

[![Build Status](https://travis-ci.org/joelgeorgev/react-ts-setup-guide.svg?branch=master)](https://travis-ci.org/joelgeorgev/react-ts-setup-guide)

> Step by step guide to setup a React app written in TypeScript.

Check out the app [here](https://joelgeorgev.github.io/react-ts-setup-guide).

## Add .gitattributes

At project root, create **.gitattributes** file with below content, to configure line endings for the repository: 

```
* text=auto
*.js text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
```

*Refer [here](https://help.github.com/articles/dealing-with-line-endings/) for an explanation of above code and why it is recommended to configure line endings.* 

## Add .gitignore

At project root, create **.gitignore** file with below content, to prevent version tracking for node_modules and dist folders: 

```
/node_modules
/dist
```

## Initialize package.json

At project root, run:

```bash
$ npm init
```

## Add index.html and index.js

### index.html

At project root, run:

```bash
$ mkdir template
$ cd template/
$ touch index.html
```

Paste below code snippet in **index.html**.

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

At project root, run:

```bash
$ mkdir src
$ cd src/
$ touch index.js
```

Paste below code snippet in **index.js**.

```js
console.log('It works!');
```

## Install and configure webpack

### Install dependencies

```bash
$ npm i webpack webpack-dev-server html-webpack-plugin clean-webpack-plugin path --save-dev
```

### Configure webpack

At project root, create **webpack.config.js** file with below content:

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

*[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) - Simplifies creation of HTML files to serve your webpack bundles*

*[CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin) - A webpack plugin to remove your build folder(s) before building*

### Add start and build scripts in package.json

```json
{
    "scripts": {
        "start": "webpack-dev-server",
        "build": "webpack"
    }
}
```

### Test webpack configuration

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

At project root, create **tsconfig.json** file with below content:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

*Refer [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for the complete set of TypeScript compiler options along with their description.*

Rename **index.js** to **index.ts**.

### Integrate TypeScript with webpack

Update/add below properties in **webpack.config.js**.

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

*Refer [here](https://webpack.js.org/guides/typescript/) for the official webpack guide on integrating TypeScript.*

## Setup React

### Install dependencies

```bash
$ npm i react react-dom --save
$ npm i @types/react @types/react-dom --save-dev
```

### Add App.tsx in src folder

At project root, run:

```bash
$ cd src/
$ touch App.tsx
```

Paste below code snippet in **App.tsx**.

```tsx
import * as React from 'react';

export class App extends React.PureComponent<{}, {}> {
    render() {
        return (<div>React TS</div>);
    }
}
```

### Rename index.ts to index.tsx and update content

Paste below code snippet in **index.tsx**.

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### Update entry point in **webpack.config.js** to point to **index.tsx**.

## Setup Testing using Jest and enzyme

### Install dependencies

```bash
$ npm i jest @types/jest ts-jest --save-dev
$ npm i enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 --save-dev
```

### Setup TypeScript support for Jest

Paste below code snippet in **package.json**.

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

*Refer [ts-jest](https://github.com/kulshekhar/ts-jest) documentation for more info.*

Add test script in **package.json**.

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

### Add App.test.tsx in src folder

At project root, run:

```bash
$ cd src/
$ touch App.test.tsx
```

Paste below code snippet in **App.test.tsx**.

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

configure({ adapter: new Adapter() });

it('smoke test', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('shallow render test', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<div>React TS</div>)).toEqual(true);
});
```

*Refer [enzyme](https://github.com/airbnb/enzyme) documentation for more info.*

## Setup linting using TSLint

### Install and setup TSLint

```bash
$ npm i tslint -g
```

At project root, run:

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