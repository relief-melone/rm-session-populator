import Axios, { AxiosInstance } from 'axios';
import axios from 'axios';
import { ConfigQueryBouncer } from '../config/config.queryBouncer';

export default(config: ConfigQueryBouncer, authHeader: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${config.host}`,
    headers: {
      authorization: authHeader
    }
    
  });

  return instance;
};
