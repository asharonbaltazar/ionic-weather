<h1 align="center">
	🌥 Ionic Weather 🌧
</h1>

> **Ionic Weather** is built with React, Typescript, and Tailwind. It's a minimal weather application, unweighted by bloat or ads.
> Search is powered by Google. Weather is provided by OpenWeatherMap. The project uses Firebase Functions as a makeshift backend.
> **Ionic Weather** supports hourly and daily views, unit preferences, and geolocation.

The `README` for the backend [can be found](/functions/README.md) in the `functions` folder.

## Installation & Running

[npm](https://www.npmjs.com/) is the project's package manager. [Vite](https://vitejs.dev/) serves the code in the browser.

##### Install the dependencies and serve the project in `localhost:3000`:

```
npm i
npm start
```

## Linting & Formatting

[ESlint](https://eslint.org/) scans the code for code quality, consistency in styles, and correct React practices. [Prettier](https://prettier.io/) formats the code.

##### Log all issues in the console:

```
npm run lint
```

##### Fix all fixable issues:

```
npm run lint:fix
```

##### Format the code:

```
npm run format
```

## Building

##### To build and minify the code in a `dist` folder:

```
npm run build
```
