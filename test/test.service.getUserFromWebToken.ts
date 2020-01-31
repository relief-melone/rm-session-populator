import getUserFromWebToken from '../src/services/getUserFromWebToken';
import jwt from 'jsonwebtoken';
import ConfigJWT from '../src/config/config.jwt';
import chai, { expect } from 'chai';
import chaiExclude from 'chai-exclude';
import fs from 'fs';

chai.use(chaiExclude);

describe('service.getUserFromWebToken', () => {

  const defaultUser = {
    name: 'Max Power',
    email: 'max.power@aol.com'
  };

  it('will get a valid user from a Web Token when configured to use secret', () => {
    
    const token = jwt.sign(defaultUser,'superSecret');
    
    const user = getUserFromWebToken(`Bearer ${token}`, ConfigJWT({
      jwtSecret: 'superSecret'
    }));

    expect(user).excluding(['iat']).to.deep.equal(defaultUser);
    
  });

  it('will get a valid user from a Web Token when configured to use a key', () => {
    const key = fs.readFileSync(`${__dirname}/../../test/key/private_key.pem`);
    const token = jwt.sign(defaultUser, key, { algorithm: 'RS256' });
    
    const user = getUserFromWebToken(`Bearer ${token}`, ConfigJWT({
      jwtMode: 'key',
      jwtKeyLocation: `${__dirname}/../../test/key/public_key.pem`
    }));

    expect(user).excluding(['iat']).to.deep.equal(defaultUser);
    
  });

  it('will return null if no header is present', () => {
    
    const user = getUserFromWebToken(undefined, ConfigJWT({
      jwtSecret: 'superSecret'
    }));

    expect(user).to.deep.equal(null);
  });

  it('will return null if header is malformed for direct mode', () => {    
    const user = getUserFromWebToken('Bearer 123iamMalformed', ConfigJWT({
      jwtSecret: 'superSecret'
    }));

    expect(user).to.deep.equal(null);
  });

  it('will return null if header is malformed for key mode', () => {            
    
    const user = getUserFromWebToken('Bearer MalformedStuff', ConfigJWT({
      jwtMode: 'key',
      jwtKeyLocation: `${__dirname}/../../test/key/public_key.pem`
    }));

    expect(user).to.deep.equal(null);
  });
});