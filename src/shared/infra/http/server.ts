/* eslint-disable no-console */
import { app } from './app';

const port = process.env.APP_PORT || 3333;

app.listen(port, () => console.log(`Server listen on port ${port}`));
