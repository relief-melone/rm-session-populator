import axios from 'axios';
import User from '../classes/class.User';
import ConfigAuthenticator from '../interfaces/ConfigAuthenticator';

export default async (cookies: Record<string,any>, config: ConfigAuthenticator): Promise<User| null> => {
  
  const credentialsCookie = cookies[config.credentialsCookieName];
  if (!credentialsCookie)
    return null;

  const headers = {
    accept: 'application/json',
    cookie: credentialsCookie
      ? `${config.credentialsCookieName}=${credentialsCookie}`
      : ''
  };
  try {
    const body = await axios.get(config.authenticatorUserURL, {
      headers
    }); 
    return body.data;
  } catch (err) {
    return null;
  }  
};