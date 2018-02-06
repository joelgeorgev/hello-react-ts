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
npm init
```

## License
MIT