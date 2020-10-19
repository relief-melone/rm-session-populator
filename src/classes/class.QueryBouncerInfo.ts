import { AxiosInstance } from 'axios';
import { ConfigQueryBouncer } from '../config/config.queryBouncer';
import axiosQueryBouncer from '../services/axios.queryBouncer';

const defaultGet = async (axios: AxiosInstance, url: string, valOnError: any): Promise<any> => {
  try{
    const val = await axios.get(url);
    return val.data;
  } catch(err){
    return valOnError;
  }
  
};

export default class QueryBouncerInfo {
  permissions: string[];

  private axios: AxiosInstance;

  constructor(configQb: ConfigQueryBouncer, authHeader: string){
    if(configQb.enabled && authHeader){
      this.axios = axiosQueryBouncer(configQb,authHeader);
      this.permissions = [];
    }
  }

  async updateQueryBouncerInformation(): Promise<void>{
    this.axios.get('/api/admin/permissions/myPermissions');
    this.permissions = await defaultGet(this.axios, '/api/admin/permissions/myPermissions', []);
  }
}

