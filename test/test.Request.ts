import { expect } from "chai";
import express from "express";
import cookieParser from "cookie-parser";
import sessionPoplulator from "../src/index";
import { RequestWithUser } from "../src/interfaces/RequestWithUser";
import request from "supertest";

const expectedUser = {
  displayName: "TEST USER",
  firstName: "TEST",
  lastName: "USER"
};

async function initializeMockAuthenticator() {
  const receiver = express();
  receiver.use(cookieParser());
  receiver.use(express.json());
  receiver.use("/auth/userinfo", (req, res, next) => {
    if (!req.cookies) return res.status(401).send();
    if (!req.cookies["connect.sid"]) return res.status(401).send();
    return res
      .status(200)
      .json(expectedUser)
      .send();
  });

  await receiver.listen(8081);

  return receiver;
}

async function initializeSender(env = {}) {
  const sender = express();
  sender.use(cookieParser());
  sender.use(express.json());
  sender.use(sessionPoplulator(env));
  sender.use("/", (req: RequestWithUser, res, next) => {
    res.json({ user: req.user }).send();
  });
  const server = await sender.listen(3000);
  return { sender, server };
}

async function closeServer(server) {
  return new Promise((res, rej) => {
    server.close(res);
  });
}

describe("MAIN", () => {
  before(async () => {
    await initializeMockAuthenticator();
  });

  it("will return a 401 without a cookie by default", async () => {
    let express = await initializeSender();
    await request(express.sender)
      .get("/")
      .expect(401);

    await closeServer(express.server);
  });

  it("will retun a request with no user when reject has been turned off", async () => {
    let express = await initializeSender({
      REJECT_WITHOUT_COOKIE: "false"
    });
    let res = await request(express.sender)
      .get("/")
      .expect(200);

    await closeServer(express.server);
    expect(res.body.user).to.be.null;
  });

  it("will return a request with a user when the cookie is supplied", async () => {
    let express = await initializeSender();

    let res = await request(express.sender)
      .get("/")
      .set("Cookie", "connect.sid=030818123456")
      .expect(200);

    await closeServer(express.server);
    expect(res.body.user).to.deep.equal(expectedUser);
  });
});
