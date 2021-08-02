import { container } from 'tsyringe';

import { IDateProvider } from './dateProvider/IDateProvider';
import { DatefnsDateProvider } from './dateProvider/implementations/DatefnsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DatefnsDateProvider);
