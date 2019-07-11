import AuthenticatorConfig from "./config/config.authenticator";
import request from "request";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "./interfaces/RequestWithUser";

export default (env = process.env) => {
  return (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
    config = AuthenticatorConfig(env)
  ) => {
    let credentialsCookie = req.cookies[config.CredentialsCookieName];
    if (!credentialsCookie && config.RejectWithoutCookie) {
      return res.status(401).send();
    }

    let headers = {
      accept: "application/json",
      cookie: credentialsCookie
        ? `${config.CredentialsCookieName}=${credentialsCookie}`
        : ``
    };

    request.get(
      config.AuthenticatorUserURL,
      { headers },
      (err, result, body) => {
        if (!body || body == "") {
          req.user = null;
          return next();
        }

        if (result.statusCode === 401 && config.RejectWithoutCookie)
          return res.status(401).send();
        if (result.statusCode === 401 && !config.RejectWithoutCookie) {
          req.user = null;
          return next();
        }

        try {
          if (body !== "") body = JSON.parse(body);
        } catch (err) {
          res.status(500).send("Malformed JSON");
        }
        req.user = body;

        next();
      }
    );
  };
};
