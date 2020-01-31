import { expect } from 'chai';
import express from 'express';
import cookieParser from 'cookie-parser';
import sessionPoplulator from '../src/index';
import { RequestWithUser } from '../src/interfaces/RequestWithUser';
import request from 'supertest';
import UserConfig from '../src/interfaces/UserConfig';

const expectedUser = {
  displayName: 'TEST USER',
  firstName: 'TEST',
  lastName: 'USER'
};

async function initializeMockAuthenticator(): Promise<any> {
  const receiver = express();
  receiver.use(cookieParser());
  receiver.use(express.json());
  receiver.use('/auth/userinfo', (req, res, next) => {
    if (!req.cookies) return res.status(401).send();
    if (!req.cookies['connect.sid']) return res.status(401).send();
    return res
      .status(200)
      .json(expectedUser)
      .send();
  });

  await receiver.listen(9000);

  return receiver;
}

async function initializeSender(settings: UserConfig = {}): Promise<any>  {
  const sender = express();
  sender.use(cookieParser());
  sender.use(express.json());
  sender.use(sessionPoplulator(settings));
  sender.use('/', (req: RequestWithUser, res, next) => {
    res.json({ user: req.user }).send();
  });
  const server = await sender.listen(9090);
  return { sender, server };
}

async function closeServer(server): Promise<any>  {
  return new Promise((res, rej) => {
    server.close(res);
  });
}

describe('MAIN', () => {
  let express;
  before(async () => {
    await initializeMockAuthenticator();
    
  });
  afterEach(async () => {
    await closeServer(express.server);    
  });

  it('will return a 401 without a cookie by default', async () => {
    express = await initializeSender({
      authenticatorHost: 'http://localhost:9000'
    });
    const sender = await request(express.sender).get('/');
    
    expect(sender.status).to.equal(401);
  });

  it('will retun a request with no user when reject has been turned off', async () => {
    express = await initializeSender({
      rejectWithoutAuthentication: false,
      authenticatorHost: 'http://localhost:9000'    
    });
    const res = await request(express.sender).get('/');
    
    expect(res.status).to.equal(200);;
    expect(res.body.user).to.be.null;
  });

  it('will return a request with a user when the cookie is supplied', async () => {
    express = await initializeSender({
      authenticatorHost: 'http://localhost:9000'
    });

    const res = await request(express.sender)
      .get('/')
      .set('Cookie', 'connect.sid=030818123456')
      .expect(200);

    expect(res.body.user).to.deep.equal(expectedUser);
  });
});
