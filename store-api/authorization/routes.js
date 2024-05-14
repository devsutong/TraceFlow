const router = require('express').Router();

import { register, login } from './controllers/AuthorizationController';

import { verify } from '../common/middlewares/SchemaValidationMiddleware';

import registerPayload from './schemas/registerPayload';
import loginPayload from './schemas/loginPayload';

router.post(
    '/register', 
    verify(registerPayload), 
    register
);

router.post(
    '/login', 
    verify(loginPayload), 
    login
);

export default router;