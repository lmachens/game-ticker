# Game Ticker

**The social network for Gamers!**

Automatically share highlights and comments on your favorite games with your friends.

This project is the result of a [Gaming App Course](https://coda.io/@leon-machens/gaming-app-lvl).

## Features

- Play and let Game Ticker automatically capture your highlights.
- Spectate your friends match in a live-ticker. You won't miss any highlight!
- Share your highlights with your friends.

## Installing / Developing

```shell
npm install
```

This will install the dependencies required to run the game-ticker.

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

Boom! These scripts run your client and server in development mode.

If you don't like to call all scripts at once, you can also run:

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
