import express from 'express';
import cors from 'cors';
import config from 'config';

import { authRouter } from './routes/auth-routes.js';
import { linkRouter } from './routes/link-routes.js';
import { userRouter } from './routes/user-routes.js';
import { redirectRouter } from './routes/redirect-routes.js';

const app = express();
const PORT = process.env.PORT || config.get('port');

//middleware
app.use(cors());
app.use(express.json());

//middlerware routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/link', linkRouter);
app.use('/s', redirectRouter);

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});
