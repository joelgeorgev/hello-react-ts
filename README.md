# Hello React TypeScript

> Development workflow to setup a React app using TypeScript and Webpack.

## Add .gitattributes

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

```bash
$ touch .gitignore
```

Paste below code snippet inside .gitignore to prevent version tracking for node_modules and dist folders. 

```
/node_modules
/dist
```

## Initialize package.json

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

## License
MIT