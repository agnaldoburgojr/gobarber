import { container } from 'tsyringe';

import IHashProviders from './HashProvider/models/IHashProvider';
import BCriptHashProvider from './HashProvider/implementations/BCriptyHashProvider';

container.registerSingleton<IHashProviders>(
  'BCriptHashProvider',
  BCriptHashProvider,
);
