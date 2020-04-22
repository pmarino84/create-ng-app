# Nguno

Command line interface like [@angular/cli](https://cli.angular.io), [create-react-app](https://github.com/facebook/create-react-app) and [vue-cli](https://cli.vuejs.org) but simplified (for now) and specialized for AngularJs applications.
Create applications skeleton.
Also you can create modules, components, services, directives and filter boilerplate files.

## Quick overview

npx nguno create my-app
cd my-app
npm start

We raccomend you to use latest version via npx.

([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher)

If you use npm 5.1 or earlier, you can't use `npx`. Instead, install `nguno` globally:

```
npm install -g nguno
```

Now you can run:

```
nguno create my-app
```

### Get started immediately

You **don't** need to install or configure tools like webpack or Babel.
They are preinstalled and configured for you.

## Available commands

To see all the available options run `npx nguno -h`

### create

```
npx nguno create <name>
```

Under current directory create and initialize the runnable application skeleton inside `name` folder:

```
app
├── README.md
├── node_modules
├── package.json
├── .babelrc
├── .eslintrc
├── .gitignore
├── .npmignore
├── karma.conf.js
├── webpack.common.js
├── webpack.config.js
├── webpack.dev.js
├── webpack.prod.js
├── webpack.test.js
├── webpack.utils.js
├── static
│   ├── angularjs-for-header-only.svg
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── app
│   │    ├── app.component.css
│   │    ├── app.component.html
│   │    ├── app.component.js
│   │    └── app.module.js
│   ├── components
│   │    └── link
│   │         ├── link.component.css
│   │         ├── link.component.html
│   │         └── link.component.js
│   ├── index.css
│   └── index.js
└── test
    ├── app.component.test.js
    ├── index.js
    └── link.component.test.js
```

### generate

Like `@angular/cli` generates files based on a schema.

```
npx nguno generate <schema> [options]
npx nguno g <schema> [options]
```

#### Arguments

`<schema>` The schema to generate, this option can take one of the following sub-commands:

* component
* directive
* factory
* filter
* module
* provider
* service

#### Sub commands

##### component

```
npx nguno generate component <name> [options]
npx nguno g component <name> [options]
```

##### directive

```
npx nguno generate directive <name> [options]
npx nguno g directive <name> [options]
```

##### factory

```
npx nguno generate factory <name> [options]
npx nguno g factory <name> [options]
```

##### filter

```
npx nguno generate filter <name> [options]
npx nguno g filter <name> [options]
```

##### module

```
npx nguno generate module <name> [options]
npx nguno g module <name> [options]
```

##### provider

```
npx nguno generate provider <name> [options]
npx nguno g provider <name> [options]
```

##### service

```
npx nguno generate service <name> [options]
npx nguno g service <name> [options]
```
