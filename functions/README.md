> **Ionic Weather** uses [Firebase Functions](https://firebase.google.com/docs/functions) as a backend.

## Installation

[npm](https://www.npmjs.com/) is the project's package manager.

##### Install the dependencies

```
npm i
```

> ##### ⚠️ IMPORTANT
>
> Firebase Functions uses Node.js v16. Please use a node version manager tool like [nvm](https://github.com/nvm-sh/nvm) to switch to the correct version.

A `.runtimeconfig.json` file is necessary to provide the API secret keys.

## Running

[concurrently](https://www.npmjs.com/package/concurrently) runs [`firebase emulators:start`](https://firebase.google.com/docs/functions/local-emulator) simultaneously with the `build` command (with a `--watch` flag to rebuild on code changes).

##### Start the backend emulator:

```
npm run dev
```

You can view the emulator logs by navigating to `localhost:8001`.

## Building

[esbuild](https://esbuild.github.io/) compiles and minifies the Typescript code.

##### Compile the code in a `dist` folder:

```
npm run build
```

## Deploying

Deploy runs the `build` command and uploads the folder with the compiled code to Firebase. If the deploy is successful, each exported function will be assigned a generated (`projectname-serverlocation-functionname`) link. Now, you can call the function by using that URL!

##### Deploy the project to Firebase:

```
npm run deploy
```
