export default interface ConfigJWT{
  mode: 'direct' | 'key';
  algorithm: 'RS256';
  secret: string | Buffer;
  headerName: string;
}
