import { configLocal } from './config-local';

export const getConfig = () => {
  const environment = process.env.REACT_ENV || 'local';

  switch (environment) {
    case 'local':
      return configLocal;
      break;
    default:
      return configLocal;
  }
};