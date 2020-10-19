import { UserConfig } from '..';

export interface ConfigQueryBouncer{
  enabled: boolean;
  host: string;
}

export default (env: UserConfig): ConfigQueryBouncer => ({
  enabled: env.queryBouncer ? true : false,
  host: env.queryBouncer ? env.queryBouncer.host : null
});