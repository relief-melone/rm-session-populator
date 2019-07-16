# RM-SESSION-POPULATOR

This Middleware is designed to work in NodeJS Express Backends with the rm-authenticator and a Front-End that is connected to that Authenticator as well.

[Docker - rm-authenticator](https://cloud.docker.com/u/reliefmelone/repository/docker/reliefmelone/rm-authenticator)
[GitHub - rm-authenticator](https://github.com/relief-melone/rm-authenticator)

When the Front-End sends you a request containing a session cookie, the middleware will automatically populate the request
Object with a user Property containing all the user information

## Installation

```
  npm install --save rm-session-populator
```

## Use

The Configutation of this middleware is preferrably done via Environment variables. Available Variables are

**AUTHENTICATOR_HOST** Hostname where your rm-authenticator is running. By default it's http://localhost:8081

**AUTENTICATOR_USER_PATH:** The path to the endpoint where userinfo is stored. By default it uses the authenticators default /auth/userinfo

**AUTHENTICATOR_CREDENTIALS_COOKIE_NAME:**: The Name of the Session Cookie. Defaults to connect.sid

**AUTHENTICATOR_REJECT_WITHOUT_COOKIE:** Determines the behaviour of the middleware. If set to true (which it is by default) it will automatically reject any request made to the backend as unauthorized that is missing a cookie. If it is set to false it will poplulate the user property with null

To implement the middleware do the following

**JavaScript**

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const sessionPopulate = require("rm-session-populator");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(sessionPoplulate());
```

**TypeScript**

```ts
import express from "express";
import cookieParser from "cookie-parser";
import sessionPoplulate from "rm-session-populator";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(sessionPoplulate());
```

If you don't want to use Environment Variables on your Backend you can also inject them in the Session Populator as it uses process.env as input parameter by default, that can be overwritten. To do this do

```js
app.use(
  sessionPopulate({
    AUTHENTICATOR_HOST: "https://my-own-host:443",
    AUTHENTICATOR_REJECT_WITHOUT_COOKIE: "false"
  })
);
```
