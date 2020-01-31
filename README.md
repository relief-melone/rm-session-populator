# RM-SESSION-POPULATOR

This Middleware is designed to work in NodeJS Express Backends with the rm-authenticator and a Front-End that is connected to that Authenticator as well.

[Docker - rm-authenticator](https://cloud.docker.com/u/reliefmelone/repository/docker/reliefmelone/rm-authenticator)\
[GitHub - rm-authenticator](https://github.com/relief-melone/rm-authenticator)

When the Front-End sends you a request containing a session cookie, the middleware will automatically populate the request
Object with a user Property containing all the user information

## Installation

```
  npm install --save rm-session-populator
```

## Use

You configure the Session Populator with the Options Object. This has several possible Settings

**authenticatorHost** Hostname where your rm-authenticator is running. By default it's http://localhost:8081

**authenticatorUserPath:** The path to the endpoint where userinfo is stored. By default it uses the authenticators default /auth/userinfo

**credentialsCookieName:**: The Name of the Session Cookie. Defaults to connect.sid

**rejectWithoutAuthentication:** Determines the behaviour of the middleware. If set to true (which it is by default) it will automatically reject any request made to the backend as unauthorized that is missing a cookie and web token. If it is set to false it will poplulate the user property with null

**jwtMode:** defaults to direct. If set to direct JWT will use the secret provided with the jwt Secret option to verify your web token. If set to key it will use the public key from a file

**jwtSecret:** Only has to be set if jwtMode is direct. The secret will be used to verify the web token if present. You will have to set the same Secret in the Authenticator.

**jwtKeyLocation:** Only needs to be set if jwtMode is key. Points to the Public Key in the file system. Defaults to /data/public_key.pem

**

To implement the middleware do the following

**JavaScript**

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const sessionPopulate = require("rm-session-populator");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  sessionPopulate({
    authenticatorHost: "https://my-own-host:443",
    rejectWithoutAuthentication: "false",
    jwtMode: "key",
    // jwtSecret: "superSecret",
    jwtKeyLocation: "/data/privateKey.pem",
  })
);
```

**TypeScript**

```ts
import express from "express";
import cookieParser from "cookie-parser";
import sessionPoplulate from "rm-session-populator";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  sessionPopulate({
    authenticatorHost: "https://my-own-host:443",
    rejectWithoutAuthentication: "false",
    jwtMode: "key",
    // jwtSecret: "superSecret",
    jwtKeyLocation: "/data/privateKey.pem",
  })
);
```
