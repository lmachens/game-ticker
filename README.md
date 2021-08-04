# Game Ticker

**The social network for Gamers**

Automatically share highlights and comments of your favorite games with your friends.

This project is the result of a [Gaming App Course](https://coda.io/@leon-machens/gaming-app-lvl).

## Features

Play and let **Game Ticker** take care of the rest.

- **Game Ticker** will automatically record your ingame highlights
- Watch your friends' matches in the live ticker. You will no longer miss a highlight again!
- Share your highlights with your friends.

## Prerequisites

- node >= v14.17.1
- npm <= 7.20.0

## Installing / Developing

```shell
npm install
```

This will install the dependencies required to run **Game Ticker**.

You need to configure the environment by setting several environment variables. Creating a `.env` file is required (use `.env.example` as reference).

| KEY                        | VALUE                                  |
| -------------------------- | -------------------------------------- |
| PORT                       | Port for the server environment        |
| MONGODB_URI                | URI for the MongoDB server             |
| VITE_API_ENDPOINT          | The URL to your API endpoint           |
| VITE_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name                  |
| VITE_CLOUDINARY_PRESET     | Cloudinary preset (has to be unsigned) |
| REQUEST_ORIGIN             | CORS origin                            |

```shell
npm run dev
```

**Boom!** These scripts run your client and server in development mode.

If you do not want to call all the scripts at once, you can run them separately:

```shell
npm run server:dev
npm run client:dev
```

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
