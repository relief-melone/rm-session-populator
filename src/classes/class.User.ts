import { AxiosInstance } from 'axios';
import { config } from 'process';
import { ConfigQueryBouncer } from '../config/config.queryBouncer';
import axiosQueryBouncer from '../services/axios.queryBouncer';
import QueryBouncerInfo from './class.QueryBouncerInfo';

export interface UserI {
  __v?: number;
  _id?: string;
  displayName: string;
  email: string;
  facebook?: any;
  google?: any;
  linkedin?: any;
  firstName: string;
  lastName: string;
  pictureURL: string;
  preferredLanguage: string | null;
}

export default class User {
  __v?: number;
  _id?: string;
  displayName: string;
  email: string;
  facebook?: any;
  google?: any;
  linkedin?: any;
  firstName: string;
  lastName: string;
  pictureURL: string;
  preferredLanguage: string | null;

  private axios? : AxiosInstance;
  queryBouncer?: QueryBouncerInfo;

  constructor(User: UserI){
    if(User.__v) this.__v = User.__v;
    if(User._id) this._id = User._id;
    this.displayName = User.displayName;
    this.email = User.email;
    this.facebook = User.facebook ? User.facebook : null;
    this.google = User.google ? User.google : null;
    this.linkedin = User.linkedin ? User.linkedin : null;
    this.firstName = User.firstName;
    this.lastName = User.lastName;
    this.pictureURL = User.pictureURL;
    this.preferredLanguage = User.preferredLanguage;
  }    

  async updateQueryBouncerInformation(configQb: ConfigQueryBouncer, authHeader: string): Promise<void>{
    if(configQb.enabled && authHeader){
      this.queryBouncer = new QueryBouncerInfo(configQb,authHeader);
      await this.queryBouncer.updateQueryBouncerInformation();
    } else {
      console.log('Tried to update Query Bouncer Information but no config was supplied');
    }
  }
}