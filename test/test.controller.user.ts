import controller from '../src/controllers/controller.user';
import sinon from 'sinon';
import { Request } from 'express';

describe('controller.user', () => {
  
  const defaultUser = {
    Name: 'Max Power',
    EMail: 'max.power@aol.com'
  };

  let req, res, next;
  let getUserByCookie, getUserFromWebToken;


  beforeEach(() => {
    next = sinon.stub();
    req = sinon.stub();
    
    res = {
      status: sinon.stub,
      send: sinon.stub
    } as any as Request;   
    
  });

  it('will correctly stop execution if web token is found first', () => {
    // Prepare
    const _controller =controller({});
    const req = {
      headers: {
        Authorization: 'Bearer 12345'
      }
    } as any as Request;

    getUserFromWebToken = sinon.stub().returns(defaultUser);
    getUserByCookie = sinon.stub().resolves(defaultUser);

    // Execute
    _controller(req, res, next, getUserFromWebToken, getUserByCookie);

    // Assert
    sinon.assert.calledOnce(next);
  });

  it('will correctly continue execution if no web token is present', async () => {
    // Prepare
    const _controller =controller({});
    const req = {
      headers: {           
      },
      cookies: {
        'connect.sid' : '123456789'
      }
    } as any as Request;
   
    getUserFromWebToken = sinon.stub().returns(null);
    getUserByCookie = sinon.stub().resolves(defaultUser);
   
    // Execute
    await _controller(req, res, next, getUserFromWebToken, getUserByCookie);
   
    // Assert
    sinon.assert.calledOnce(next);
  });

});