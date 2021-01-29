import { configLocal } from './config-local';
import { ConfigType } from './config.type';

export const getConfig = (): ConfigType => {
  const environment = process.env.REACT_ENV || 'local';

  switch (environment) {
    case 'local':
      return configLocal;
    default:
      return configLocal;
  }
};