# Overwolf Boilerplate

> Quickly bootstrap a new project with Overwolf Boilerplate.

This boilerplate contains all the tools you need to build a modern web app with TypeScript, React, Vite, Storybook and Express.  
You can use it to quickly bootstrap your project.

ESLint, stylelint, prettier, husky and lintstaged are configured to give you a solid development experience.

## Installing / Developing

First, [create a repository from this template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template).

Now you are ready to go:

```shell
npm install
```

This will install the dependencies required to run the boilerplate.

```shell
npm run dev
```

Boom! These scripts run your client and server in development mode.

If you don't like to call all scripts at once, you can also run:

```shell
npm run server:dev
npm run client:dev
```

You can configure the server port by setting the `PORT` environment variable. Creating a `.env` file is supported.

| KEY                        | VALUE                                  |
| -------------------------- | -------------------------------------- |
| PORT                       | Port for the server environment        |
| MONGODB_URI                | URI for the MongoDB server             |
| VITE_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name                  |
| VITE_CLOUDINARY_PRESET     | Cloudinary preset (has to be unsigned) |
| VITE_API_ENDPOINT          | http://localhost:3002 (for local dev ) |

## Building

To build the project, run:

```shell
npm run build
```

This will start the server.

```shell
npm start
```

## Tests

A test runner is not installed (right now). But TypeScript, linter and prettier are checked on commit and push thanks to husky and lintstaged.

## Licensing

MIT
