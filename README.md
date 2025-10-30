# Cloudspace

### Install dependencies

```sh
npm install
```

### For development stage

Create .env file, and paste the following for development

```.env
VITE_MODE=development
VITE_REACT_DEV_TOOLS=true
VITE_DEFAULT_LANG=en
VITE_API_URL=http://10.10.199.54:8000
VITE_AUTH_TOKEN_VALID_DAYS=1  # Value in days, if not provided -> default is 1
```

Run dev script

```sh
npm run dev
```

### Build project

Create .env file, and paste the following for production build

```.env
VITE_MODE=production
VITE_REACT_DEV_TOOLS=false
VITE_DEFAULT_LANG=en
VITE_API_URL=http://10.10.199.54:8000
VITE_AUTH_TOKEN_VALID_DAYS=1
```

Run build script

```sh
npm run build
```

Preview built project it in local server

```sh
npm run preview
```

> Source directory structure

## assets

Contains all the assets that are being used in project, including images, svgs, fonts, and sass styles

## components

This folder contains all the components that are used in project, Layout, Router, UI, and Views (pages).

## decorators

Decorator pattern based functions that are being used for extending or overriding functionality or structure of class components, methods of classes, and so on.

## hocs

Higher order functions that are being used as wrapper pattern for class components

## i18n

Contains all the resources and languages.

## stores

This folder has all the mobx stores that are used in different parts of the app to manage state with ease.

## types

Contains all the type definitions and interfaces.

## utils

Contains all the utility functions, classes and so on.
