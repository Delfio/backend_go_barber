import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import EtherialMailProvider from './implementations/EtherialMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherialMailProvider),
);
