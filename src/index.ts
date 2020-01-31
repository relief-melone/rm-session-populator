import controllerMain from './controllers/controller.main';
import UserConfig from './interfaces/UserConfig';

export default (env: UserConfig = process.env) => controllerMain(env);