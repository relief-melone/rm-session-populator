import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { expect } from 'chai';


import getUserByCookie from '../src/services/getUserByCookie';
import request from 'supertest';
import UserConfig from '../src/interfaces/UserConfig';
import configAuthenticator from '../src/config/config.authenticator';

const expectedUser = {
  displayName: 'TEST USER',
  firstName: 'TEST',
  lastName: 'USER'
};

const defaultConfig = configAuthenticator({});



describe('service.getUserByCookie', () => {
  let express;
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(async () => {
    mock.restore();
  });

  it('will return a null without a cookie by default', async () => {
    // Prepare
    
    // Execute
    const user = await getUserByCookie({}, defaultConfig);
    
    // Assert
    expect(user).to.equal(null);
  });

  it('will retun null when call to authenticator is rejected', async () => {
    // Prepare
    mock.onGet(defaultConfig.authenticatorUserURL).reply(401);

    // Execute
    const user =  await getUserByCookie({}, defaultConfig);

    expect(user).to.equal(null);
  });

  it('will return a request with a user when the cookie is supplied', async () => {
    // Prepare
    mock.onGet(defaultConfig.authenticatorUserURL).reply(200, expectedUser );

    // Execute
    const user = await getUserByCookie({ 'connect.sid' : '12345' }, defaultConfig);

    // Assert
    expect(user).to.deep.equal(expectedUser);
  });
});
